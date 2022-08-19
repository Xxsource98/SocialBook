import React, { useState, useRef } from 'react'
import { setCookie } from 'cookies-next'
import Router from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'

import LoginUser from '@functions/api/user/LoginUser'

import Input from '@components/elements/input'
import { ButtonSubmit } from '@components/elements/button'
import LoginRegisterWrapper from '@components/elements/loginRegisterWrapper'

const Login: React.FC = () => {
    const ErrorMessageRef = useRef<HTMLParagraphElement>(null)
    const [errorStatus, setErrorStatus] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [remember, setRemember] = useState<boolean>(false)

    const ToggleError = () => {
        const classList = ErrorMessageRef.current?.classList

        classList?.contains('hidden') ? classList?.remove('hidden') : null
    }

    const LoginAction = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (username && password) {
            await LoginUser(username, password)
                .then(data => {
                    if (data.status === 'Success') {
                        const tokens = data.tokens

                        setCookie('socialbook_accessToken', tokens.accessToken)
                        if (remember) {
                            setCookie('socialbook_refreshToken', tokens.refreshToken)
                        }

                        Router.push('/')
                    } else {
                        setErrorStatus(data.description)
                    }
                })
                .catch(ex => {
                    ToggleError()
                    setErrorStatus(ex.response?.data.description || ex.message)
                })
        } else {
            ToggleError()
            setErrorStatus('Fields are empty')
        }
    }

    return (
        <LoginRegisterWrapper>
            <div className={classNames('relative', 'w-screen', 'h-screen', 'bg-slate-200', 'flex', 'justify-center', 'items-center', 'text-gray-800', 'dark:bg-gray-800', 'dark:text-slate-200')}>
                <form className={classNames('relative', 'w-[90%]', 'gap-3', 'flex', 'flex-col', 'items-center', 'bg-slate-50', 'rounded-lg', 'shadow-lg', 'p-4', 'sm:w-[420px]', 'dark:bg-gray-700')} onSubmit={LoginAction}>
                    <h1 className="text-center font-semibold text-3xl mb-10">Login</h1>
                    <Input type="text" placeholder="Username" style={{ width: '90%' }} onChange={value => setUsername(value.currentTarget.value)} required />
                    <Input type="password" placeholder="Password" style={{ width: '90%' }} onChange={value => setPassword(value.currentTarget.value)} required />
                    <div className="relative" style={{ width: '90%' }}>
                        <input className="scale-125 ml-2" type="checkbox" name="remember" id="remember" onChange={value => setRemember(value.currentTarget.checked)} />
                        <label className="ml-2" htmlFor="remember">
                            Remember Me
                        </label>
                    </div>
                    <p ref={ErrorMessageRef} className="hidden text-red-600 font-medium">
                        Error: {errorStatus}
                    </p>
                    <ButtonSubmit value="Login" style={{ marginTop: 0, width: '50%' }} />
                    <Link href="/register">
                        <a className="mt-4 text-gray-600 dark:text-gray-300">Register here</a>
                    </Link>
                </form>
            </div>
        </LoginRegisterWrapper>
    )
}

export default Login
