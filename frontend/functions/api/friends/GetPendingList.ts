import axios from 'axios'

import { NotificationError } from '@functions/Notifications'
import { UserType } from '@functions/api/user/GetUserInfo'

type GetPendingListType = {
    sent: UserType[]
    received: UserType[]
}

const GetPendinglist = (token: string): Promise<GetPendingListType> => {
    return axios
        .get(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/current_invites`, {
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

export default GetPendinglist
