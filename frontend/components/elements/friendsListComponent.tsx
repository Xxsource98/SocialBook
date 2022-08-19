import React from 'react'
import classNames from 'classnames'

import { FriendComponentActionsType, FriendType, GetFriendType } from '@functions/Friends'

import FriendComponent, { FriendSkeleton, NewFriendComponent } from '@components/elements/friendComponent'

type FriendsListComponentType = {
    friendsLoading: boolean
    friends: FriendType[]
    sentFriends: FriendType[]
    receivedFriends: FriendType[]
    actions: FriendComponentActionsType
    customBlankText?: string
    removeHeaderText?: boolean
}

type NewFriendsListComponentType = {
    friends: FriendType[]
    actions: FriendComponentActionsType
    customBlankText?: string
}

type DrawSectionHeaderType = {
    header: string
}

const FriendsListComponent: React.FC<FriendsListComponentType> = ({ friendsLoading, friends, sentFriends, receivedFriends, actions, customBlankText, removeHeaderText }) => {
    const DrawSectionHeader = ({ header }: DrawSectionHeaderType): JSX.Element => {
        if (removeHeaderText) {
            return <React.Fragment />
        }

        return <h2 className={classNames('relative', 'text-base', 'font-semibold')}>{header}</h2>
    }

    const DrawFriends = () => {
        if (friends && friends.length > 0) {
            const Friends = friends.map((friend, i) => {
                const friendType = GetFriendType(friend)

                return <FriendComponent userData={friend} userType={friendType} actions={actions} key={i} />
            })

            return (
                <div className={classNames('relative', 'flex', 'flex-col', 'gap-3')}>
                    <DrawSectionHeader header="Friends List" />
                    {Friends}
                </div>
            )
        }

        return <h1 className={classNames('relative', 'mt-4', 'text-sm', 'font-semibold', 'xs:text-lg', 'text-center')}>{customBlankText ?? "You don't have any friends yet ;/"}</h1>
    }

    const DrawSentFriends = () => {
        if (sentFriends && sentFriends.length > 0) {
            const SentInvites = sentFriends.map((friend, i) => {
                const friendType = GetFriendType(friend)

                return <FriendComponent userData={friend} userType={friendType} actions={actions} key={i} />
            })

            return (
                <div className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'border-b-2', 'border-blue-500', 'border-opacity-25', 'pb-2')}>
                    <DrawSectionHeader header="Sent Invites" />
                    {SentInvites}
                </div>
            )
        }

        return <React.Fragment />
    }

    const DrawReceivedFriends = () => {
        if (receivedFriends && receivedFriends.length > 0) {
            const ReceivedInvites = receivedFriends.map((friend, i) => {
                const friendType = GetFriendType(friend)

                return <FriendComponent userData={friend} userType={friendType} actions={actions} key={i} />
            })

            return (
                <div className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'border-b-2', 'border-green-500', 'border-opacity-25', 'pb-2')}>
                    <DrawSectionHeader header="Received List" />
                    {ReceivedInvites}
                </div>
            )
        }

        return <React.Fragment />
    }

    if (friendsLoading) {
        return (
            <div className={classNames('relative', 'w-full', 'flex', 'flex-col', 'gap-3')}>
                <FriendSkeleton />
                <FriendSkeleton />
                <FriendSkeleton />
                <FriendSkeleton />
                <FriendSkeleton />
                <FriendSkeleton />
            </div>
        )
    }

    return (
        <div className={classNames('relative', 'w-full', 'flex', 'flex-col', 'gap-3')}>
            <DrawReceivedFriends />
            <DrawSentFriends />
            <DrawFriends />
        </div>
    )
}

export const NewFriendsListComponent: React.FC<NewFriendsListComponentType> = ({ friends, actions, customBlankText }) => {
    const DrawFriends = () => {
        if (friends && friends.length > 0) {
            const Friends = friends.map((friend, i) => {
                const friendType = GetFriendType(friend)

                return <NewFriendComponent userData={friend} userType={friendType} actions={actions} key={i} />
            })

            return <div className={classNames('relative', 'flex', 'flex-col', 'gap-3')}>{Friends}</div>
        }

        return <h1 className={classNames('relative', 'mt-4', 'text-sm', 'font-semibold', 'xs:text-lg', 'text-center')}>{customBlankText ?? "You don't have any friends yet ;/"}</h1>
    }

    return (
        <div className={classNames('relative', 'w-full', 'flex', 'flex-col', 'gap-3')}>
            <DrawFriends />
        </div>
    )
}

export default FriendsListComponent
