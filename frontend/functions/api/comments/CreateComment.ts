import axios from 'axios'

import { CommentType } from '@functions/api/comments/GetPostComments'
import { NotificationError } from '@functions/Notifications'

const CreateComment = async (token: string, postID: number, comment: string): Promise<CommentType> => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/comments/create`,
            {
                postID: postID,
                comment: comment,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            return res.data.description[0]
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error} (${postID})`)
        })
}

export default CreateComment
