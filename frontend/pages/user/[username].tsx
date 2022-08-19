import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Cookies from 'cookies'

import IsAuthed from '@functions/AuthUser'
import GetUserInfo from '@functions/api/user/GetUserInfo'

import UserProfile from '@components/userProfile/userProfile'
import ErrorPage from '@components/elements/errorPage'

type UserPageType = {
    loggedIn: boolean
    invalidUser: boolean
}

const UserPage: React.FC<UserPageType> = ({ loggedIn, invalidUser }) => {
    const router = useRouter()
    const { username } = router.query

    if (invalidUser) {
        return (
            <React.Fragment>
                <Head>
                    <title>SocialBook - Invalid User</title>
                </Head>
                <ErrorPage description="Invalid User" />
            </React.Fragment>
        )
    }

    if (loggedIn) {
        return (
            <React.Fragment>
                <Head>
                    <title>SocialBook - {username}</title>
                </Head>
                <UserProfile username={username as string} />
            </React.Fragment>
        )
    }

    return <React.Fragment />
}

export const getServerSideProps: GetServerSideProps = async context => {
    const cookies = new Cookies(context.req, context.res)
    const accessToken = cookies.get('socialbook_accessToken')
    const { username } = context.query

    const isAuthed = await IsAuthed(context)

    if (!isAuthed.serverWorking) {
        return {
            redirect: {
                destination: '/server-error',
                permanent: false,
            },
        }
    }

    if (isAuthed.loggedIn && accessToken) {
        const doesUserExist = await GetUserInfo(accessToken, username as string, true)

        if (doesUserExist?.id !== undefined) {
            return {
                props: {
                    loggedIn: true,
                    invalidUser: false,
                },
            }
        } else {
            return {
                props: {
                    loggedIn: true,
                    invalidUser: true,
                },
            }
        }
    }

    return {
        redirect: {
            destination: '/login',
            permanent: false,
        },
    }
}

export default UserPage
