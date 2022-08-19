import axios from 'axios'

import { NotificationError } from '@functions/Notifications'
import { PostType } from '@functions/api/posts/GetPosts'

const CreatePost = async (token: string, title: string, description: string): Promise<PostType> => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/posts/create`,
            {
                title: title,
                description: description,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            const data = res.data

            return data.description
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

export default CreatePost
