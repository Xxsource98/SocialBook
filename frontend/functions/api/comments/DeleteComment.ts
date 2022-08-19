import axios from 'axios'

import { NotificationError } from '@functions/Notifications'

const DeleteCommentApi = async (token: string, commentID: number): Promise<boolean | void> => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/comments/delete`,
            {
                commentID: commentID,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            const data = res.data

            return data.status === 'Success'
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error} (${commentID})`)
        })
}

export default DeleteCommentApi
