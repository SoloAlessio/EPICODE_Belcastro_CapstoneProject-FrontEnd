'use client'

import React from 'react'
import { Card, CardBody, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Carousel from '../ui/components/Carousel'
import Fixture from '../ui/components/Fixture'
import SquadDetail from '../ui/components/SquadDetail'
import Chart from 'react-apexcharts'
import PlayerCard from '../ui/components/PlayerCard'

export default function Page() {
    const [userData, setUserData] = useState('')
    const [liveMatches, setLiveMatches] = useState('')
    const [fixtures, setFixtures] = useState('')
    const [favTeam, setFavTeam] = useState('')

    const area = {
        series: [
            {
                name: 'label-1',
                data: [44, 55, 13, 43, 22],
            },
        ],
        options: {
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        },
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

        const getFavTeam = async () => {
            let res = await fetch(
                `https://v3.football.api-sports.io/teams?id=505&league=135&season=2023`,
                {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': 'cd11382c690043fa0c83658c45af681f',
                    },
                }
            )
            if (res.ok) {
                let data = await res.json()
                setFavTeam(data.response[0])
            } else {
                throw new Error('Failed to fetch!')
            }
        }

        getFavTeam()
        getUser()
        getLiveMatches()
        getFixtures()
    }, [])

    return (
        <div className='container px-4 md:mx-auto'>
            {/* Carousel */}
            {liveMatches && <Carousel liveMatches={liveMatches} />}

            {/* Welcome text */}
            {userData && (
                <h1 className='mb-6 text-center text-xl'>
                    Welcome Back{' '}
                    <span className='font-bold'>{userData.name}</span> 👋
                </h1>
            )}

            <div className='mb-6 grid grid-cols-12 gap-4'>
                {/* Squad Detail */}
                <Card className='col-span-12 sm:col-span-6'>
                    <CardBody className='flex p-4'>
                        {favTeam && (
                            <SquadDetail
                                team={favTeam.team}
                                venue={favTeam.venue}
                            />
                        )}
                    </CardBody>
                </Card>

                {/* Squad Fixtures */}
                <Card className='col-span-12 sm:col-span-6'>
                    <CardBody className='p-4'>
                        {fixtures &&
                            fixtures.map((el) => (
                                <Fixture
                                    key={el.fixture.id}
                                    fixture={el.fixture}
                                    teams={el.teams}
                                    goals={el.goals}
                                />
                            ))}
                    </CardBody>
                </Card>

                {/* Squad Best Players */}
                <Card className='col-span-12 sm:col-span-4'>
                    <ScrollShadow>
                        <CardBody className='p-4'>
                            <p class='mb-4 font-bold'>Best Players</p>
                            <p class='mb-4 font-semibold'>Goals</p>
                            <div class='mb-4 flex flex-col gap-4'>
                                <PlayerCard
                                    player={'Lautaro Martinez'}
                                    role={'Attaccante'}
                                    number={'9'}
                                />
                                <PlayerCard
                                    player={'Lautaro Martinez'}
                                    role={'Attaccante'}
                                    number={'9'}
                                />
                                <PlayerCard
                                    player={'Lautaro Martinez'}
                                    role={'Attaccante'}
                                    number={'9'}
                                />
                            </div>
                            <p class='mb-4 font-semibold'>Assists</p>
                            <div class='mb-4 flex flex-col gap-4'>
                                <PlayerCard
                                    player={'Lautaro Martinez'}
                                    role={'Attaccante'}
                                    number={'9'}
                                />
                                <PlayerCard
                                    player={'Lautaro Martinez'}
                                    role={'Attaccante'}
                                    number={'9'}
                                />
                                <PlayerCard
                                    player={'Lautaro Martinez'}
                                    role={'Attaccante'}
                                    number={'9'}
                                />
                            </div>
                        </CardBody>
                    </ScrollShadow>
                </Card>

                {/* Squad Form */}
                <Card className='col-span-12 sm:col-span-8'>
                    <CardBody>
                        <Chart
                            options={area.options}
                            series={area.series}
                            type='area'
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
