import axios from 'axios'
import { getCookie, setCookie } from 'cookies-next'

const RefreshAT = async (id: number, username: string) => {
    const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

    const refreshTokens = await axios
        .post(
            `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/user/refreshAT`,
            {
                id: id,
                username: username,
            },
            {
                headers: {
                    Authorization: accessToken,
                },
            }
        )
        .then(res => {
            const data = res.data

            return data.tokens
        })
        .catch(ex => console.error(ex.response?.data))

    if (refreshTokens) {
        setCookie('socialbook_accessToken', refreshTokens.accessToken)
        if (getCookie('socialbook_refreshToken')) {
            setCookie('socialbook_refreshToken', refreshTokens.refreshToken)
        }
    }
    else {
        throw new Error("Failed to get new tokens")
    }
}

export default RefreshAT
