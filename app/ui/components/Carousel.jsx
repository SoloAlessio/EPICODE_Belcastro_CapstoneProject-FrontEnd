import React from 'react'
import LiveCard from './LiveCard'

export default function Carousel({ liveMatches }) {
    return (
        <div className='mb-6 grid grid-cols-12 gap-4'>
            {liveMatches.slice(0, 6).map((el) => (
                <LiveCard
                    teams={el.teams}
                    goals={el.goals}
                    fixture={el.fixture}
                    league={el.league}
                    key={el.fixture.id}
                />
            ))}
        </div>
    )
}
