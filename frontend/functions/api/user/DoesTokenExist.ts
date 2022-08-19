import { getCookie } from 'cookies-next'

const DoesTokenExist = (): boolean => {
    const jwtToken = getCookie('socialbook_accessToken')

    return jwtToken !== undefined
}

export default DoesTokenExist
