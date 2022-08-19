import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

import { FriendComponentActionsType, FriendType, PendingType } from '@functions/Friends'

import FriendsListComponent from '@components/elements/friendsListComponent'
import Input from '@components/elements/input'

type FriendsListType = {
    friendsList: FriendType[]
    friendsLoading: boolean
    pendingList: PendingType
    actions: FriendComponentActionsType
}

const FriendsListComp: React.FC<FriendsListType> = ({ friendsList, friendsLoading, pendingList, actions }) => {
    const [searchInput, setSearchInput] = useState<string>('')
    const [currentSentList, setSentList] = useState<FriendType[]>([])
    const [currentReceivedList, setReceivedList] = useState<FriendType[]>([])
    const [currentFriendsList, setFriendsList] = useState<FriendType[]>([])

    const friendActions: FriendComponentActionsType = {
        addFriend: actions.addFriend,
        removeFriend: actions.removeFriend,
        acceptFriend: actions.acceptFriend,
        declineFriend: actions.declineFriend,
        cancelInvite: actions.cancelInvite,
    }

    const UpdateFriendsList = useCallback(() => {
        const findFriendsOutput = friendsList.filter(friend => {
            return friend.username.indexOf(searchInput) !== -1 || friend.firstName.indexOf(searchInput) !== -1 || friend.lastName.indexOf(searchInput) !== -1
        })

        const findSentOutput = pendingList.sent.filter(friend => {
            return friend.username.indexOf(searchInput) !== -1 || friend.firstName.indexOf(searchInput) !== -1 || friend.lastName.indexOf(searchInput) !== -1
        })

        const findReceivedOutput = pendingList.received.filter(friend => {
            return friend.username.indexOf(searchInput) !== -1 || friend.firstName.indexOf(searchInput) !== -1 || friend.lastName.indexOf(searchInput) !== -1
        })

        setFriendsList(findFriendsOutput)
        setSentList(findSentOutput)
        setReceivedList(findReceivedOutput)
    }, [friendsList, friendsLoading, searchInput])

    useEffect(() => {
        UpdateFriendsList()
    }, [UpdateFriendsList])

    const HandleSearchInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev) {
            ev.preventDefault()

            setSearchInput(ev.target.value)
        }
    }

    return (
        <div className={classNames('relative', 'w-full', 'lg:w-[450px]', 'flex', 'flex-col', 'gap-3', 'border-slate-400', 'border-opacity-30', 'border-b-2', 'pb-5', 'mb-5')}>
            <h2 className={classNames('relative', 'font-semibold', 'text-lg')}>My Friends</h2>
            <div className={classNames('relative', 'px-4')}>
                <Input className={classNames('mb-4')} placeholder="Search for friend" onChange={HandleSearchInput} />
                <FriendsListComponent friendsLoading={friendsLoading} friends={currentFriendsList} sentFriends={currentSentList} receivedFriends={currentReceivedList} actions={friendActions} />
            </div>
        </div>
    )
}

export default FriendsListComp
