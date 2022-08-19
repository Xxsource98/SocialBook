import React from 'react'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'

import IsServerWorking from '@functions/api/checkServer'

const ServerError: React.FC = () => {
    return (
        <div className={classNames('relative', 'flex', 'justify-center', 'items-center', 'w-screen', 'h-screen')}>
            <h2>Failed to connect to server :(</h2>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let isServerWorking = false

    await IsServerWorking().then(isWorking => {
        isServerWorking = isWorking
    })

    if (isServerWorking) {
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

export default ServerError
