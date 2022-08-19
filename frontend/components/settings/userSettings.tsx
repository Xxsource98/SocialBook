import React, { useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import UpdateUserInfo from '@functions/api/user/UpdateUser'
import useUser from '@functions/hooks/useUser'
import RefreshAT from '@functions/api/user/RefreshAT'

import Input, { Textarea } from '@components/elements/input'
import PageWrapper from '@components/elements/pageWrapper'
import UpdateProfilePictureSettings from '@components/settings/updateProfilePicture'
import UserSettingsForm from '@components/settings//userSettingsForm'
import Section from '@components/dashboard/dashboardSection'

const UserSettings: React.FC = () => {
    const router = useRouter()
    const [userData] = useUser()

    const [username, setUsername] = useState<string | undefined>(undefined)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState<string | undefined>(undefined)
    const [currentPassword, setCurrentPassword] = useState<string | undefined>(undefined)

    const [currentPasswordBio, setCurrentPasswordBio] = useState<string | undefined>(undefined)
    const [bio, setBio] = useState<string | undefined>(undefined)

    const UpdateInfo = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (userData) {
            const updated = await UpdateUserInfo({
                username: username,
                email: email,
                newPassword: password,
                currentPassword: currentPassword,
            })

            if (updated) {
                await RefreshAT(userData.id, username || userData?.username).then(() => {
                    router.reload()
                })
            }
        }
    }

    const UpdateBio = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (userData) {
            const updated = await UpdateUserInfo({
                currentPassword: currentPasswordBio,
                bio: bio,
            })

            if (updated) {
                await RefreshAT(userData.id, username ?? userData?.username).then(() => {
                    router.reload()
                })
            }
        }
    }

    return (
        <PageWrapper header="Settings">
            <Section className={classNames('relative', 'flex', 'flex-col', 'gap-3')} noShadow>
                <UpdateProfilePictureSettings userData={userData} />

                <UserSettingsForm header="User data" onSubmit={UpdateInfo}>
                    <Input className={classNames('lg:w-[300px]')} type="text" placeholder="Username" onChange={ev => setUsername(ev.target.value)} />
                    <Input className={classNames('lg:w-[300px]')} type="email" placeholder="Email" onChange={ev => setEmail(ev.target.value)} />
                    <Input className={classNames('lg:w-[300px]')} type="password" placeholder="New Password" onChange={ev => setPassword(ev.target.value)} />
                    <Input className={classNames('lg:w-[300px]')} type="password" placeholder="Current Password" onChange={ev => setCurrentPassword(ev.target.value)} required />
                </UserSettingsForm>

                <UserSettingsForm header="Bio" onSubmit={UpdateBio}>
                    <Textarea className={classNames('lg:w-[300px]')} placeholder="Write here about you" minHeight={64} onChange={ev => setBio(ev.target.value)} required />
                    <Input className={classNames('lg:w-[300px]')} type="password" placeholder="Current Password" onChange={ev => setCurrentPasswordBio(ev.target.value)} required />
                </UserSettingsForm>
            </Section>
        </PageWrapper>
    )
}

export default UserSettings
