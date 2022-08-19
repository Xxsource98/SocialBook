import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import DoesTokenExist from '@functions/api/user/DoesTokenExist'
import IsServerWorking from '@functions/api/checkServer'

import Login from '@components/login/login'

const LoginPage: React.FC = () => {
    return (
        <React.Fragment>
            <Head>
                <title>SocialBook - Login</title>
            </Head>
            <div className="w-screen h-screen flex justify-center items-center">
                <Login />
            </div>
        </React.Fragment>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let isServerWorking = false

    await IsServerWorking().then(isWorking => {
        isServerWorking = isWorking
    })

    if (!isServerWorking) {
        return {
            redirect: {
                destination: '/server-error',
                permanent: false,
            },
        }
    }

    if (DoesTokenExist()) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {},
    }
}

export default LoginPage
