import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import IsAuthed from '@functions/AuthUser'
import FriendListPage from '@components/friends/friendsListPage'

type FriendsPageType = {
    loggedIn: boolean
}

const FriendsPage: React.FC<FriendsPageType> = ({ loggedIn }) => {
    if (loggedIn) {
        return (
            <React.Fragment>
                <Head>
                    <title>SocialBook - Friends</title>
                </Head>
                <FriendListPage />
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

export default FriendsPage
