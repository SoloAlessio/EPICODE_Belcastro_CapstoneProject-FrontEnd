'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, ScrollShadow } from '@nextui-org/react'
import Carousel from '../ui/components/Carousel'
import Fixture from '../ui/components/Fixture'
import SquadDetail from '../ui/components/SquadDetail'
import PlayerCard from '../ui/components/PlayerCard'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserContext } from '../context/UserContext'

import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Page() {
    const router = useRouter()
    const userData = useContext(UserContext)

    const [liveMatches, setLiveMatches] = useState('')
    const [fixtures, setFixtures] = useState('')
    const [favTeam, setFavTeam] = useState('')

    const area = {
        series: [
            {
                name: 'Squad Form',
                data: [
                    18, 22, 19, 20, 23, 25, 21, 24, 17, 26, 27, 16, 28, 29, 30,
                    31, 32, 33, 34,
                ],
            },
        ],
        options: {
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    opacityTo: 0.2,
                },
            },
            labels: [
                '17/12/2023',
                '20/12/2023',
                '23/12/2023',
                '29/12/2023',
                '06/01/2024',
                '13/01/2024',
                '19/01/2024',
                '22/01/2024',
                '28/01/2024',
                '02/02/2024',
                '09/02/2024',
                '16/02/2024',
                '23/02/2024',
                '01/03/2024',
                '08/03/2024',
                '15/03/2024',
                '22/03/2024',
                '29/03/2024',
                '05/04/2024',
            ],
        },
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/')
        }

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
                                <Link
                                    key={el.fixture.id}
                                    href={`/dashboard/match/${el.fixture.id}`}
                                    className='hover:bg-default-100'
                                    color='foreground'
                                >
                                    <Fixture
                                        fixture={el.fixture}
                                        teams={el.teams}
                                        goals={el.goals}
                                    />
                                </Link>
                            ))}
                    </CardBody>
                </Card>

                {/* Squad Best Players */}
                <Card className='col-span-12 lg:col-span-4'>
                    <ScrollShadow className='h-[400px] md:h-[650px]'>
                        <CardBody className='p-4'>
                            <p className='mb-4 font-bold'>Best Players</p>
                            <p className='mb-4 font-semibold'>Goals</p>
                            <div className='mb-4 flex flex-col gap-4'>
                                <PlayerCard
                                    player={'Lautaro Martinez'}
                                    role={'Attaccante'}
                                    number={'9'}
                                    image={
                                        'https://api.sofascore.app/api/v1/player/823984/image'
                                    }
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
                            <p className='mb-4 font-semibold'>Assists</p>
                            <div className='mb-4 flex flex-col gap-4'>
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
                            <p className='mb-4 font-semibold'>Goals</p>
                            <div className='mb-4 flex flex-col gap-4'>
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
                            <p className='mb-4 font-semibold'>Goals</p>
                            <div className='mb-4 flex flex-col gap-4'>
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
                            <p className='mb-4 font-semibold'>Goals</p>
                            <div className='mb-4 flex flex-col gap-4'>
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
                <Card className='col-span-12 hidden sm:col-span-8 lg:flex'>
                    <CardBody>
                        {typeof window !== 'undefined' && (
                            <Chart
                                options={area.options}
                                series={area.series}
                                type='area'
                            />
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
