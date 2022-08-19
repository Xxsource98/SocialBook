import axios from 'axios'

import { NotificationError } from '@functions/Notifications'

const DeletePostApi = async (token: string, postID: number): Promise<boolean | void> => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/posts/delete`,
            {
                postID: postID,
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

            NotificationError(`${error} (${postID})`)
        })
}

export default DeletePostApi
