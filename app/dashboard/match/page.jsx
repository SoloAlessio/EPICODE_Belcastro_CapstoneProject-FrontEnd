'use client'

import React from 'react'
import { Button } from '@nextui-org/react'
import confetti from 'canvas-confetti'
import Link from 'next/link'

export default function Page() {
    const handleConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
        })
        document.querySelector('#reward').classList.remove('hidden')
        document.querySelector('#rewardButton').classList.add('hidden')
    }
    return (
        <div className='flex h-[600px] flex-col items-center justify-center'>
            <h1 className='text-2xl font-semibold'>Well Done</h1>
            <p className='mb-6 text-lg font-light text-default-500'>
                You discovered the secret route{' '}
            </p>
            <Button
                color='secondary'
                variant='shadow'
                id='rewardButton'
                onPress={handleConfetti}
            >
                Reward
            </Button>
            <div className='mt-6 hidden' id='reward'>
                <p className='mb-4 text-center font-light text-secondary-500'>
                    🤨
                    <br /> You seriously tought there was a reward!? <br />{' '}
                    Hurry up now, run before you get caught!
                </p>
                <Link href={`/dashboard`}>
                    <Button
                        color='danger'
                        className='w-full font-bold hover:scale-105'
                        variant='shadow'
                        size='sm'
                    >
                        RUN
                    </Button>
                </Link>
            </div>
        </div>
    )
}
