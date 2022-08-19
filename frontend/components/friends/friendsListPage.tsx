import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { FriendComponentActionsType, FriendType, GetAllFriendsList, GetAllFriendsListType, GetUserFriendsActions, PendingType } from '@functions/Friends'
import useFriends from '@functions/hooks/useFriends'
import useUser from '@functions/hooks/useUser'

import Section from '@components/dashboard/dashboardSection'
import PageWrapper from '@components/elements/pageWrapper'
import FindNewFriends from '@components/friends/findNewFriends'
import FriendsList from '@components/friends/friendsList'

import { ReduxSelectorType } from '@redux/reduxReducers'

type FriendsListPageType = {
    username?: string
}

const FriendListPage: React.FC<FriendsListPageType> = ({ username }) => {
    const reduxUserData = useSelector((state: ReduxSelectorType) => state.userData.data.friends)

    const [, setFindFriends] = useState<GetAllFriendsListType>()

    const [localData] = useUser()
    const { friendsLoading } = useFriends(username)

    const InitFriendsForFind = useCallback(async () => {
        const friendsList = await GetAllFriendsList(username)

        setFindFriends(friendsList)
    }, [])

    useEffect(() => {
        InitFriendsForFind()
    }, [InitFriendsForFind])

    const friendActions = GetUserFriendsActions()

    const DrawFriendsList = () => {
        if (reduxUserData) {
            return <FriendsList friendsList={reduxUserData?.friends as FriendType[]} friendsLoading={friendsLoading} pendingList={reduxUserData?.requests as PendingType} actions={reduxUserData?.actions as FriendComponentActionsType} />
        }

        return <React.Fragment />
    }

    return (
        <PageWrapper header="Friends List">
            <Section className={classNames('flex', 'flex-col', 'items-center', 'h-full')} noShadow>
                <DrawFriendsList />
                <FindNewFriends localUsername={localData?.username as string} actions={friendActions} username={username as string} />
            </Section>
        </PageWrapper>
    )
}

export default FriendListPage
