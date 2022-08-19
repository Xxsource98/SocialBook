import classNames from 'classnames'
import React from 'react'

import FriendComponent, { FriendSkeleton } from '@components/elements/friendComponent'
import Link from '@components/elements/link'

import { FriendComponentActionsType, FriendType, GetFriendType } from '@functions/Friends'

type FriendsListType = {
    friendsList: FriendType[]
    friendsLoading: boolean
    username: string
    actions: FriendComponentActionsType
}

const FriendsList: React.FC<FriendsListType> = ({ friendsList, friendsLoading, username, actions }) => {
    const FriendsListComponent = () => {
        if (friendsLoading) {
            return (
                <React.Fragment>
                    <FriendSkeleton />
                    <FriendSkeleton />
                    <FriendSkeleton />
                    <FriendSkeleton />
                    <FriendSkeleton />
                </React.Fragment>
            )
        }

        if (friendsList.length === 0) {
            return <h2 className={classNames('relative', 'font-medium', 'text-base', 'text-center', 'mt-5', 'mb-5')}>User doesn&apos;t have any friends</h2>
        }

        const DrawFriendsList = friendsList.map((friend, i) => {
            const friendType = GetFriendType(friend)

            return <FriendComponent userData={friend} actions={actions} key={i} userType={friendType} />
        })

        return <React.Fragment>{DrawFriendsList}</React.Fragment>
    }

    return (
        <div className={classNames('')}>
            <h2 className={classNames('relative', 'font-medium', 'text-base', 'mb-2', 'text-center', 'xs:text-lg')}>Friends List</h2>
            <div className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'max-h-96', 'py-2', 'overflow-y-auto')}>
                <FriendsListComponent />
            </div>
            <div className={classNames('relative', 'text-center', 'font-medium', 'text-sm', 'mt-2')}>
                <Link href={`/friends/${username}`}>Show Friends List</Link>
            </div>
        </div>
    )
}

export default FriendsList
