import React, { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import classNames from 'classnames'

type ClassType = {
    className?: string
}

export const ButtonSubmit: React.FC<InputHTMLAttributes<HTMLInputElement> & ClassType> = ({ children, className, ...rest }) => {
    return (
        <input className={classNames('relative', 'w-full', 'p-2', 'transition-colors', 'cursor-pointer', 'rounded-md', 'bg-blue-500', 'hover:bg-blue-600', 'text-slate-100', 'font-semibold', 'text-sm', 'xs:text-sm', className)} type="submit" {...rest}>
            {children}
        </input>
    )
}

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & ClassType> = ({ children, className, ...rest }) => {
    return (
        <button className={classNames('relative', 'w-full', 'p-2', 'transition-colors', 'cursor-pointer', 'rounded-md', 'bg-blue-500', 'hover:bg-blue-600', 'text-slate-100', 'font-semibold', 'text-sm', 'xs:text-sm', className)} type="submit" {...rest}>
            {children}
        </button>
    )
}

export default Button
