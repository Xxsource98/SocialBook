import React, { useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { UserMinus, UserPlus, UserX as UserRemove } from 'react-feather'
import Skeleton from 'react-loading-skeleton'

import { FriendComponentActionsType, FriendType, InitLocalFriends } from '@functions/Friends'

import Link from '@components/elements/link'
import ProfilePictureComponent from '@components/elements//profilePicture'

import { updateLocalFriends } from '@redux/reducers/userDataReducer'
import { acceptUser, inviteUser, removeUser } from '@redux/reducers/newFriendsReducer'

export type FriendActionType = 'me' | 'friends' | 'received' | 'invited' | 'unknown'
export type CustomActionType = 'remove' | 'invite' | 'accept' | 'deny' | 'add'

type FriendComponentType = {
    userData: FriendType
    actions: FriendComponentActionsType
    userType: FriendActionType
}

type FriendDrawElementType = {
    userData: FriendType
    actions: React.ReactNode
}

export const FriendSkeleton: React.FC = () => {
    return (
        <div className={classNames('relative', 'flex', 'items-center', 'gap-3', 'xs:px-3')}>
            <div className={classNames('relative', 'w-full', 'flex', 'gap-x-3')}>
                <div className={classNames('relative', 'w-10', 'h-10', 'xs:w-14', 'xs:h-14')}>
                    <Skeleton width={'100%'} height={'100%'} circle />
                </div>
                <div className={classNames('flex', 'flex-col', 'justify-center')}>
                    <Skeleton count={2} width={150} />
                </div>
            </div>
        </div>
    )
}

const FriendDrawElement: React.FC<FriendDrawElementType> = ({ userData, actions }) => {
    return (
        <div className={classNames('relative', 'flex', 'items-center', 'gap-3', 'xs:px-3')}>
            <div className={classNames('relative', 'w-full', 'flex', 'gap-x-3')}>
                <div className={classNames('relative', 'w-10', 'h-10', 'xs:w-14', 'xs:h-14')}>
                    <Link href={`/user/${userData.username}`}>
                        <ProfilePictureComponent src={userData.profilePicture} />
                    </Link>
                </div>
                <div className={classNames('flex', 'flex-col', 'justify-center')}>
                    <Link href={`/user/${userData.username}`}>
                        <p className={classNames('font-semibold', 'text-base', 'xs:text-md')}>
                            {userData.firstName} {userData.lastName}
                        </p>
                        <p className={classNames('text-sm')}>@{userData.username}</p>
                    </Link>
                </div>
            </div>
            <div>{actions}</div>
        </div>
    )
}

const FriendComponent: React.FC<FriendComponentType> = ({ userData, actions, userType }) => {
    const [type, setType] = useState<FriendActionType>(userType)
    const reduxDispatch = useDispatch()

    const UserFriendAction = () => {
        if (type === 'me') {
            return <React.Fragment />
        }

        if (type === 'friends') {
            const action = async () => {
                await actions.removeFriend(userData.id)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                setType('unknown')
            }

            return <UserRemove className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={action} />
        }

        if (type === 'invited') {
            const action = async () => {
                await actions.cancelInvite(userData.id)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                setType('unknown')
            }

            return <UserMinus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={action} />
        }

        if (type === 'received') {
            const acceptAction = async () => {
                await actions.acceptFriend(userData.id)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                setType('friends')
            }

            const denyAction = async () => {
                await actions.declineFriend(userData.id)

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
            await actions.addFriend(userData.id)

            const newFriends = await InitLocalFriends()
            reduxDispatch(updateLocalFriends(newFriends))
            setType('invited')
        }

        return <UserPlus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={addAction} />
    }

    return <FriendDrawElement userData={userData} actions={<UserFriendAction />} />
}

export const NewFriendComponent: React.FC<FriendComponentType> = ({ userData, actions, userType }) => {
    const [type, setType] = useState<FriendActionType>(userType)
    const reduxDispatch = useDispatch()

    const UserFriendAction = () => {
        if (type === 'me') {
            return <React.Fragment />
        }

        if (type === 'friends') {
            const action = async () => {
                await actions.removeFriend(userData.id)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                reduxDispatch(removeUser(userData))
                setType('unknown')
            }

            return <UserRemove className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={action} />
        }

        if (type === 'invited') {
            const action = async () => {
                await actions.cancelInvite(userData.id)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                reduxDispatch(removeUser(userData))
                setType('unknown')
            }

            return <UserMinus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={action} />
        }

        if (type === 'received') {
            const acceptAction = async () => {
                await actions.acceptFriend(userData.id)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                reduxDispatch(acceptUser(userData))
                setType('friends')
            }

            const denyAction = async () => {
                await actions.declineFriend(userData.id)

                const newFriends = await InitLocalFriends()
                reduxDispatch(updateLocalFriends(newFriends))
                reduxDispatch(removeUser(userData))
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
            await actions.addFriend(userData.id)

            const newFriends = await InitLocalFriends()
            reduxDispatch(updateLocalFriends(newFriends))
            reduxDispatch(inviteUser(userData))
            setType('invited')
        }

        return <UserPlus className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={addAction} />
    }

    return <FriendDrawElement userData={userData} actions={<UserFriendAction />} />
}

export default FriendComponent
