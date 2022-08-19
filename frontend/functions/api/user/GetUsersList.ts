import axios from 'axios'
import { getCookie } from 'cookies-next'

import GetUserInfo, { UserType } from '@functions/api/user/GetUserInfo'
import GetPendinglist from '@functions/api/friends/GetPendingList'
import { FriendType } from '@functions/Friends'
import GetFriendsList from '@functions/api/friends/GetFriendsList'

const GetUsersList = async (keys?: string, localName?: string) => {
    const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

    const url = keys ? `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/user/all_users/${keys}` : `${process.env.SERVER_URL}:${process.env.SERVER_PORT}/user/all_users`

    const usersList = await axios
        .get(url, {
            headers: {
                Authorization: accessToken,
            },
        })
        .then(res => {
            const data = res.data

            return data.description as string[]
        })

    const currentPendingList = await GetPendinglist(accessToken).then(pendingObject => {
        return pendingObject ?? {}
    })
    const friendsList = await GetFriendsList(accessToken)

    const currentFriendsFoundListData = await Promise.all(
        usersList.map(async user => {
            const UserInfo = await GetUserInfo(accessToken, user)

            if (UserInfo) {
                const isMe = UserInfo?.username === localName
                const areFriends = friendsList.findIndex(friend => friend.username === user) !== -1
                const isInvited = currentPendingList.sent.findIndex(friend => friend.username === user) !== -1
                const isReceived = currentPendingList.received.findIndex(friend => friend.username === user) !== -1

                return {
                    isMe: isMe,
                    areFriends: areFriends,
                    isInvited: isInvited,
                    isReceived: isReceived,
                    ...(UserInfo as UserType),
                } as FriendType
            }

            return null
        })
    )

    return currentFriendsFoundListData
}

export default GetUsersList
