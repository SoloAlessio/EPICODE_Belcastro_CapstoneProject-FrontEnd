import React from 'react'
import { Progress } from '@nextui-org/react'

export default function StatsBar({ homeValue, awayValue, statName }) {
    return (
        <div className='mb-4'>
            <div className='mb-2 flex justify-between'>
                <span>{homeValue}</span>
                <span className='mb-0'>{statName}</span>
                <span>{awayValue}</span>
            </div>
            <div className='flex gap-4'>
                <Progress
                    size='sm'
                    aria-label={homeValue + awayValue}
                    value={parseInt(homeValue)}
                    maxValue={parseInt(homeValue) + parseInt(awayValue)}
                    classNames={{
                        track: '-scale-x-100',
                    }}
                    color={
                        parseInt(homeValue) > parseInt(awayValue)
                            ? 'primary'
                            : 'default'
                    }
                />
                <Progress
                    size='sm'
                    aria-label={awayValue + homeValue}
                    value={parseInt(awayValue)}
                    maxValue={parseInt(homeValue) + parseInt(awayValue)}
                    color={
                        parseInt(homeValue) > parseInt(awayValue)
                            ? 'default'
                            : 'primary'
                    }
                />
            </div>
        </div>
    )
}
