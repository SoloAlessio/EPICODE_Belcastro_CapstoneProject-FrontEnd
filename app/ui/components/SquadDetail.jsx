import React from 'react'
import { FaPeopleGroup } from 'react-icons/fa6'
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
                <h4 className='mb-4 text-3xl font-semibold'>{team.name}</h4>
                <p className='mb-4 text-lg'>
                    {venue.name}
                    <br />
                    <span className='text-base text-slate-500'>
                        {venue.address}, {venue.city}
                    </span>
                </p>
                <p className='flex items-center justify-center gap-4 text-lg lg:justify-start'>
                    <FaPeopleGroup className='text-indigo-500' />{' '}
                    {venue.capacity}
                </p>
            </div>
        </div>
    )
}
