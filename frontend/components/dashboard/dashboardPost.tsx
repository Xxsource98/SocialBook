import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'
import { Heart, MessageCircle } from 'react-feather'

import { PostType } from '@functions/api/posts/GetPosts'
import ConvertDate from '@functions/ConvertDate'
import { NotificationError, NotificationSuccess } from '@functions/Notifications'

import Section from '@components/dashboard/dashboardSection'
import DrawPostCommentsSection from '@components/dashboard/dashboardCommentsSection'
import Link from '@components/elements/link'
import Input, { Textarea } from '@components/elements/input'
import { ButtonSubmit } from '@components/elements/button'
import PostContextMenu from '@components/elements/postContextMenu'
import ProfilePictureComponent from '@components/elements/profilePicture'

type DashboardPostType = {
    amIposter: boolean
    ID: number
    localUser: string
    username: string
    firstName: string
    lastName: string
    profilePicture: string
    title: string
    description: string
    likes: string[]
    likesCount: number
    commentsCount: number
    createDate: Date
    userProfilePicture: string
    DeletePost: (postID: number) => Promise<boolean | void>
    LikePost: (postID: number) => Promise<PostType | null>
    RefreshPost: (postID: number) => Promise<PostType | null>
    UpdatePost: (postID: number, title: string, description: string) => Promise<boolean | void>
}

export const PostSkeleton: React.FC = () => {
    return (
        <Section inDashboard>
            <div className={classNames('relative', 'w-[95%]', 'ml-auto', 'mr-auto')}>
                <div className={classNames('relative', 'flex', 'gap-3')}>
                    <Skeleton width={56} height={56} circle />
                    <Skeleton width={128} count={2} />
                </div>
                <div className={classNames('relative', 'mt-4')}>
                    <Skeleton className={classNames('mb-4')} width={128} count={1} />
                    <Skeleton width={'100%'} count={4} />
                </div>
            </div>
        </Section>
    )
}

