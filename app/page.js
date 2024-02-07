'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import ThemeSwitcher from './ui/components/ThemeSwitcher'
import { motion } from 'framer-motion'

export default function Home() {
    const route = useRouter()

    return (
        <div className='container md:mx-auto'>
            <div className='flex h-screen items-center justify-center'>
                <div className='z-10 flex grow flex-col items-center justify-center gap-6 p-6'>
                    <h1 className='mb-4 text-center text-5xl font-bold md:text-7xl'>
                        Welcome to
                        <br />
                        <motion.span
                            initial={{ x: 0, opacity: 0 }}
                            animate={{ x: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            id='HomeTitle'
                            className='font-light text-blue-500'
                        >
                            Soccer
                            <strong className='font-bold'>Stats</strong>
                        </motion.span>
                    </h1>
                    <p className='mb-8 text-center text-lg text-default-500 md:text-xl'>
                        Welcome to SoccerStats.
                        <br /> The site you need for the team you love.
                    </p>
                    <div className='flex gap-6 justify-self-start'>
                        <Button
                            className='w-full font-bold'
                            color='primary'
                            size='lg'
                            onClick={() => route.push('/account/login')}
                        >
                            Login
                        </Button>
                        <Button
                            className='w-full font-bold'
                            variant='ghost'
                            color='primary'
                            size='lg'
                            onClick={() => route.push('/account/register')}
                        >
                            Sign up
                        </Button>
                        <div className='absolute right-8 top-8'>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
