import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import Store from '@redux/reduxStore'

import MobileNavbar from '@components/navbar/mobileNavbar'
import PageToastContainer from '@components/elements/toastContainer'
import SkeletonContainer from '@components/elements/skeletonContainer'

import '../styles/global.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.min.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
            <Provider store={Store}>
                <SkeletonContainer>
                    <Component {...pageProps} />
                </SkeletonContainer>
                <MobileNavbar />
                <PageToastContainer />
            </Provider>
        </React.Fragment>
    )
}

export default MyApp
