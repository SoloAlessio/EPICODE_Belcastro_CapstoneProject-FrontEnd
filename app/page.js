'use client'

import { useRouter } from 'next/navigation'
import { Button, Image } from '@nextui-org/react'
import ThemeSwitcher from './ui/components/ThemeSwitcher'

export default function Home() {
    const route = useRouter()

    return (
        // home page
        <div className='container md:mx-auto'>
            <div className='flex h-screen flex-col items-center gap-4 md:flex-row'>
                <div className='grow p-6'>
                    <h1 className='mb-4 text-4xl font-bold'>
                        Welcome to{' '}
                        <span className='font-light text-blue-500'>
                            Soccer<strong className='font-bold'>Stats</strong>
                        </span>
                    </h1>
                    <p className='mb-8 text-lg text-default-500'>
                        the site you need for the team you love.
                    </p>
                    <div className='flex gap-4'>
                        <Button
                            className='font-bold'
                            color='primary'
                            onClick={() => route.push('/account/login')}
                        >
                            Log In
                        </Button>
                        <Button
                            className='font-bold'
                            variant='ghost'
                            color='primary'
                            onClick={() => route.push('/account/register')}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
                <div className='grow p-6'>
                    <div className='relative'>
                        <Image
                            src='/images/soccer.jpg'
                            width={200}
                            height={300}
                            className='z-0'
                        />
                        <div className='absolute -right-4 -top-4'>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
