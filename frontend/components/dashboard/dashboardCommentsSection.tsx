import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { CommentType } from '@functions/api/comments/GetPostComments'
import useComments from '@functions/hooks/useComments'

import DashboardComment, { CommentSkeleton } from '@components/dashboard/dashboardComment'
import Section from '@components/dashboard/dashboardSection'
import DashboardCreateComment from '@components/dashboard/dashboardCreateComment'

type DashboardPostCommentsType = {
    userProfilePicture: string
    userUsername: string
    postID: number
    postTitle: string
    active: boolean
    UpdatePostValues: (newLikes: number | null, newComments: number | null) => void
}

const DrawPostCommentsSection: React.FC<DashboardPostCommentsType> = ({ postID, postTitle, active, userUsername, userProfilePicture, UpdatePostValues }) => {
    const NewCommentsMsgRef = useRef<HTMLDivElement>(null)
    const CommentsRef = useRef<HTMLDivElement>(null)
    const InputRef = useRef<HTMLInputElement>(null)
    const [commentsCount, setCommentsCount] = useState<number>(0)
    const [commentsLoaded, setCommentsLoaded] = useState<boolean>(false)
    const [currentComments, setCurrentComments] = useState<CommentType[]>([])
    const { commentsLoading, FetchComments, NewComment, RefreshComments, UpdateComment, DeleteComment } = useComments(postID)

    const RefreshCommentsList = async () => {
        if (active && commentsLoaded) {
            await RefreshComments().then(newComments => {
                if (commentsCount !== newComments.length) {
                    if (NewCommentsMsgRef && NewCommentsMsgRef.current) {
                        NewCommentsMsgRef.current.classList.remove('hidden')
                    }
                }

                setCurrentComments(newComments)
                setCommentsCount(newComments.length)
            })
        }
    }

    const InitOnLoad = useCallback(async () => {
        if (active && !commentsLoaded) {
            await FetchComments().then(newComments => {
                if (currentComments.length === 0) {
                    setCurrentComments(newComments)
                    setCommentsCount(newComments.length)
                    setCommentsLoaded(true)
                }
            })

            setTimeout(() => ScrollToBottom(true), 250)
        }
    }, [active, commentsLoaded, commentsCount])

    useEffect(() => {
        InitOnLoad()

        const timer = setInterval(RefreshCommentsList, 30 * 1000) // refresh per 30 seconds

        return () => clearInterval(timer)
    }, [InitOnLoad])

    const ScrollToBottom = (animation?: boolean) => {
        if (CommentsRef && CommentsRef.current) {
            CommentsRef.current.scrollTo({
                left: 0,
                top: CommentsRef.current.scrollHeight,
                behavior: animation ? 'smooth' : 'auto',
            })
        }
    }

    const PostNewComment = async (comment: string) => {
        setCommentsCount(commentsCount + 1)

        await NewComment(comment).then(newComment => {
            if (newComment) {
                if (InputRef && InputRef.current) {
                    // Clear input value
                    InputRef.current.value = ''
                }

                setCurrentComments(values => [...values, newComment])
            }
        })

        UpdatePostValues(null, commentsCount + 1)

        // weird way for scroll to last element lol
        setTimeout(() => ScrollToBottom(true), 250)
    }

    const OnNewCommentMsgClick = () => {
        if (NewCommentsMsgRef && NewCommentsMsgRef.current) {
            ScrollToBottom(true)

            NewCommentsMsgRef.current.classList.add('hidden')
        }
    }

    const DeleteCommentFunc = async (commentID: number) => {
        const deleteData = await DeleteComment(commentID)

        if (deleteData) {
            setCurrentComments(currentComments.filter(item => item.id !== commentID))
        }

        return deleteData
    }

    const UpdateCommentFunc = async (commentID: number, newComment: string) => {
        const updateData = await UpdateComment(commentID, newComment)

        if (updateData) {
            setCurrentComments(
                currentComments.map(item => {
                    if (item.id === commentID) {
                        return {
                            ...item,
                            comment: newComment,
                        }
                    }

                    return item
                })
            )
        }

        return updateData
    }

    const DrawComments = () => {
        if (commentsLoading) {
            return (
                <React.Fragment>
                    <CommentSkeleton />
                    <CommentSkeleton />
                    <CommentSkeleton />
                    <CommentSkeleton />
                </React.Fragment>
            )
        }

        const CommentsDrawElement = currentComments.map((comment, i) => {
            return <DashboardComment key={i} amIposter={comment.poster === userUsername} ID={comment.id} username={comment.poster} profilePicture={comment.profilePicture} firstName={comment.lastName} lastName={comment.firstName} comment={comment.comment} createDate={comment.createDate} DeleteComment={DeleteCommentFunc} UpdateComment={UpdateCommentFunc} />
        })

        return <React.Fragment>{CommentsDrawElement}</React.Fragment>
    }

    if (active) {
        return (
            <Section className={classNames('lg:w-[600px]')} marginBottom={25} inDashboard>
                <h2 className={classNames('relative', 'text-lg', 'mb-2', 'text-center')}>
                    Comments for <span className={classNames('font-medium')}>{postTitle}</span>
                </h2>
                <div ref={CommentsRef} className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'max-h-72', 'overflow-y-auto')}>
                    <DrawComments />
                </div>
                <div ref={NewCommentsMsgRef} className={classNames('flex', 'absolute', 'hidden', 'transition-colors', 'justify-center', 'items-center', 'rounded-3xl', 'text-sm', 'font-medium', 'cursor-pointer', 'bottom-20', 'left-[50%]', 'translate-x-[-50%]', 'w-32', 'h-8', 'text-white', 'bg-blue-500', 'hover:bg-blue-600')} onClick={OnNewCommentMsgClick}>
                    New Comments!
                </div>
                <DashboardCreateComment ref={InputRef} userProfilePicture={userProfilePicture} createComment={PostNewComment} />
            </Section>
        )
    }

    return <React.Fragment />
}

export default DrawPostCommentsSection
