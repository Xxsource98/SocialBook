import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { UserMinus, UserPlus, UserX as UserRemove } from 'react-feather'
import { useDispatch } from 'react-redux'

import { updateLocalFriends } from '@redux/reducers/userDataReducer'

import useFriends from '@functions/hooks/useFriends'
import usePosts from '@functions/hooks/usePosts'
import { GetUserFriendsActions, InitLocalFriends } from '@functions/Friends'

import PageWrapper from '@components/elements/pageWrapper'
import UserSection from '@components/elements/userSection'
import useUser from '@functions/hooks/useUser'
import Section from '@components/dashboard/dashboardSection'
import FriendsList from '@components/userProfile/friendsList'
import UserPosts from '@components/userProfile/userPosts'
import { FriendActionType } from '@components/elements/friendComponent'

type UserProfileType = {
    username: string
}

const UserProfile: React.FC<UserProfileType> = ({ username }) => {
    const [type, setType] = useState<FriendActionType>('unknown')
    const reduxDispatch = useDispatch()

    const [localUser, localUserLoading] = useUser()
    const [userData, userLoading] = useUser(username)
    const { posts, postsLoading, LikePost, RefreshPost, UpdatePost, DeletePost } = usePosts(username)
    const { friendsList, friendsLoading, pendingList, CheckIfFriends } = useFriends(username)

    const friendActions = GetUserFriendsActions()

    const FriendsCallback = useCallback(async () => {

        const ifFriends = await CheckIfFriends(username)
        const invited =
            pendingList.sent.findIndex(value => {
                return value.username === username
            }) !== -1
        const received =
            pendingList.received.findIndex(value => {
                return value.username === username
            }) !== -1

        if (localUser?.username === username) setType('me')
        if (ifFriends) setType('friends')
        if (invited) setType('invited')
        if (received) setType('received')
    }, [username, pendingList])

    useEffect(() => {
        FriendsCallback()
    }, [FriendsCallback])

    const UserFriendAction = () => {
        const userID = userData?.id as number
        
        if (type === 'me') {
            return <React.Fragment />
        }

        if (type === 'friends') {
            const action = async () => {
                await friendActions.removeFriend(userID)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                setType('unknown')
            }

            return <UserRemove className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={action} />
        }

        if (type === 'invited') {
            const action = async () => {
                await friendActions.cancelInvite(userID)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                setType('unknown')
            }

            return <UserMinus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={action} />
        }

        if (type === 'received') {
            const acceptAction = async () => {
                await friendActions.acceptFriend(userID)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                setType('friends')
            }

            const denyAction = async () => {
                await friendActions.declineFriend(userID)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                setType('unknown')
            }

            return (
                <div className={classNames('flex', 'gap-3')}>
                    <UserMinus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={denyAction} />
                    <UserPlus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={acceptAction} />
                </div>
            )
        }

        const addAction = async () => {
            await friendActions.addFriend(userID)

            const newFriends = await InitLocalFriends()
            reduxDispatch(updateLocalFriends(newFriends))
            setType('invited')
        }

        return <UserPlus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={addAction} />
    }

    const DrawPostsList = () => {
        if (posts.length === 0) return (
            <h3 className={classNames('relative', 'w-full', 'text-center', 'font-semibold', 'text-lg')}>User doesn&apos;t have any posts yet</h3>
        )

        return <UserPosts userData={localUser} posts={posts} postsLoading={postsLoading} LikePost={LikePost} RefreshPost={RefreshPost} UpdatePost={UpdatePost} DeletePost={DeletePost} />
    }

    return (
        <PageWrapper>
            <div id="user-wrapper" className={classNames('relative', 'flex', 'w-full', 'h-full', 'flex-col', 'items-center', 'gap-3')}>
                <div className={classNames('relative', 'w-[90%]', 'flex', 'flex-col', 'gap-3', 'justify-center', 'items-center', 'border-b-2', 'border-b-slate-300', 'pb-5', 'dark:border-b-slate-500', 'xl:w-[900px]')}>
                    <div className={classNames('w-full', 'xl:w-[500px]')}>
                        <Section className={classNames('w-full')} inDashboard>
                            <h2 className={classNames('relative', 'text-center', 'font-semibold', 'text-base', 'xs:text-lg')}>{username}&apos;s Profile</h2>
                        </Section>           
                    </div>
                    <div className={classNames('w-full', 'xl:w-[500px]')}>
                        <UserSection className={classNames('relative', 'w-full')} userData={userData} loading={userLoading && localUserLoading} inDashboard bioText>
                            <UserFriendAction />
                        </UserSection>
                    </div>
                </div>
                <div className={classNames('relative', 'w-[90%]', 'flex', 'flex-col', 'gap-3', 'items-center', 'justify-center', 'mt-2', 'xl:items-start', 'xl:flex-row')}>
                    <div className={classNames('relative', 'w-full', 'xl:w-[400px]')}>
                        <Section className={classNames('w-full')} inDashboard>
                            <FriendsList friendsList={friendsList} friendsLoading={friendsLoading} actions={friendActions} username={username} />
                        </Section>
                    </div>
                    <div className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'w-full', 'xl:w-[600px]')}>
                        <DrawPostsList />
                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

export default UserProfile
