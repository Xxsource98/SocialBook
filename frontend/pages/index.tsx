import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import Dashboard from '@components/dashboard/dashboard'
import IsAuthed from '@functions/AuthUser'

type IndexPageType = {
    loggedIn: boolean
}

const IndexPage: React.FC<IndexPageType> = ({ loggedIn }) => {
    if (loggedIn) {
        return (
            <React.Fragment>
                <Head>
                    <title>SocialBook</title>
                </Head>
                <Dashboard />
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

export default IndexPage
