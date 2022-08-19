import axios from 'axios'
import { getCookie } from 'cookies-next'

import { NotificationError, NotificationSuccess } from '@functions/Notifications'

type NewUserData = {
    username?: string | undefined
    currentPassword?: string | undefined
    newPassword?: string | undefined
    email?: string | undefined
    bio?: string | undefined
}

const UpdateUserInfo = async (newData: NewUserData): Promise<boolean> => {
    const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

    return axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/user/update`,
            {
                username: newData.username,
                currentPassword: newData.currentPassword,
                newPassword: newData.newPassword,
                email: newData.email,
                bio: newData.bio,
            },
            {
                headers: {
                    Authorization: accessToken,
                },
            }
        )
        .then(response => {
            const success = response.status === 200

            if (!success) {
                NotificationError('Unknown Error')
            } else {
                NotificationSuccess('Profile Updated')

                return true
            }

            return false
        })
        .catch(ex => {
            console.error(ex.response?.data)

            NotificationError(ex.response?.data?.description)

            return false
        })
}

export const UpdateProfilePicture = async (picture: File): Promise<boolean> => {
    const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

    const formData = new FormData()
    formData.append('avatar', picture)

    return axios
        .post(`${process.env.SERVER_URL}:${process.env.SERVER_PORT}/user/update/profile_picture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: accessToken,
            },
        })
        .then(response => {
            const success = response.status === 200

            if (!success) {
                NotificationError('Unknown Error')
            } else {
                NotificationSuccess('Profile Picture Updated')

                return true
            }

            return false
        })
        .catch(ex => {
            console.error(ex.response?.data)

            NotificationError(ex.response?.data?.description)

            return false
        })
}

export default UpdateUserInfo
