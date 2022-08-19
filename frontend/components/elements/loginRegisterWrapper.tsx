import classNames from 'classnames'
import React, { useCallback, useEffect } from 'react'
import { Moon, Sun } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { initTheme, toggleTheme } from '@redux/reducers/darkModeReducer'
import { ReduxSelectorType } from '@redux/reduxReducers'

type LoginRegisterWrapperType = {
    children: React.ReactNode
}

const LoginRegisterWrapper: React.FC<LoginRegisterWrapperType> = ({ children }) => {
    const darkMode = useSelector((state: ReduxSelectorType) => state.darkMode.darkMode)
    const reduxDispatch = useDispatch()

    const checkDarkMode = useCallback(() => {
        reduxDispatch(initTheme())
    }, [])

    useEffect(() => {
        checkDarkMode()
    }, [checkDarkMode])

    const ToggleDarkMode = () => reduxDispatch(toggleTheme())

    const DrawDarkToggle = () => {
        if (darkMode) {
            return <Sun className={classNames('text-black', 'cursor-pointer', 'dark:text-slate-300')} onClick={ToggleDarkMode} />
        }

        return <Moon className={classNames('text-black', 'cursor-pointer', 'dark:text-slate-300')} onClick={ToggleDarkMode} />
    }

    return (
        <React.Fragment>
            {children}
            <div className={classNames('absolute', 'left-4', 'bottom-4', 'w-8', 'h-8', 'z-10', 'flex', 'justify-center', 'items-center')}>
                <DrawDarkToggle />
            </div>
        </React.Fragment>
    )
}

export default LoginRegisterWrapper
