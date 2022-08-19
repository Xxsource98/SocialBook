import axios from 'axios'

import { NotificationError } from '@functions/Notifications'

export type CommentType = {
    id: number
    postID: number
    poster: string
    firstName: string
    lastName: string
    comment: string
    profilePicture: string
    createDate: Date
}

const GetComments = async (token: string, postId?: number, user?: string): Promise<CommentType[]> => {
    const comments: CommentType[] = []
    let actionUrl: string | null = null

    if (postId && postId >= 0) {
        actionUrl = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/comments/id/${postId}`
    }

    if (user) {
        actionUrl = `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/comments/username/${user}`
    }

    if (actionUrl) {
        await axios
            .get(actionUrl, {
                headers: {
                    Authorization: token,
                },
            })
            .then(res => {
                const data = res.data.description

                data.forEach((comment: any) => {
                    // eslint-disable-line
                    comments.push({
                        id: comment.ID,
                        postID: comment.postID,
                        poster: comment.poster,
                        firstName: comment.firstName,
                        lastName: comment.lastName,
                        comment: comment.comment,
                        profilePicture: comment.profilePicture,
                        createDate: new Date(comment.createDate),
                    })
                })
            })
            .catch(ex => {
                const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
                console.error(error)

                NotificationError(`${error} (${postId})`)
            })
    }

    return comments
}

export default GetComments
