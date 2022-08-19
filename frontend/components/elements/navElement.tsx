import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'

type NavbarElementType = {
    title: string
    icon: React.ReactNode
    url: string
    dark?: boolean
    onClick?: () => void
}

const NavbarElement: React.FC<NavbarElementType> = ({ title, icon, url, dark, onClick }) => {
    return (
        <Link href={url} passHref>
            <a className={classNames('relative', 'flex', 'flex-col', 'justify-center', 'items-center', dark ? 'text-zinc-900' : 'text-white', 'font-medium', 'p-4', 'gap-y-1', 'dark:text-slate-300')} onClick={onClick}>
                <div className={classNames('relative', 'w-6', 'h-6', 'xs:w-10', 'xs:h-10', 'lg:w-8', 'lg:h-8')}>{icon}</div>
                <h2>{title}</h2>
            </a>
        </Link>
    )
}

export default NavbarElement
