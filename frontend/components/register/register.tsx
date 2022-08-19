import React, { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import RegisterUser from '@functions/api/user/RegisterUser'

import Input from '@components/elements/input'
import { ButtonSubmit } from '@components/elements/button'
import LoginRegisterWrapper from '@components/elements/loginRegisterWrapper'

type StatusType = {
    type: 'success' | 'error'
    message: string
}

const Register: React.FC = () => {
    const router = useRouter()

    const [status, setStatus] = useState<StatusType>({
        type: 'error',
        message: '',
    })
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmpassword, setConfirmPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [fname, setFName] = useState<string>('')
    const [lname, setLName] = useState<string>('')

    const RegisterAction = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        if (username && password && confirmpassword && email && fname && lname) {
            if (password === confirmpassword) {
                await RegisterUser(username, password, email, fname, lname)
                    .then(data => {
                        if (data.status === 'Success') {
                            setStatus({
                                type: 'success',
                                message: 'Account created. Please Log In',
                            })
                        } else {
                            setStatus({
                                type: 'error',
                                message: data.description,
                            })
                        }

                        clearInterval(setInterval(() => router.replace('/login'), 1500))
                    })
                    .catch(ex => {
                        setStatus({
                            type: 'error',
                            message: ex.response?.data.description || ex.message,
                        })
                    })
            } else {
                setStatus({
                    type: 'error',
                    message: 'Passwords are not the same',
                })
            }
        } else {
            setStatus({
                type: 'error',
                message: 'Fields are empty',
            })
        }
    }

    const DrawStatusText = () => {
        if (status.message.length > 0) {
            if (status.type === 'error') {
                return <p className={classNames('relative', 'text-red-500', 'font-medium')}>Error: {status.message}</p>
            }

            if (status.type === 'success') {
                return <p className={classNames('relative', 'text-green-500', 'font-medium')}>{status.message}</p>
            }
        }

        return <React.Fragment />
    }

    return (
        <LoginRegisterWrapper>
            <div className={classNames('relative', 'w-screen', 'h-screen', 'bg-slate-200', 'flex', 'justify-center', 'items-center', 'text-gray-800', 'dark:bg-gray-800', 'dark:text-slate-200')}>
                <form className={classNames('relative', 'w-[90%]', 'gap-3', 'flex', 'flex-col', 'items-center', 'bg-slate-50', 'rounded-lg', 'shadow-lg', 'p-4', 'sm:w-[420px]', 'dark:bg-gray-700')} onSubmit={RegisterAction}>
                    <h1 className={classNames('text-center', 'font-semibold', 'text-3xl', 'mb-10')}>Register</h1>
                    <Input type="text" placeholder="Username" style={{ width: '90%' }} onChange={value => setUsername(value.currentTarget.value)} required />
                    <Input type="password" placeholder="Password" style={{ width: '90%' }} onChange={value => setPassword(value.currentTarget.value)} required />
                    <Input type="password" placeholder="Confirm Password" style={{ width: '90%' }} onChange={value => setConfirmPassword(value.currentTarget.value)} required />
                    <Input type="email" placeholder="Email" style={{ width: '90%' }} onChange={value => setEmail(value.currentTarget.value)} required />
                    <Input type="text" placeholder="First Name" style={{ width: '90%' }} onChange={value => setFName(value.currentTarget.value)} required />
                    <Input type="text" placeholder="Last Name" style={{ width: '90%' }} onChange={value => setLName(value.currentTarget.value)} required />
                    <DrawStatusText />
                    <p className={`hidden ${status.type === 'error' ? 'text-red-600' : 'text-green-500'} font-medium`}>Error: {status.message}</p>
                    <ButtonSubmit value="Register" style={{ marginTop: 10, width: '50%' }} />
                    <Link href="/login">
                        <a className="mt-4 text-gray-600 dark:text-gray-300">Login here</a>
                    </Link>
                </form>
            </div>
        </LoginRegisterWrapper>
    )
}

export default Register
