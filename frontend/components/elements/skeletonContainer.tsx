import React from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useSelector } from 'react-redux'

import { ReduxSelectorType } from '@redux/reduxReducers'

type SkeletonContainerType = {
    children: React.ReactNode
}

const SkeletonContainer: React.FC<SkeletonContainerType> = ({ children }) => {
    const darkMode = useSelector((state: ReduxSelectorType) => state.darkMode.darkMode)

    return (
        <SkeletonTheme baseColor={darkMode ? '#ebebeb' : '#d5d5d5'} highlightColor={darkMode ? '#f5f5f5' : '#dcdcdc'}>
            {children}
        </SkeletonTheme>
    )
}

export default SkeletonContainer