const DashboardPost: React.FC<DashboardPostType> = ({ amIposter, ID, username, localUser, firstName, lastName, createDate, profilePicture, userProfilePicture, title, description, likes, likesCount, commentsCount, LikePost, DeletePost, RefreshPost, UpdatePost }) => {
    const [currenttitle, setTitle] = useState<string>('')
    const [currentDescription, setDescription] = useState<string>('')

    const [currentLikesCount, setLikes] = useState<number>(0)
    const [currentCommentsCount, setComments] = useState<number>(0)
    const [haveILike, setLike] = useState<boolean>(false)
    const [commentsActive, toggleComments] = useState<boolean>(false)
    const [editMode, toggleEditMode] = useState<boolean>(false)

    const FreshUpdateValues = useCallback(() => {
        setTitle(title)
        setDescription(description)

        if (likesCount) {
            setLikes(likesCount)
        }

        if (commentsCount) {
            setComments(commentsCount)
        }

        if (likes) {
            setLike(
                likes?.findIndex(element => {
                    return element === localUser
                }) !== -1
            )
        }
    }, [title, description, commentsCount, likes, likesCount, localUser])

    const UpdatePostValues = useCallback(
        (newLikes: number | null, newComments: number | null) => {
            if (newLikes && newLikes !== currentLikesCount) {
                setLikes(newLikes)
            }

            if (newComments && newComments !== currentCommentsCount) {
                setComments(newComments)
            }
        },
        [currentCommentsCount, currentLikesCount]
    )

    const RefreshPostValues = useCallback(async () => {
        await RefreshPost(ID).then(postData => {
            if (postData) {
                UpdatePostValues(postData.likesCount, postData.commentsCount)
            }
        })
    }, [])

    useEffect(() => {
        FreshUpdateValues()

        const timer = setInterval(RefreshPostValues, 300 * 1000) // refresh per 5 minutes

        return () => clearInterval(timer)
    }, [FreshUpdateValues, RefreshPostValues])

    const LikeThatPost = async () => {
        await LikePost(ID)
            .then(likeData => {
                if (likeData) {
                    setLike(!haveILike)
                    setLikes(haveILike ? currentLikesCount - 1 : currentLikesCount + 1)
                }
            })
            .catch(err => console.error(err))
    }

    const ToggleCommentsSection = () => {
        toggleComments(!commentsActive)
    }

    const DrawPostContent = () => {
        const UpdatePostForm = async (ev: React.FormEvent<HTMLFormElement>) => {
            ev.preventDefault()

            const target = ev.target as typeof ev.target & {
                newTitle: { value: string }
                newDescription: { value: string }
            }

            const newTitle = target.newTitle.value || currenttitle
            const newDescription = target.newDescription.value || currentDescription

            if (newTitle === '' && newDescription === '') {
                NotificationError('Fields are empty')
            }

            const updateValue = await UpdatePost(ID, newTitle, newDescription)

            if (updateValue) {
                await RefreshPost(ID).then(newData => {
                    setTitle(newData?.title ?? currenttitle)
                    setDescription(newData?.description ?? currentDescription)
                })

                NotificationSuccess('Post updated')

                toggleEditMode(false)
            } else {
                NotificationError('Failed to update post')
            }
        }

        if (editMode) {
            return (
                <form onSubmit={UpdatePostForm} className={classNames('relative', 'flex', 'flex-col', 'items-end', 'gap-3')}>
                    <Input name="newTitle" defaultValue={currenttitle} />
                    <Textarea name="newDescription" defaultValue={currentDescription} />
                    <ButtonSubmit className={classNames('relative', 'w-full', 'md:w-36')} value="Update" />
                </form>
            )
        }

        return (
            <React.Fragment>
                <h2 className={classNames('font-semibold', 'xs:text-lg')}>{currenttitle}</h2>
                <p className={classNames('text-sm', 'xs:text-base')}>{currentDescription}</p>
            </React.Fragment>
        )
    }

    const DrawPostOptions = () => {
        if (amIposter) {
            const EditPost = () => toggleEditMode(!editMode)

            const RemovePost = async () => {
                const deleteData = await DeletePost(ID)

                if (deleteData) {
                    NotificationSuccess('Post Deleted')
                } else {
                    NotificationError('Failed to Delete Post')
                }
            }

            return <PostContextMenu Update={EditPost} Delete={RemovePost} />
        }

        return <React.Fragment />
    }

    return (
        <React.Fragment>
            <Section className={classNames('w-full')} inDashboard>
                <div className={classNames('flex', 'items-center', 'justify-between')}>
                    <div className={classNames('flex', 'items-center', 'gap-3', 'p-3')}>
                        <div className="relative w-14 h-14 xs:w-16 xs:h-16">
                            <Link href={`/user/${username}`}>
                                <ProfilePictureComponent src={profilePicture} />
                            </Link>
                        </div>
                        <div className={classNames('leading-none')}>
                            <Link href={`/user/${username}`}>
                                <h3 className={classNames('font-semibold', 'cursor-pointer')}>
                                    {firstName} {lastName} <span className={classNames('font-normal', 'text-xs', 'text-gray-500', 'dark:text-gray-400')}>({ConvertDate(createDate)})</span>
                                </h3>
                                <span className={classNames('text-xs', 'cursor-pointer')}>@{username}</span>
                            </Link>
                        </div>
                    </div>
                    <div className={classNames('p-2')}>
                        <DrawPostOptions />
                    </div>
                </div>
                <div className={classNames('flex', 'flex-col', 'gap-3', 'mt-3', 'px-3')}>
                    <DrawPostContent />
                </div>
                <div className={classNames('flex', 'gap-x-4', 'mt-6', 'pb-2', 'px-3')}>
                    <div className={classNames('flex', 'gap-x-2', 'cursor-pointer', 'p-1', 'px-2', 'rounded-2xl', 'transition-colors', 'hover:bg-slate-300', 'dark:hover:bg-gray-700')} onClick={LikeThatPost}>
                        <Heart className={classNames('text-dark', 'dark:text-gray-900', haveILike ? ['fill-[#e35959]', 'dark:fill-[#df4e4e]'] : 'fill-transparent')} size={24} />
                        <span className={classNames('font-semibold')}>{currentLikesCount}</span>
                    </div>
                    <div className={classNames('flex', 'gap-x-2', 'cursor-pointer', 'p-1', 'px-2', 'rounded-2xl', 'transition-colors', 'hover:bg-slate-300', 'dark:hover:bg-gray-700')} onClick={ToggleCommentsSection}>
                        <MessageCircle className={classNames('text-dark', 'dark:text-gray-900')} size={24} />
                        <span className={classNames('font-semibold')}>{currentCommentsCount}</span>
                    </div>
                </div>
            </Section>
            <DrawPostCommentsSection userUsername={localUser} postID={ID} postTitle={title} active={commentsActive} UpdatePostValues={UpdatePostValues} userProfilePicture={userProfilePicture} />
        </React.Fragment>
    )
}

export default DashboardPost
