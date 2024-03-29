'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input, Button } from '@nextui-org/react'
import { EyeFilledIcon } from '../../ui/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../../ui/EyeSlashFilledIcon'
import { FaGoogle } from 'react-icons/fa6'
import { FaAngleLeft } from 'react-icons/fa6'

export default function Page() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('belcastro@gmail.com')
    const [password, setPassword] = useState('Fustacchione410')
    const [isVisible, setIsVisible] = useState(false)

    // user object
    const User = {
        email: email,
        password: password,
    }

    const toggleVisibility = () => setIsVisible(!isVisible) // passowrd visibility

    // login function
    const handleLogin = async (e) => {
        e.preventDefault() // prevent default behaviour
        setLoading(true) // set loading to true

        const error = document.querySelector('#error') // error message
        error.innerHTML = ''

        // fetch request
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_ENDPOINT}/users/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(User),
            }
        )
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            localStorage.setItem('token', data.token) // set userId in local storage
            router.push('/dashboard') // redirect to dashboard
            setLoading(false) // set loading to false
        } else {
            setLoading(false) // set loading to false
            if (error.classList.contains('hidden')) {
                // if error message is hidden, show it
                error.classList.toggle('hidden')
            }
            error.innerHTML = 'Invalid credentials' // error message
        }
    }

    return (
        <div className='container mx-auto'>
            <div className='flex h-screen flex-col items-center justify-center'>
                <div className='z-10 w-full max-w-sm'>
                    {/* LOGIN FORM */}
                    <Link
                        className='mb-4 flex items-center gap-4 px-6 text-sm text-default-500'
                        href='/'
                    >
                        <FaAngleLeft />
                        <h5>Back to Home</h5>
                    </Link>

                    <form
                        onSubmit={(e) => handleLogin(e)}
                        className='mx-4 mb-4 rounded-2xl border border-default-200 bg-white p-6 shadow-xl dark:bg-default-50'
                    >
                        {/* SOCCERSTATS */}
                        <h1 className='mb-6 text-center text-2xl font-semibold'>
                            Soccer<span className='font-bold'>Stats</span>
                        </h1>

                        {/* EMAIL & PASSWORD INPUT */}
                        <div className='mb-8 flex w-full flex-col gap-4'>
                            <Input
                                label='Email'
                                value={email}
                                onValueChange={setEmail}
                            />
                            <div className='flex flex-col gap-2'>
                                <Input
                                    label='Password'
                                    endContent={
                                        <button
                                            className='focus:outline-none'
                                            type='button'
                                            onClick={toggleVisibility}
                                        >
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className='pointer-events-none text-2xl text-default-400' />
                                            ) : (
                                                <EyeFilledIcon className='pointer-events-none text-2xl text-default-400' />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? 'text' : 'password'}
                                    value={password}
                                    onValueChange={setPassword}
                                />
                                <a
                                    className='inline-block align-baseline text-tiny font-medium transition-all dark:hover:text-white'
                                    href='#'
                                >
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        {/* LOGIN BUTTON */}
                        <p
                            className='mb-2 hidden text-center text-xs italic text-red-500'
                            id='error'
                        ></p>
                        <div className='flex flex-col items-center justify-between gap-4'>
                            <Button
                                className='focus:shadow-outline text-md w-full rounded-lg py-2 font-bold focus:outline-none'
                                type='submit'
                                isLoading={loading}
                                color='primary'
                            >
                                LOGIN
                            </Button>
                            <Button
                                onClick={() => {
                                    window.location.assign(
                                        `${process.env.NEXT_PUBLIC_ENDPOINT}/users/login/oauth-google`
                                    )
                                }}
                                className='focus:shadow-outline font-regular w-full rounded-lg border border-default-200 bg-white py-2 text-sm text-slate-700 focus:outline-none'
                            >
                                <FaGoogle />
                                <span className='ml-1'>login with Google</span>
                            </Button>
                        </div>
                        <a
                            className='mt-4 inline-block w-full text-center align-baseline text-tiny font-medium transition-all dark:hover:text-white'
                            href='/account/register'
                        >
                            Don&rsquo;t have an account? Sign up
                        </a>
                    </form>

                    <p className='text-center text-xs text-gray-500'>
                        &copy;2023 Belcastro Alessio. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
