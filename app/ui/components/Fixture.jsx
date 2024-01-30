import React from 'react'

export default function Fixture({ fixture, teams, goals }) {
    const formatDate = (date) => {
        let formattedDate = date.toString().slice(0, 10)
        formattedDate = formattedDate.replace('T', ' - ')

        return formattedDate
    }

    return (
        <div className='grid cursor-pointer grid-cols-12 rounded-lg px-0 py-2 transition-all hover:bg-default-100 lg:px-4'>
            {/* Squadra di casa */}
            <div className='col-span-3 flex items-center pr-3 lg:pr-0'>
                <span className='truncate font-semibold'>
                    {teams.home.name}
                </span>
            </div>

            {/* Dettagli partita */}
            <div className='col-span-6 flex items-center justify-around gap-4'>
                {/* Logo squadra di casa */}
                <img
                    src={teams.home.logo}
                    alt={teams.home.name}
                    loading='lazy'
                    className='h-6'
                />

                {/* Risultato */}
                <div className='flex flex-col text-center'>
                    <div className='flex items-center justify-center space-x-3'>
                        <span className='font-medium'>{goals.home}</span>
                        <span className='text-default-500'>
                            {fixture.status.short}
                        </span>
                        <span className='font-medium'>{goals.away}</span>
                    </div>
                    {/* Data */}
                    <div>
                        <span className='text-center text-xs font-light text-default-500'>
                            {formatDate(fixture.date)}
                        </span>
                    </div>
                </div>

                {/* Logo squadra ospite */}
                <img
                    src={teams.away.logo}
                    alt={teams.away.name}
                    loading='lazy'
                    className='h-6'
                />
            </div>

            {/* Squadra ospite */}
            <div className='col-span-3 flex items-center justify-end pl-3 lg:pl-0'>
                <span className='truncate font-semibold'>
                    {teams.away.name}
                </span>
            </div>
        </div>
    )
}
