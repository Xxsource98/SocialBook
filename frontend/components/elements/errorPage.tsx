import classNames from 'classnames'
import React from 'react'

type ErrorPageType = {
    description: string
    e404?: boolean
}

const ErrorPage: React.FC<ErrorPageType> = ({ description, e404 }) => {
    return (
        <div className={classNames('relative', 'w-screen', 'h-screen', 'flex', 'justify-center', 'items-center')}>
            <div className={classNames('relative', 'flex', 'gap-3', 'p-4', 'items-center', 'h-fit')}>
                <h1 className={classNames('relative', 'text-base', 'xs:text-3xl', 'font-semibold', 'pr-3', 'border-r-2', 'border-indigo-500', 'border-opacity-25')}>Error{e404 ? ' 404' : ''}</h1>
                <p className={classNames('relative', 'text-sm', 'xs:text-xl')}>{description}</p>
            </div>
        </div>
    )
}

export default ErrorPage
