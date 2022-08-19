import React from 'react'
import * as NextLink from 'next/link'

type LinkType = {
    href: string
    blank?: boolean
    children: React.ReactNode
}

const Link: React.FC<LinkType> = ({ href, blank, children }) => {
    return (
        <NextLink.default href={href}>
            <a target={blank ? '_blank' : '_self'}>{children}</a>
        </NextLink.default>
    )
}

export default Link
