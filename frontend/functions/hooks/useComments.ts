import { useState } from 'react'
import { getCookie } from 'cookies-next'

import GetComments, { CommentType } from '@functions/api/comments/GetPostComments'
import CreateComment from '@functions/api/comments/CreateComment'
import DeleteCommentApi from '@functions/api/comments/DeleteComment'
import UpdateCommentApi from '@functions/api/comments/UpdateComment'

const useComments = (postID: number) => {
    const [commentsLoading, setLoading] = useState<boolean>(false)

    const FetchComments = async (): Promise<CommentType[]> => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''
        setLoading(true)

        const newComments = await GetComments(accessToken, postID).then(comments => {
            return comments
        })

        setLoading(false)

        return newComments ?? []
    }

    const NewComment = async (comment: string) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return CreateComment(accessToken, postID, comment)
    }

    const RefreshComments = async () => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return GetComments(accessToken, postID)
    }

    const UpdateComment = async (commentID: number, comment: string) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return UpdateCommentApi(accessToken, commentID, comment)
    }

    const DeleteComment = async (commentID: number) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return DeleteCommentApi(accessToken, commentID)
    }

    return { commentsLoading, FetchComments, NewComment, RefreshComments, UpdateComment, DeleteComment }
}

export default useComments
