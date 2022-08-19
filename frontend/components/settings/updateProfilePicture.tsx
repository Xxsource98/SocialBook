import React, { useRef, useState } from 'react'
import classNames from 'classnames'

import { UserType } from '@functions/api/user/GetUserInfo'
import { UpdateProfilePicture } from '@functions/api/user/UpdateUser'

import UserSettingsForm from '@components/settings/userSettingsForm'
import Input from '@components/elements/input'
import ProfilePictureComponent from '@components/elements/profilePicture'

type UpdateProfilePictureSettingsType = {
    userData: UserType | null
}

const UpdateProfilePictureSettings: React.FC<UpdateProfilePictureSettingsType> = ({ userData }) => {
    const profilePictureInputRef = useRef<HTMLInputElement>(null)
    const [, setProfilePicture] = useState<string>('')

    const ProfilePictureSubmit = async () => {
        if (profilePictureInputRef && profilePictureInputRef.current) {
            const file = profilePictureInputRef.current.files?.item(0)

            if (file) {
                await UpdateProfilePicture(file)
            }
        }
    }

    const UpdatePreviewPicture = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target) {
            const fileItem = ev.currentTarget.files?.item(0)
            const fileBlob = await fileItem?.arrayBuffer().then(arrayBuffer => {
                const uint8Array = new Uint8Array(arrayBuffer)

                return new Blob([uint8Array], { type: fileItem.type })
            })

            const fileUrl = URL.createObjectURL(fileBlob as Blob)

            setProfilePicture(fileUrl)
        }
    }

    return (
        <UserSettingsForm header="Profile Picture" onSubmit={ProfilePictureSubmit}>
            <div className={classNames('relative', 'w-full', 'flex', 'justify-center')}>
                <div className={classNames('relative', 'w-24', 'h-24')}>
                    <ProfilePictureComponent src={userData?.profilePicture} />
                </div>
            </div>
            <Input ref={profilePictureInputRef} className={classNames('lg:w-[300px]')} type="file" accept="image/*" onChange={UpdatePreviewPicture} required />
        </UserSettingsForm>
    )
}

export default UpdateProfilePictureSettings
