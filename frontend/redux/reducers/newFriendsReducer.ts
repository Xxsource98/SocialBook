import { FriendType } from '@functions/Friends'
import { createSlice } from '@reduxjs/toolkit'

export type NewFriendsStateType = {
    list: FriendType[]
}

type FriendActionType = {
    payload: FriendType
}

type ListActionType = {
    payload: FriendType[]
}

const NewFriendsSlice = createSlice({
    name: 'NewFriends',
    initialState: {
        list: [],
    },
    reducers: {
        updateList(state: NewFriendsStateType, action: ListActionType) {
            state.list = action.payload
        },
        acceptUser(state: NewFriendsStateType, acion: FriendActionType) {
            const friendIndex = state.list.findIndex(user => user.id === acion.payload.id)

            if (friendIndex !== -1) {
                state.list[friendIndex].areFriends = true
            }
        },
        removeUser(state: NewFriendsStateType, acion: FriendActionType) {
            const friendIndex = state.list.findIndex(user => user.id === acion.payload.id)

            if (friendIndex !== -1) {
                state.list[friendIndex].areFriends = false
                state.list[friendIndex].isInvited = false
                state.list[friendIndex].isReceived = false
            }
        },
        inviteUser(state: NewFriendsStateType, acion: FriendActionType) {
            const friendIndex = state.list.findIndex(user => user.id === acion.payload.id)

            if (friendIndex !== -1) {
                state.list[friendIndex].isInvited = true
            }
        },
    },
})

export const { updateList, acceptUser, removeUser, inviteUser } = NewFriendsSlice.actions

export default NewFriendsSlice.reducer
