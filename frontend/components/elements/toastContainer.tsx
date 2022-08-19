import React, { useCallback, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

import { ReduxSelectorType } from '@redux/reduxReducers'
import { initTheme } from '@redux/reducers/darkModeReducer'

const PageToastContainer: React.FC = () => {
    const darkModeEnabled = useSelector((state: ReduxSelectorType) => state.darkMode.darkMode)
    const reduxDispatch = useDispatch()

    const CheckForDarkMode = useCallback(() => {
        reduxDispatch(initTheme())
    }, [])

    useEffect(() => {
        CheckForDarkMode()
    }, [CheckForDarkMode])

    return (
        <ToastContainer
            toastStyle={{
                color: darkModeEnabled ? '#e2e8f0' : '#1f2937',
                background: darkModeEnabled ? '#1f2937' : '#e2e8f0',
            }}
            theme={darkModeEnabled ? 'dark' : 'light'}
        />
    )
}

export default PageToastContainer
