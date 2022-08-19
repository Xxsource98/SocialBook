import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

type ProfilePictureType = {
    src: string | undefined
    layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | 'raw'
    width?: number
    height?: number
}

const ProfilePictureComponent: React.FC<ProfilePictureType> = ({ src, layout, width, height }) => {
    if (src) {
        return <Image className={classNames('relative', 'rounded-full', 'cursor-pointer', 'w-full', 'h-full')} src={`${process.env.SERVER_CONTAINER_URL}:${process.env.SERVER_CONTAINER_PORT}/public/${src}`} layout={layout ?? 'fill'} width={width} height={height} alt="Profile Picture" />
    }

    return <Skeleton className={classNames('relative', 'w-full', 'h-full')} circle />
}

export default ProfilePictureComponent
