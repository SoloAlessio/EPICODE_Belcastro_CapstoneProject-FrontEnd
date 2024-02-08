'use client'

import React, { useContext, useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Avatar,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Divider,
} from '@nextui-org/react'
import Carousel from '../ui/components/Carousel'
import Fixture from '../ui/components/Fixture'
import SquadDetail from '../ui/components/SquadDetail'
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
    const [standings, setStandings] = useState('')
    const [favTeam, setFavTeam] = useState('')

    const area = {
        series: [
            {
                name: 'Squad Form',
                data: [18, 22, 19, 20, 23, 25, 21, 24, 17, 26, 27, 16, 28],
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
            ],
        },
    }

    const columns = [
        {
            key: 'RANK',
            label: '#',
        },
        {
            key: 'team',
            label: 'TEAM',
        },
        {
            key: 'Points',
            label: 'Pt',
        },
        {
            key: 'Games',
            label: 'PG',
        },
    ]

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            router.push('/')
        }

        const getStandings = async () => {
            let res = await fetch(
                `https://v3.football.api-sports.io/standings?league=135&season=2023`,
                {
                    method: 'GET',
                    headers: {
                        'x-apisports-key': 'cd11382c690043fa0c83658c45af681f',
                    },
                }
            )
            if (res.ok) {
                let data = await res.json()
                if (data.response.length > 0) {
                    data = data.response[0].league.standings[0]
                    setStandings(data)
                } else {
                    setStandings(data.response)
                }
            } else {
                throw new Error('Failed to fetch!')
            }
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

        getStandings()
        getFavTeam()
        getLiveMatches()
        getFixtures()
    }, [])

    return (
        <>
            {/* Carousel */}
            <h4 className='z-10 mb-4 flex items-center gap-2 text-xl font-bold'>
                <div id='liveDot' />
                Live Matches
            </h4>

            {liveMatches.length > 0 ? (
                <Carousel liveMatches={liveMatches} />
            ) : (
                <p className='z-10 mb-8 text-sm text-default-500'>
                    😔 Looks like Nobody is playing right now
                </p>
            )}

            <Divider orientation='horizontal' className='my-6' />

            {/* Welcome text */}
            {userData && (
                <h1 className='z-10 mb-6 text-xl'>
                    <span className='mr-2 font-light'>Welcome Back</span>
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
                                    className='rounded transition-all hover:bg-default-100'
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

                {/* Squad Standing */}
                <Card className='col-span-12 sm:col-span-4'>
                    {standings && (
                        <Table
                            aria-label='Example table with dynamic content'
                            isHeaderSticky
                            className='h-[550px] overflow-y-auto'
                        >
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn key={column.key}>
                                        {column.label}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody>
                                {standings.map((row) => (
                                    <TableRow key={row.team.id}>
                                        <TableCell>{row.rank}</TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-4'>
                                                <Avatar
                                                    src={row.team.logo}
                                                    className='h-6 w-6 rounded-none bg-transparent'
                                                />
                                                <span>{row.team.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{row.points}</TableCell>
                                        <TableCell>{row.all.played}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
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
        </>
    )
}
