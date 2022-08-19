import React from 'react'

import ErrorPage from '@components/elements/errorPage'

const E404Page: React.FC = () => {
    return <ErrorPage description="Page Not Found" e404 />
}

export default E404Page
