'use client'

import React from 'react'
import { Divider, Card, CardBody } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Carousel from '../ui/components/Carousel'

export default function Page() {
    const [userData, setUserData] = useState('')
    const [liveMatches, setLiveMatches] = useState('')
    const [fixtures, setFixtures] = useState('')

    const formatDate = (date) => {
        let formattedDate = date.toString().slice(0, 16)
        formattedDate = formattedDate.replace('T', ' - ')

        return formattedDate
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        const getFixtures = async () => {
            let res = await fetch(
                `https://v3.football.api-sports.io/fixtures?season=2023&team=505&season=2023&last=5`,
                {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': 'cd11382c690043fa0c83658c45af681f',
                    },
                }
            )
            if (res.ok) {
                let data = await res.json()
                setFixtures(data.response)
            } else {
                throw new Error('Failed to fetch!')
            }
        }

        const getLiveMatches = async () => {
            let res = await fetch(
                `https://v3.football.api-sports.io/fixtures?live=all`,
                {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': 'cd11382c690043fa0c83658c45af681f',
                    },
                }
            )
            if (res.ok) {
                let data = await res.json()
                setLiveMatches(data.response)
            } else {
                throw new Error('Failed to fetch!')
            }
        }

        const getUser = async () => {
            try {
                const res = await fetch(
                    `https://epicode-belcastro-capstone-project.onrender.com/users/me`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )

                if (res.ok) {
                    let data = await res.json()
                    localStorage.removeItem('token')
                    setUserData(data)
                }
            } catch (error) {
                console.table({
                    status: message.status,
                    error: message.statusText,
                })
                throw new Error(error)
            }
        }

        getUser()
        getLiveMatches()
        getFixtures()
    }, [])

    return (
        <div className='container px-4 md:mx-auto'>
            {/* Carousel */}
            {liveMatches && <Carousel liveMatches={liveMatches} />}

            {/* Welcome text */}
            <h1 className='mb-6 text-center text-xl'>
                Welcome Back <span className='font-bold'>{userData.name}</span>{' '}
                👋
            </h1>

            <div className='mb-6 grid grid-cols-12 gap-4'>
                <Card className='col-span-12 rounded-xl bg-content1 p-4 sm:col-span-6'>
                    <CardBody>
                        <h1>col-6</h1>
                    </CardBody>
                </Card>
                <Card className='col-span-12 sm:col-span-6'>
                    <CardBody className='p-4'>
                        {fixtures &&
                            fixtures.map((el) => (
                                <div
                                    className='grid cursor-pointer grid-cols-12 rounded-lg px-4 py-2 transition-all hover:bg-default-100'
                                    key={el.fixture.id}
                                >
                                    {/* Squadra di casa */}
                                    <div className='col-span-4 flex items-center'>
                                        <span className='font-semibold'>
                                            {el.teams.home.name}
                                        </span>
                                    </div>

                                    {/* Dettagli partita */}
                                    <div className='col-span-4 flex items-center justify-around gap-4'>
                                        {/* Logo squadra di casa */}
                                        <img
                                            src={el.teams.home.logo}
                                            alt={el.teams.home.name}
                                            loading='lazy'
                                            className='h-6'
                                        />

                                        {/* Risultato */}
                                        <div className='flex flex-col text-center'>
                                            <div className='flex items-center justify-center space-x-3'>
                                                <span className='font-medium'>
                                                    {el.goals.home}
                                                </span>
                                                <span className='text-default-500'>
                                                    {el.fixture.status.short}
                                                </span>
                                                <span className='font-medium'>
                                                    {el.goals.away}
                                                </span>
                                            </div>
                                            {/* Data */}
                                            <div>
                                                <span className='text-center text-xs font-light text-default-500'>
                                                    {formatDate(
                                                        el.fixture.date
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Logo squadra ospite */}
                                        <img
                                            src={el.teams.away.logo}
                                            alt={el.teams.away.name}
                                            loading='lazy'
                                            className='h-6'
                                        />
                                    </div>

                                    {/* Squadra ospite */}
                                    <div className='col-span-4 flex items-center justify-end'>
                                        <span className='font-semibold'>
                                            {el.teams.away.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
