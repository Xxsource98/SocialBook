import React from 'react'
import classNames from 'classnames'
import Skeleton from 'react-loading-skeleton'

import { UserType } from '@functions/api/user/GetUserInfo'

import Section from '@components/dashboard/dashboardSection'
import Link from '@components/elements/link'
import ProfilePictureComponent from '@components/elements/profilePicture'

type UserSectionType = {
    userData: UserType | null
    loading: boolean
    bioText?: boolean
    children?: React.ReactNode
    className?: string
    inDashboard?: boolean
}

const UserSection: React.FC<UserSectionType> = ({ userData, loading, children, bioText, className, inDashboard }) => {
    const DrawUserImage = () => {
        if (loading) {
            return <Skeleton width="100%" height="100%" circle />
        }

        return (
            <Link href={`/user/${userData?.username}`}>
                <ProfilePictureComponent src={userData?.profilePicture ?? 'default.png'} />
            </Link>
        )
    }

    const DrawUserDetails = () => {
        if (loading) {
            return (
                <div className={classNames('relative', 'w-fit')}>
                    <Skeleton count={2} width={125} />
                </div>
            )
        }

        return (
            <div className={classNames('leading-none')}>
                <Link href={`/user/${userData?.username}`}>
                    <h3 className={classNames('font-medium', 'cursor-pointer', 'xs:text-lg')}>
                        {userData?.firstName ?? 'invalid'} {userData?.lastName}
                    </h3>
                    <span className={classNames('text-xs', 'cursor-pointer', 'xs:text-sm')}>@{userData?.username ?? 'invalid'}</span>
                </Link>
            </div>
        )
    }

    const DrawBioText = () => {
        if (loading) {
            return (
                <div className={classNames('relative', 'w-full', 'mt-2', 'p-2')}>
                    <Skeleton width={'100%'} />
                </div>
            )
        }

        if (userData?.bio) {
            return (
                <div className={classNames('relative', 'mt-2', 'p-2', 'font-medium', 'text-center')}>
                    <p>{userData?.bio}</p>
                </div>
            )
        }

        return <React.Fragment />
    }

    return (
        <Section className={className} inDashboard={inDashboard}>
            <div className={classNames('relative', 'flex', 'justify-between', 'items-center')}>
                <div className={classNames('relative', 'flex', 'items-center', 'gap-3', 'w-full')}>
                    <div className={classNames('relative', 'w-14', 'h-14', 'xs:w-20', 'xs:h-20')}>
                        <DrawUserImage />
                    </div>
                    <DrawUserDetails />
                </div>
                <div>{children}</div>
            </div>
            <div className={classNames('relative')}>{bioText ? <DrawBioText /> : ''}</div>
        </Section>
    )
}

export default UserSection
