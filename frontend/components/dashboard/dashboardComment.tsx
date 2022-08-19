import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

import { NotificationError, NotificationSuccess } from '@functions/Notifications'
import ConvertDate from '@functions/ConvertDate'

import Link from '@components/elements/link'
import CommentContextMenu from '@components/elements/commentContextMenu'
import Input from '@components/elements/input'
import ProfilePictureComponent from '@components/elements/profilePicture'

type DashboardCommentType = {
    amIposter: boolean
    ID: number
    firstName: string
    lastName: string
    username: string
    profilePicture: string
    comment: string
    createDate: Date
    DeleteComment: (commentID: number) => Promise<boolean | void>
    UpdateComment: (commentID: number, comment: string) => Promise<boolean | void>
}

export const CommentSkeleton: React.FC = () => {
    return (
        <div className={classNames('relative', 'flex', 'items-center', 'gap-3', 'xs:px-3')}>
            <div className={classNames('relative', 'w-full', 'ml-auto', 'mr-auto')}>
                <div className={classNames('relative', 'flex', 'gap-3', 'items-center')}>
                    <Skeleton width={56} height={56} circle />
                    <div className={classNames('relative', 'flex', 'flex-col')}>
                        <Skeleton width={128} count={1} />
                        <Skeleton width={256} count={1} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const DashboardComment: React.FC<DashboardCommentType> = ({ amIposter, ID, firstName, lastName, username, profilePicture, createDate, comment, DeleteComment, UpdateComment }) => {
    const commentRef = useRef<HTMLDivElement>(null)
    const updateCommentRef = useRef<HTMLInputElement>(null)

    const [editMode, toggleEditMode] = useState<boolean>(false)
    const [isHovered, toggleHover] = useState<boolean>(false)

    useEffect(() => {
        if (commentRef && commentRef.current) {
            commentRef.current.addEventListener('mouseover', () => {
                toggleHover(true)
            })

            commentRef.current.addEventListener('mouseleave', () => {
                if (updateCommentRef && updateCommentRef.current) {
                    if (updateCommentRef.current === document.activeElement) {
                        toggleHover(true)
                    }
                } else {
                    toggleHover(false)
                }
            })
        }
    }, [commentRef])

    const UpdateCommentFunc = () => toggleEditMode(!editMode)

    const RemoveCommentFunc = async () => {
        const deleteData = await DeleteComment(ID)

        if (deleteData) {
            NotificationSuccess('Comment Deleted')
        } else {
            NotificationError('Failed to Delete Comment')
        }
    }

    const DrawCommentData = () => {
        if (editMode) {
            const UpdateCommentForm = async (ev: React.FormEvent<HTMLFormElement>) => {
                ev.preventDefault()

                const target = ev.target as typeof ev.target & {
                    comment: { value: string }
                }

                const newComment = target.comment.value || comment

                if (newComment === '') {
                    NotificationError('Comment is empty')
                }

                const updateValue = await UpdateComment(ID, newComment)

                if (updateValue) {
                    NotificationSuccess('Post updated')

                    toggleEditMode(false)
                } else {
                    NotificationError('Failed to update post')
                }
            }

            return (
                <form onSubmit={UpdateCommentForm} className={classNames('relative', 'w-full')}>
                    <Link href={`/user/${username}`}>
                        <p className={classNames('font-semibold', 'text-base', 'xs:text-lg')}>
                            {firstName} {lastName}
                        </p>
                    </Link>
                    <Input ref={updateCommentRef} className={classNames('relative', 'w-full', 'text-sm', 'xs:text-base')} defaultValue={comment} name="comment" />
                </form>
            )
        }

        return (
            <React.Fragment>
                <Link href={`/user/${username}`}>
                    <p className={classNames('font-semibold', 'text-base', 'xs:text-lg')}>
                        {firstName} {lastName} <span className={classNames('font-normal', 'text-xs', 'text-gray-500', 'dark:text-gray-400')}>({ConvertDate(createDate)})</span>
                    </p>
                </Link>
                <p className={classNames('relative', 'w-full', 'text-sm', 'xs:text-base')}>{comment}</p>
            </React.Fragment>
        )
    }

    return (
        <div ref={commentRef} className={classNames('relative', 'w-full', 'flex', 'items-center', 'gap-3', 'xs:px-3')}>
            <div className={classNames('relative', 'w-10', 'h-10', 'xs:w-12', 'xs:h-12')}>
                <Link href={`/user/${username}`}>
                    <ProfilePictureComponent src={profilePicture} />
                </Link>
            </div>
            <div className={classNames('relative', 'break-words', 'w-[65%]', 'md:w-[75%]')}>
                <DrawCommentData />
            </div>
            <div className={classNames('absolute', 'right-0', 'w-16', 'h-8', 'flex', 'items-center')}>
                <CommentContextMenu hover={isHovered && amIposter} Update={UpdateCommentFunc} Delete={RemoveCommentFunc} />
            </div>
        </div>
    )
}

export default DashboardComment
