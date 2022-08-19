import React from 'react'
import { GetServerSideProps } from 'next'

import DestroyCookies from '@functions/DestroyCookies'

const LogoutPage = () => {
    return <React.Fragment />
}

export const getServerSideProps: GetServerSideProps = async context => {
    DestroyCookies(context)

    return {
        redirect: {
            destination: '/',
            permanent: false,
        },
    }
}

export default LogoutPage
