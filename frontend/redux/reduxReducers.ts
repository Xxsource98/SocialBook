import { combineReducers } from 'redux'
import UserDataReducer, { UserDataStateType } from '@redux/reducers/userDataReducer'
import DarkModeReducer, { DarkModeStateType } from '@redux/reducers/darkModeReducer'
import NewFriendsReducer, { NewFriendsStateType } from '@redux/reducers/newFriendsReducer'

export type ReduxSelectorType = {
    userData: UserDataStateType
    darkMode: DarkModeStateType
    newFriends: NewFriendsStateType
}

const Reducers = combineReducers({
    userData: UserDataReducer,
    darkMode: DarkModeReducer,
    newFriends: NewFriendsReducer,
})

export default Reducers
