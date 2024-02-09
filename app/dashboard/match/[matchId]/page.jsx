'use client'

import React from 'react'
import {
    Image,
    Card,
    CardBody,
    Progress,
    ScrollShadow,
} from '@nextui-org/react'
import {
    TbScreenShare,
    TbBallFootball,
    TbCards,
    TbSwitchHorizontal,
} from 'react-icons/tb'
import { useEffect, useState } from 'react'
import StatsBar from '@/app/ui/components/StatsBar'

export default function Page({ params }) {
    const [homeStats, setHomeStats] = useState()
    const [awayStats, setAwayStats] = useState()

    const [matchData, setMatchData] = useState()

    const eventLogo = (event, detail) => {
        switch (event) {
            case 'Goal':
                return <TbBallFootball size={'1.25rem'} color='#0085FF' />
            case 'Card':
                return (
                    <TbCards
                        size={'1.25rem'}
                        color={detail === 'Yellow Card' ? '#eab308' : '#ef4444'}
                    />
                )
            case 'subst':
                return <TbSwitchHorizontal size={'1.25rem'} />
            case 'Var':
                return <TbScreenShare size={'1.25rem'} />
            default:
                return ''
        }
    }

    useEffect(() => {
        const getMatchData = async () => {
            try {
                let res = await fetch(
                    `https://v3.football.api-sports.io/fixtures?id=${params.matchId}`,
                    {
                        method: 'GET',
                        headers: {
                            'x-apisports-key':
                                'cd11382c690043fa0c83658c45af681f',
                        },
                    }
                )

                if (res.ok) {
                    const data = await res.json()
                    setMatchData(data.response[0])
                    setHomeStats(data.response[0].statistics[0]?.statistics)
                    setAwayStats(data.response[0].statistics[1]?.statistics)
                } else {
                    console.log('Failed to fetch data')
                    throw new Error('Something went wrong')
                }
            } catch (error) {
                console.table({ message: error.message, status: error.status })
                throw new Error(error.message)
            }
        }
        getMatchData()
    }, [params.matchId])

    return (
        <div className='grid grid-cols-12 gap-4'>
            <Card className='col-span-12 p-4 lg:col-span-6'>
                {/* MATCH DETAIL */}
                {matchData && (
                    <CardBody className='flex items-center justify-between gap-6 lg:flex-row'>
                        {/* Home */}
                        <div className='flex grow flex-col items-center gap-4'>
                            <Image
                                height={150}
                                alt={matchData?.teams.home.name}
                                src={matchData?.teams.home.logo}
                                className='rounded-none'
                            />
                            <p className='col-span-3 hidden max-w-32 truncate text-xl font-bold lg:block'>
                                {matchData?.teams.home.name}
                            </p>
                        </div>

                        <div className='flex grow flex-col gap-4 text-center'>
                            {/* League Info */}
                            <div className='hidden items-center justify-center gap-4 lg:flex'>
                                <Image
                                    alt={matchData?.league.name}
                                    src={matchData?.league.logo}
                                    width={24}
                                />
                                <p className='text-medium font-bold'>
                                    {matchData?.league.name} -{' '}
                                    {matchData?.league.country}
                                </p>
                            </div>

                            {/* Match Score */}
                            <div className='grid grid-cols-9 items-center gap-4'>
                                <p className='col-span-3 truncate text-xl font-bold lg:hidden'>
                                    {matchData?.teams.home.name}
                                </p>
                                <h4 className='col-span-3 text-4xl font-normal lg:col-span-12'>
                                    {matchData?.goals.home} :{' '}
                                    {matchData?.goals.away}
                                </h4>
                                <p className='col-span-3 truncate text-xl font-bold lg:hidden'>
                                    {matchData?.teams.away.name}
                                </p>
                            </div>
                            <p className='text-sm text-default-700'>
                                {matchData?.fixture.status.long}
                            </p>

                            {/* Match Date */}
                            <div className='flex flex-col'>
                                <p className='text-sm font-semibold text-default-500'>
                                    {matchData?.league.season}
                                </p>
                                <p className='text-sm text-default-500'>
                                    {matchData?.league.round}
                                </p>
                            </div>
                        </div>

                        {/* Away */}
                        <div className='flex grow flex-col items-center gap-4'>
                            <Image
                                height={150}
                                alt={matchData?.teams.away.name}
                                src={matchData?.teams.away.logo}
                                className='max-h-36 rounded-none'
                            />
                            <p className='col-span-3 hidden max-w-32 truncate text-xl font-bold md:block'>
                                {matchData?.teams.away.name}
                            </p>
                        </div>
                    </CardBody>
                )}
            </Card>

            <Card className='col-span-12 p-4 lg:col-span-6'>
                {/* MATCH EVENTS */}
                <CardBody className='flex gap-4'>
                    <h4 className='mb-4 text-xl font-bold'>Events</h4>
                    <ScrollShadow className='h-[275px]'>
                        <div className='flex flex-col gap-4'>
                            {matchData?.events.map((event) => (
                                <div
                                    className='flex items-center justify-between gap-4'
                                    key={Math.floor(Math.random() * 100000)}
                                >
                                    <div className='flex gap-4'>
                                        <div className='flex h-10 w-10 items-center justify-center'>
                                            <Image
                                                alt={event.team.name}
                                                src={event.team.logo}
                                                className='max-h-10 rounded-none'
                                            />
                                        </div>
                                        <div>
                                            <h4 className='text-medium font-bold'>
                                                {event.player.name}
                                            </h4>
                                            <p className='text-sm font-normal text-default-500'>
                                                {event.detail}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        {eventLogo(event.type, event.detail)}
                                        <span className='mr-4 w-8 text-end font-semibold text-default-400'>
                                            {event.time.elapsed}&rsquo;
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollShadow>
                </CardBody>
            </Card>

            <Card className='col-span-12 p-4 lg:col-span-7'>
                {/* MATCH STATS */}
                <CardBody className='flex gap-4'>
                    {/* Statistics */}
                    <h4 className='mb-4 text-xl font-bold'>Statistics</h4>
                    {matchData && homeStats && (
                        <ScrollShadow className='h-[350px] px-4'>
                            {homeStats.map((element, index) => (
                                <StatsBar
                                    key={homeStats[index].type}
                                    homeValue={homeStats[index].value}
                                    awayValue={awayStats[index].value}
                                    statName={homeStats[index].type}
                                />
                            ))}
                        </ScrollShadow>
                    )}
                </CardBody>
            </Card>

            <Card className='col-span-12 p-4 lg:col-span-5'>
                {/* MATCH LINEUPS */}
                <CardBody className='flex gap-4'>
                    <h4 className='mb-4 text-xl font-bold'>Lineups</h4>
                    {matchData && matchData.lineups.length > 0 && (
                        <div className='flex flex-col justify-between gap-6 md:flex-row md:gap-4'>
                            {/* Home Lineup */}
                            <div className='grow'>
                                <div className='flex items-center justify-between md:justify-start'>
                                    <span className='font-semibold'>
                                        {matchData.lineups[0].team.name}:
                                    </span>
                                    <span className='pl-4 font-light text-default-500'>
                                        {matchData.lineups[0].formation}
                                    </span>
                                </div>
                                <ul className='mt-4'>
                                    {matchData.lineups[0].startXI.map(
                                        (player) => (
                                            <li
                                                key={player.player.id}
                                                className='text-default-700'
                                            >
                                                {player.player.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            {/* Away Lineup */}
                            <div className='grow'>
                                <div className='flex items-center justify-between md:justify-start'>
                                    <span className='font-semibold'>
                                        {matchData.lineups[1].team.name}:
                                    </span>
                                    <span className='pl-4 font-light text-default-500'>
                                        {matchData.lineups[1].formation}
                                    </span>
                                </div>
                                <ul className='mt-4'>
                                    {matchData.lineups[1].startXI.map(
                                        (player) => (
                                            <li
                                                key={player.player.id}
                                                className='text-default-700'
                                            >
                                                {player.player.name}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}
