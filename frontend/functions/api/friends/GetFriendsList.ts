import axios from 'axios'

import { NotificationError } from '@functions/Notifications'
import { UserType } from '@functions/api/user/GetUserInfo'

const GetFriendsList = (token: string, username?: string): Promise<UserType[]> => {
    const url = username ? `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/user/username/${username}` : `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends`

    return axios
        .get(url, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            return res.data.description ?? []
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

export default GetFriendsList
