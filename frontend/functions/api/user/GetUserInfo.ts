import axios from 'axios'

export type UserType = {
    id: number
    username: string
    firstName: string
    lastName: string
    bio: string
    profilePicture: string
}

const GetUserInfo = async (token: string, username?: string, server?: boolean): Promise<UserType | null> => {
    let user: UserType | null = null
    const serverUrl = server ? `${process.env.SERVER_CONTAINER_URL}:${process.env.SERVER_CONTAINER_PORT}` : `${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
    const url = username ? `${serverUrl}/user/info/username/${username}` : `${serverUrl}/user/info`

    await axios
        .get(url, {
            headers: {
                Authorization: token,
            },
        })
        .then(userData => {
            const userObject = userData.data.description

            user = {
                id: userObject.id,
                username: userObject.username,
                firstName: userObject.firstName,
                lastName: userObject.lastName,
                bio: userObject.bio,
                profilePicture: userObject.profilePicture,
            }
        })
        .catch(ex => console.error(ex.response?.data))

    return user
}

export default GetUserInfo
