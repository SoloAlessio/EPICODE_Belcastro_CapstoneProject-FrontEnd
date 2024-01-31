'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { EyeFilledIcon } from '../../ui/EyeFilledIcon'
import { EyeSlashFilledIcon } from '../../ui/EyeSlashFilledIcon'
import { FaAngleLeft } from 'react-icons/fa6'
import Link from 'next/link'

function page() {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = React.useState(false)

    const User = {
        name: name,
        surname: surname,
        email: email,
        password: password,
    }

    const toggleVisibility = () => setIsVisible(!isVisible)

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)

        const error = document.querySelector('#error')
        error.innerHTML = ''

        const res = await fetch(
            `https://epicode-belcastro-capstone-project.onrender.com/users/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(User),
            }
        )
        if (res.ok) {
            router.push('/account/login')
            setLoading(false)
        } else {
            setLoading(false)
            if (error.classList.contains('hidden')) {
                error.classList.toggle('hidden')
            }
            error.innerHTML = 'Something went wrong!'
        }
    }

    return (
        <div className='container mx-auto'>
            <div className='flex h-screen flex-col items-center justify-center'>
                <div className='w-full max-w-sm'>
                    {/* LOGIN FORM */}
                    <Link
                        className='mb-4 flex items-center gap-4 px-6 text-sm text-default-500'
                        href='/'
                    >
                        <FaAngleLeft />
                        <h5>Back to Home</h5>
                    </Link>
                    <form
                        onSubmit={(e) => handleRegister(e)}
                        className='mx-4 mb-4 rounded-2xl bg-default-300 p-6 shadow-xl dark:bg-default-50'
                    >
                        {/* SOCCERSTATS */}
                        <h1 className='mb-6 text-center text-2xl font-light'>
                            Soccer<span className='font-bold'>Stats</span>
                        </h1>

                        {/* EMAIL & PASSWORD INPUT */}
                        <div className='mb-8 flex w-full flex-col gap-6'>
                            {/* EMAIL */}
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2 sm:flex-row'>
                                    <Input
                                        label='name'
                                        value={name}
                                        onValueChange={setName}
                                    />
                                    <Input
                                        label='surname'
                                        value={surname}
                                        onValueChange={setSurname}
                                    />
                                </div>
                                <Input
                                    label='Email'
                                    value={email}
                                    onValueChange={setEmail}
                                />
                            </div>
                            {/* PASSWORD */}
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
                                color='primary'
                                isLoading={loading}
                            >
                                SIGNUP
                            </Button>
                        </div>
                        <a
                            className='mt-4 inline-block w-full text-center align-baseline text-tiny font-medium text-slate-300 transition-all hover:text-white'
                            href='/account/login'
                        >
                            already have an account? login
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

export default page
