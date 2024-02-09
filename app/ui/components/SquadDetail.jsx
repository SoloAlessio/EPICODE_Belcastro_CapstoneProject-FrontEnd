import React from 'react'
import { FaPeopleGroup, FaLocationDot } from 'react-icons/fa6'
import { Image } from '@nextui-org/react'

export default function SquadDetail({ team, venue }) {
    return (
        <div className='flex flex-col items-center lg:flex-row lg:items-start'>
            <Image
                src={team.logo}
                alt={team.name}
                className='mb-4 mr-0 p-4 drop-shadow lg:mb-0 lg:mr-4'
                loading='lazy'
            />
            <div className='text-center lg:text-start'>
                <h4 className='mb-6 text-3xl font-semibold'>{team.name}</h4>
                <p className='mb-6 text-lg'>
                    {venue.name}
                    <br />
                    <span className='flex items-center gap-2 text-base text-slate-500'>
                        <FaLocationDot />
                        {venue.address}, {venue.city}
                    </span>
                </p>
                <div className='flex flex-col justify-center text-lg lg:justify-start'>
                    Capacità:
                    <div className='flex items-center justify-center gap-4 text-slate-500 lg:justify-start'>
                        <FaPeopleGroup />
                        <span>{venue.capacity}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
