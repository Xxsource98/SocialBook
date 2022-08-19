import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'

import GetUserInfo, { UserType } from '@functions/api/user/GetUserInfo'

import { ReduxSelectorType } from '@redux/reduxReducers'

export const InitLocalUser = async () => {
    const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

    return GetUserInfo(accessToken)
}

const useUser = (username?: string): [UserType | null, boolean] => {
    const reduxUserData = useSelector((state: ReduxSelectorType) => state.userData.data)

    const [userLoading, setLoading] = useState<boolean>(false)
    const [userData, setUserdata] = useState<UserType | null>(null)

    const FetchUser = useCallback(async () => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''
        setLoading(true)

        if (username === undefined && reduxUserData.user !== null) {
            setUserdata(reduxUserData.user)
        } else {
            await GetUserInfo(accessToken, username)
                .then(data => {
                    setUserdata(data)
                })
                .catch(ex => {
                    console.error(ex)
                })
        }

        setLoading(false)
    }, [username])

    useEffect(() => {
        FetchUser()
    }, [FetchUser])

    return [userData, userLoading]
}

export default useUser
