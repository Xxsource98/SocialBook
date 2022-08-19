import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

type ClassType = {
    className?: string
}

type TextareaType = {
    minHeight?: number
    maxHeight?: number
} & InputHTMLAttributes<HTMLTextAreaElement> &
    ClassType

const Input = React.forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement & ClassType>>((props, ref) => {
    const { children, className, ...rest } = props

    return (
        <input ref={ref} className={classNames('relative', 'p-2', 'transition-colors', 'w-full', 'border-[1px]', 'border-gray-400', 'rounded-md', 'text-sm', 'text-gray-800', 'placeholder:text-gray-400', 'focus:border-gray-800', 'xs:text-base', 'outline-none', 'dark:text-slate-200', 'dark:border-gray-600', 'dark:bg-gray-700', className)} {...rest}>
            {children}
        </input>
    )
})
Input.displayName = 'Input'

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaType>((props, ref) => {
    const { minHeight, maxHeight, className, children, ...rest } = props

    return (
        <textarea ref={ref} className={classNames('relative', 'p-2', 'transition-colors', 'w-full', 'border-[1px]', 'border-gray-400', 'rounded-md', 'text-sm', 'text-gray-800', 'placeholder:text-gray-400', 'focus:border-gray-800', 'xs:text-base', 'outline-none', 'dark:text-slate-200', 'dark:border-gray-600', 'dark:bg-gray-700', className)} style={{ minHeight: minHeight, maxHeight: maxHeight, ...rest.style }} {...rest}>
            {children}
        </textarea>
    )
})
Textarea.displayName = 'Textarea'

export default Input
