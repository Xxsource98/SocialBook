import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import IsAuthed from '@functions/AuthUser'

import UserSettings from '@components/settings/userSettings'

type SettingsPageType = {
    loggedIn: boolean
}

const SettingsPage: React.FC<SettingsPageType> = ({ loggedIn }) => {
    if (loggedIn) {
        return (
            <React.Fragment>
                <Head>
                    <title>SocialBook - Settings</title>
                </Head>
                <UserSettings />
            </React.Fragment>
        )
    }

    return <React.Fragment />
}

export const getServerSideProps: GetServerSideProps = async context => {
    const isAuthed = await IsAuthed(context)

    if (!isAuthed.serverWorking) {
        return {
            redirect: {
                destination: '/server-error',
                permanent: false,
            },
        }
    }

    if (isAuthed.loggedIn) {
        return {
            props: {
                loggedIn: true,
            },
        }
    }

    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    }
}

export default SettingsPage
