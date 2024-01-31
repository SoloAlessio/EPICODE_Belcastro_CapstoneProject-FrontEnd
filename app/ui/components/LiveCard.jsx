import React from 'react'
import { Card, CardBody, Image, Link } from '@nextui-org/react'

export default function LiveCard({ teams, goals, fixture, league }) {
    return (
        <Card className='col-span-12 md:col-span-4 lg:col-span-2'>
            <Link href={`/dashboard/match/${fixture.id}`} color='foreground'>
                <CardBody className='grid grid-cols-12 gap-4'>
                    {/* LEAGUE NAME */}
                    <div className='col-span-12'>
                        <p className='text-sm font-bold text-gray-500'>
                            {league.name}
                        </p>
                    </div>

                    {/* MACTH STATS */}
                    <div className='col-span-4 flex max-w-full flex-col items-center justify-center gap-2 overflow-hidden'>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <Image
                                width={32}
                                height={32}
                                radius='full'
                                loading='lazy'
                                src={teams.home.logo}
                                alt={teams.home.name}
                            />
                            <p className='text-tiny font-bold'>{goals.home}</p>
                        </div>
                    </div>
                    <div className='col-span-4 flex flex-col items-center justify-between gap-2 overflow-hidden text-center'>
                        <p className='text-sm font-bold text-gray-500'>
                            {fixture.status.elapsed}&rsquo;
                        </p>
                        <p className='text-sm font-bold text-gray-500'>
                            {fixture.status.long}
                        </p>
                    </div>
                    <div className='col-span-4 flex flex-col items-center justify-center gap-2 overflow-hidden'>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <Image
                                width={32}
                                height={32}
                                radius='full'
                                loading='lazy'
                                src={teams.away.logo}
                                alt={teams.away.name}
                            />
                            <p className='text-tiny font-bold'>{goals.away}</p>
                        </div>
                    </div>
                </CardBody>
            </Link>
        </Card>
    )
}
