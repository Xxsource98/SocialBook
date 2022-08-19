import React, { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { AlignRight, Layers, LogOut, Moon, Sun, Grid, Settings, Users } from 'react-feather'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { UserType } from '@functions/api/user/GetUserInfo'
import { InitLocalUser } from '@functions/hooks/useUser'
import { FriendComponentActionsType, FriendType, InitLocalFriends } from '@functions/Friends'

import Section from '@components/dashboard/dashboardSection'
import { ToggleMobileNavbar } from '@components/navbar/mobileNavbar'
import UserSection from '@components/elements/userSection'
import Link from '@components/elements/link'
import NavbarElement from '@components/elements/navElement'
import FriendsListComponent from '@components/elements/friendsListComponent'

import { initTheme, toggleTheme } from '@redux/reducers/darkModeReducer'
import { ReduxSelectorType } from '@redux/reduxReducers'
import { clearData, updateLocalFriends, updateLocalUser } from '@redux/reducers/userDataReducer'

type PageWrapperType = {
    header?: string
    children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperType> = ({ children, header }) => {
    const router = useRouter()

    const reduxStateData = useSelector((state: ReduxSelectorType) => state)
    const reduxDispatch = useDispatch()

    const reduxUserData = reduxStateData.userData.data
    const darkThemeEnabled = reduxStateData.darkMode.darkMode

    const checkDarkMode = useCallback(() => {
        reduxDispatch(initTheme())
    }, [])

    const initReduxState = useCallback(async () => {
        if (reduxUserData?.user === null) {
            await InitLocalUser().then(userData => {
                if (userData !== null) {
                    reduxDispatch(updateLocalUser(userData))
                }
            })
        }

        if (reduxUserData?.friends === null) {
            await InitLocalFriends().then(friends => {
                if (friends !== null) {
                    reduxDispatch(updateLocalFriends(friends))
                }
            })
        }
    }, [])

    useEffect(() => {
        checkDarkMode()
        initReduxState()
    }, [initReduxState, checkDarkMode])

    const ToggleDarkMode = () => reduxDispatch(toggleTheme())

    const NavPanel = () => {
        return (
            <Section className={classNames('relative', 'flex', 'p-2', 'gap-x-3', 'justify-center', 'items-center')}>
                <NavbarElement title="Timeline" icon={<Grid className={classNames('text-[#18181b]', 'dark:text-slate-300')} width="100%" height="100%" />} url="/" dark />
                <NavbarElement title="Friends" icon={<Users className={classNames('text-[#18181b]', 'dark:text-slate-300')} width="100%" height="100%" />} url="/friends" dark />
                <NavbarElement title="Settings" icon={<Settings className={classNames('text-[#18181b]', 'dark:text-slate-300')} width="100%" height="100%" />} url="/settings" dark />
            </Section>
        )
    }

    const DrawHeader = () => {
        if (header) {
            <h2 className={classNames('w-full', 'text-lg', 'font-semibold', 'p-2', 'xs:text-xl')}>{header}</h2>
        }

        return <React.Fragment />
    }

    const DrawDarkToggle = () => {
        if (darkThemeEnabled) {
            return <Sun className={classNames('text-black', 'cursor-pointer', 'dark:text-slate-300')} onClick={ToggleDarkMode} />
        }

        return <Moon className={classNames('text-black', 'cursor-pointer', 'dark:text-slate-300')} onClick={ToggleDarkMode} />
    }

    const LogoutFunc = () => {
        reduxDispatch(clearData())

        router.replace('/logout')
    }

    return (
        <div id="socialbook" className={classNames('relative', 'p-5', 'min-h-screen', 'lg:h-screen', 'dark:text-slate-300', 'dark:bg-gray-800')}>
            <div id="wrapper" className={classNames('relative', 'w-full', 'flex', 'flex-col', 'gap-3', 'lg:grid', 'lg:grid-cols-3', 'xl:grid-cols-4', 'lg:grid-rows-1', 'lg:h-full')}>
                <div className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'lg:h-full')}>
                    <Section>
                        <div className={classNames('flex', 'justify-between')}>
                            <div>
                                <Link href="/">
                                    <div className={classNames('flex', 'items-center', 'gap-3', 'cursor-pointer')}>
                                        <Layers color="#3b82f6" size={36} />
                                        <h1 className="font-semibold xs:text-lg">SocialBook</h1>
                                    </div>
                                </Link>
                            </div>
                            <div className={classNames('lg:hidden')}>
                                <AlignRight color="#3b82f6" size={36} style={{ cursor: 'pointer' }} onClick={ToggleMobileNavbar} />
                            </div>
                        </div>
                    </Section>
                    <UserSection userData={reduxUserData?.user as UserType} loading={reduxUserData?.user === null}>
                        <LogOut className={classNames('text-black', 'dark:text-slate-300')} size={24} style={{ cursor: 'pointer' }} onClick={LogoutFunc} />
                    </UserSection>
                    <div className={classNames('hidden', 'lg:block')}>
                        <NavPanel />
                    </div>
                    <Section className={classNames('hidden', 'h-full', 'lg:flex', 'l g:flex-col', 'lg:gap-3', 'lg:overflow-y-auto', 'lg:block')}>
                        <FriendsListComponent friendsLoading={reduxUserData?.friends === null} friends={reduxUserData?.friends?.friends as FriendType[]} sentFriends={reduxUserData?.friends?.requests.sent as FriendType[]} receivedFriends={reduxUserData?.friends?.requests.received as FriendType[]} actions={reduxUserData?.friends?.actions as FriendComponentActionsType} />
                    </Section>
                    <Section className={classNames('relative', 'w-full', 'flex', 'justify-between')}>
                        <Link href="https://github.com/Xxsource98" blank>
                            <h4 className={classNames('relative', 'font-medium')}>Created by Xxsource98</h4>
                        </Link>
                        <DrawDarkToggle />
                    </Section>
                </div>
                <div className={classNames('relative', 'flex', 'flex-col', 'gap-3', 'border-t-2', 'pt-3', 'border-slate-300', 'border-opacity-30', 'lg:col-span-2', 'xl:col-span-3', 'lg:pt-0', 'lg:border-none', 'lg:h-full')}>
                    <Section className={classNames('lg:h-full', 'lg:flex', 'lg:flex-col', 'lg:items-center', 'lg:gap-3', 'lg:overflow-y-auto')} dashboardBackground>
                        <DrawHeader />
                        {children}
                    </Section>
                </div>
            </div>
        </div>
    )
}

export default PageWrapper
