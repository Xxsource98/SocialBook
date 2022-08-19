import axios from 'axios'

import { NotificationError } from '@functions/Notifications'

const AreFriends = (token: string, user: string | undefined): Promise<boolean> => {
    return axios
        .get(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/arefriends/${user}`, {
            headers: {
                Authorization: token,
            },
        })
        .then(res => {
            return res.data.description ?? false
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

export default AreFriends
