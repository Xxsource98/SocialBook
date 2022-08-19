import classNames from 'classnames'
import React from 'react'

import { ButtonSubmit } from '@components/elements/button'

type UserSettingsFormType = {
    header: string
    onSubmit?: (ev: React.FormEvent<HTMLFormElement>) => void
    children: React.ReactNode
}

const UserSettingsForm: React.FC<UserSettingsFormType> = ({ header, onSubmit, children }) => {
    const SubmitFunc = onSubmit ? onSubmit : (ev: React.FormEvent<HTMLFormElement>) => ev.preventDefault()

    return (
        <form className={classNames('relative', 'w-full', 'flex', 'flex-col', 'gap-3', 'lg:items-center', 'lg:mb-10')} onSubmit={SubmitFunc}>
            <h2 className={classNames('text-lg', 'font-medium')}>{header}</h2>
            {children}
            <ButtonSubmit value="Update" className={classNames('lg:w-24')} />
        </form>
    )
}

export default UserSettingsForm
