import React from 'react'
import classNames from 'classnames'
import { Grid, Settings, Users, X as Close } from 'react-feather'

import NavbarElement from '@components/elements/navElement'

const MobileNavbar: React.FC = () => {
    return (
        <nav id="mobile-navbar" className={classNames('lg:hidden', 'transition-all', 'w-full', 'box-border', 'absolute', 'left-0', 'top-[-16rem]', 'w-screen', 'h-48', 'flex', 'justify-center', 'gap-2', 'bg-slate-500', 'bg-opacity-80', 'backdrop-blur-md', 'shadow-md', 'xs:h-64', 'xs:gap-10', 'dark:bg-gray-700')}>
            <Close className={classNames('absolute', 'right-4', 'top-4', 'cursor-pointer', 'z-20')} color="#fff" size={36} onClick={ToggleMobileNavbar} />
            <NavbarElement title="Timeline" icon={<Grid width="100%" height="100%" />} url="/" onClick={ToggleMobileNavbar} />
            <NavbarElement title="Friends" icon={<Users width="100%" height="100%" />} url="/friends" onClick={ToggleMobileNavbar} />
            <NavbarElement title="Settings" icon={<Settings width="100%" height="100%" />} url="/settings" onClick={ToggleMobileNavbar} />
        </nav>
    )
}

export const ToggleMobileNavbar = () => {
    const selector = document.querySelector('#mobile-navbar')

    if (selector) {
        const classList = selector.classList

        if (classList.contains('top-[-16rem]')) {
            classList.remove('top-[-16rem]')
            classList.add('top-0')
        } else {
            classList.remove('top-0')
            classList.add('top-[-16rem]')
        }
    }
}

export default MobileNavbar
