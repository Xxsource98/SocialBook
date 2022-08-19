import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'

import AreFriends from '@functions/api/friends/AreFriends'
import { FriendType, GetAllFriendsList, GetAllFriendsListType, PendingType } from '@functions/Friends'

import { ReduxSelectorType } from '@redux/reduxReducers'

export type UseFriendsType = {
    friendsList: FriendType[]
    friendsLoading: boolean
    pendingList: PendingType
    CheckIfFriends: (username: string) => Promise<boolean>
}

const useFriends = (username?: string): UseFriendsType => {
    const reduxUserData = useSelector((state: ReduxSelectorType) => state.userData.data)

    const [friendsLoading, setLoading] = useState<boolean>(false)
    const [shouldRefresh, setRefresh] = useState<boolean>(false)
    const [friendsList, setFriendsList] = useState<FriendType[]>([])
    const [pendingList, setPendingsList] = useState<PendingType>({
        sent: [],
        received: [],
    })

    const FetchFriends = useCallback(async () => {
        setLoading(true)

        let friendsData: GetAllFriendsListType = {
            friendsList: [],
            receivedList: [],
            sentList: [],
        }

        if (username === undefined && reduxUserData.friends !== null) {
            friendsData = {
                friendsList: reduxUserData.friends.friends,
                receivedList: reduxUserData.friends.requests.received,
                sentList: reduxUserData.friends.requests.sent,
            }
        } else {
            friendsData = await GetAllFriendsList(username)
        }

        setFriendsList(friendsData.friendsList ?? [])
        setPendingsList({
            sent: friendsData.sentList,
            received: friendsData.receivedList,
        })

        if (shouldRefresh) {
            setRefresh(false)
        }

        setLoading(false)
    }, [username, shouldRefresh])

    useEffect(() => {
        FetchFriends()
    }, [FetchFriends])

    const CheckIfFriends = async (username: string) => {
        const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

        return AreFriends(accessToken, username)
    }

    return { friendsList, friendsLoading, pendingList, CheckIfFriends }
}

export default useFriends
