'use client'

import React, { useEffect, useState } from 'react'
import { Input, Card, CardBody, Image, Pagination } from '@nextui-org/react'

export default function Page() {
    const [leagues, setLeagues] = useState()
    const [search, setSearch] = useState('')

    useEffect(() => {
        const getLeagues = async () => {
            // FETCH LEAGUES
            try {
                let res = await fetch(
                    `https://v3.football.api-sports.io/leagues`,
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
                    setLeagues(data.response)
                } else {
                }
            } catch (error) {
                console.log(error)
                throw new Error('Error fetching leagues')
            }
        }
        getLeagues()
    }, [])

    return (
        <div>
            <Input
                type='text'
                label='League'
                placeholder='Search League...'
                className='mb-8'
                isClearable
                onValueChange={setSearch}
            />
            <div className='mb-8 grid grid-cols-12 gap-4'>
                {leagues
                    ?.slice(0, 24)
                    .filter((e) =>
                        e.league.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((el) => (
                        <Card className='col-span-12 py-4 transition-transform hover:-translate-y-2 md:col-span-4 lg:col-span-3'>
                            <CardBody className='flex items-center gap-4 overflow-visible px-4 py-2 md:flex-row'>
                                <Image
                                    alt='Card background'
                                    className='mr-4 rounded-xl object-cover'
                                    src={el.league.logo}
                                    loading='lazy'
                                    width={50}
                                />
                                <div className='flex-col items-start pb-0 pt-2'>
                                    <p className='text-tiny font-bold uppercase'>
                                        {el.country.name}
                                    </p>
                                    <small className='text-default-500'>
                                        {el.league.type}
                                    </small>
                                    <h4 className='text-large font-bold'>
                                        {el.league.name}
                                    </h4>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
            </div>
            <div className='flex justify-center'>
                <Pagination total={10} />
            </div>
        </div>
    )
}
