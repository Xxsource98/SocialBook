import { UserType } from '@functions/api/user/GetUserInfo'
import { InitFriendsType } from '@functions/Friends'
import { createSlice } from '@reduxjs/toolkit'

type DataType = {
    user: UserType | null
    friends: InitFriendsType | null
}

export type UserDataStateType = {
    data: DataType
}

type FriendsActionType = {
    payload: InitFriendsType
}

type UserActionType = {
    payload: UserType
}

export const UserDataSlice = createSlice({
    name: 'UserData',
    initialState: {
        data: {
            user: null,
            friends: null,
        } as DataType,
    },
    reducers: {
        updateLocalUser: (state: UserDataStateType, action: UserActionType) => {
            state.data.user = action.payload
        },
        updateLocalFriends: (state: UserDataStateType, action: FriendsActionType) => {
            state.data.friends = action.payload
        },
        clearData: (state: UserDataStateType) => {
            state.data.friends = null
            state.data.user = null
        },
    },
})

export const { updateLocalUser, updateLocalFriends, clearData } = UserDataSlice.actions

export default UserDataSlice.reducer
