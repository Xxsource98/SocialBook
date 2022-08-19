import { getCookie } from 'cookies-next'

import { FriendActionType } from '@components/elements/friendComponent'

import { AcceptFriend, AddFriend, CancelInvite, DenyFriend, RemoveFriend } from '@functions/api/friends/FriendsActions'
import GetFriendsList from '@functions/api/friends/GetFriendsList'
import GetPendinglist from '@functions/api/friends/GetPendingList'
import GetUserInfo, { UserType } from '@functions/api/user/GetUserInfo'

type ActionType = (userID: number) => Promise<boolean | void>

export type PendingTypeStrings = {
    sent: UserType[]
    received: UserType[]
}

export type FriendComponentActionsType = {
    addFriend: ActionType
    removeFriend: ActionType
    acceptFriend: ActionType
    declineFriend: ActionType
    cancelInvite: (receiverID: number) => Promise<boolean | void>
}

export type FriendType = {
    areFriends?: boolean
    isMe?: boolean
    isInvited?: boolean
    isReceived?: boolean
} & UserType

export type PendingType = {
    sent: FriendType[]
    received: FriendType[]
}

export type InitFriendsType = {
    requests: PendingType
    friends: FriendType[]
    actions: FriendComponentActionsType
}

export type GetAllFriendsListType = {
    friendsList: FriendType[]
    sentList: FriendType[]
    receivedList: FriendType[]
}

export const GetAllFriendsList = async (username?: string): Promise<GetAllFriendsListType> => {
    const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

    const LocalUser = await GetUserInfo(accessToken)

    // Friends List
    const currentFriendsList = await GetFriendsList(accessToken, username).then(friends => {
        return friends ?? []
    })

    const currentFriendsListData = await Promise.all(
        currentFriendsList.map(async friend => {
            return {
                isMe: friend.username === LocalUser?.username,
                ...friend,
            }
        })
    )

    // Pending List
    const currentPendingList = await GetPendinglist(accessToken).then((pendingObject: PendingTypeStrings) => {
        return pendingObject ?? {}
    })

    const currentSentListData = await Promise.all(
        currentPendingList.sent.map(async user => {
            return {
                isInvited: true,
                ...user,
            } as FriendType
        })
    )
    const currentReceivedListData = await Promise.all(
        currentPendingList.received.map(async user => {
            return {
                isReceived: true,
                ...user,
            } as FriendType
        })
    )

    return {
        friendsList: currentFriendsListData,
        sentList: currentSentListData,
        receivedList: currentReceivedListData,
    }
}

export const GetUserFriendsActions = (): FriendComponentActionsType => {
    const accessToken = getCookie('socialbook_accessToken')?.toString() ?? ''

    return {
        addFriend: async (userID: number) => {
            return AddFriend(accessToken, userID)
        },
        removeFriend: async (userID: number) => {
            return RemoveFriend(accessToken, userID)
        },
        acceptFriend: async (userID: number) => {
            return AcceptFriend(accessToken, userID)
        },
        declineFriend: async (userID: number) => {
            return DenyFriend(accessToken, userID)
        },
        cancelInvite: async (receiverID: number) => {
            return CancelInvite(accessToken, receiverID)
        },
    }
}

export const InitLocalFriends = async (): Promise<InitFriendsType> => {
    const allFriends = await GetAllFriendsList()

    const friendActions = GetUserFriendsActions()

    return {
        requests: {
            sent: allFriends.sentList,
            received: allFriends.receivedList,
        },
        friends: allFriends.friendsList,
        actions: friendActions,
    }
}

export const GetFriendType = (friend: FriendType): FriendActionType => {
    if (friend.isMe) return 'me'
    if (friend.areFriends) return 'friends'
    if (friend.isInvited) return 'invited'
    if (friend.isReceived) return 'received'

    return 'unknown'
}
