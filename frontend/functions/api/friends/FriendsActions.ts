import axios from 'axios'

import { NotificationError, NotificationSuccess } from '@functions/Notifications'

const AddFriend = async (token: string, userID: number) => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/add_friend`,
            {
                inviteUserID: userID,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            const status = res.data.status

            if (status === 'Success') {
                NotificationSuccess('Invite Sent')

                return true
            }

            return false
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

const RemoveFriend = async (token: string, userID: number) => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/remove_friend`,
            {
                friendToRemove: userID,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            const status = res.data.status

            if (status === 'Success') {
                NotificationSuccess('Friend Removed')

                return true
            }

            return false
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

const AcceptFriend = async (token: string, senderID: number) => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/accept_friend`,
            {
                senderID: senderID,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            const status = res.data.status

            if (status === 'Success') {
                NotificationSuccess('Friend Request Accepted')

                return true
            }

            return false
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

const DenyFriend = async (token: string, senderID: number) => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/deny_friend`,
            {
                senderID: senderID,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            const status = res.data.status

            if (status === 'Success') {
                NotificationSuccess('Friend Request Declined')

                return true
            }

            return false
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

const CancelInvite = async (token: string, receiverID: number) => {
    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/friends/cancel_invite`,
            {
                receiverID: receiverID,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        .then(res => {
            const status = res.data.status

            if (status === 'Success') {
                NotificationSuccess('Friend Invite Canceled')

                return true
            }

            return false
        })
        .catch(ex => {
            const error = ex.response?.data.description ?? ex ?? 'Uknown Error'
            console.error(error)

            NotificationError(`${error}`)
        })
}

export { AddFriend, RemoveFriend, AcceptFriend, DenyFriend, CancelInvite }
