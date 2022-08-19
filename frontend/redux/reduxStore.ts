import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit'
import Reducers from '@redux/reduxReducers'
import thunk from 'redux-thunk'

const Store = configureStore({
    reducer: Reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

export default Store
