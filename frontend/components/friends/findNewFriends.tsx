import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import GetUsersList from '@functions/api/user/GetUsersList'
import { FriendComponentActionsType, FriendType } from '@functions/Friends'

import { NewFriendsListComponent } from '@components/elements/friendsListComponent'
import Input from '@components/elements/input'

import { updateList } from '@redux/reducers/newFriendsReducer'
import { ReduxSelectorType } from '@redux/reduxReducers'

type FindNewFriendsType = {
    username: string
    localUsername: string
    actions: FriendComponentActionsType
}

const FindNewFriendsComponent: React.FC<FindNewFriendsType> = ({ localUsername, actions }) => {
    const reduxStateData = useSelector((state: ReduxSelectorType) => state.newFriends.list)
    const reduxDispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement>(null)
    const [searching, setSearching] = useState<boolean>(false)
    const [notFound, setNotFound] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string>('') // refreshing XD

    const InitInputListener = useCallback(() => {
        if (inputRef && inputRef.current) {
            let timer: NodeJS.Timeout
            let text = ''

            inputRef.current.addEventListener('keyup', () => {
                setNotFound(false)
                setSearching(true)

                text = inputRef.current?.value as string

                clearTimeout(timer)

                timer = setTimeout(() => {
                    setSearchInput(text ?? '')
                    setSearching(false)
                }, 3000)
            })
        }
    }, [inputRef])

    const UpdateFriendsList = useCallback(async () => {
        if (searchInput.length > 0) {
            await GetUsersList(searchInput, localUsername).then(users => {
                if (users) {
                    reduxDispatch(updateList(users as FriendType[]))

                    if (users.length === 0) {
                        setNotFound(true)
                    }
                } else {
                    setNotFound(true)
                }
            })
        }
    }, [searchInput])

    useEffect(() => {
        InitInputListener()
        UpdateFriendsList()
    }, [InitInputListener, UpdateFriendsList])

    const BlankText = searching ? 'Searching...' : notFound ? 'Users not found' : 'Write username to find!'

    return (
        <div className={classNames('relative', 'w-full', 'lg:w-[450px]', 'flex', 'flex-col', 'gap-3')}>
            <h2 className={classNames('relative', 'font-semibold', 'text-lg')}>Find New Friends</h2>
            <div className={classNames('relative', 'px-4')}>
                <Input ref={inputRef} className={classNames('mb-4')} placeholder="Search for friend" />
                <NewFriendsListComponent friends={reduxStateData} actions={actions} customBlankText={BlankText} />
            </div>
        </div>
    )
}

export default FindNewFriendsComponent
