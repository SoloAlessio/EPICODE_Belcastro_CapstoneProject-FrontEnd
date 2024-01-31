import React from 'react'
import { Avatar } from '@nextui-org/react'

export default function PlayerCard({ player, role, number, image }) {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                <Avatar src={image || 'https://picsum.photos/300/300'} />
                <div>
                    <h4 className='text-sm font-bold text-slate-500'>
                        {player}
                    </h4>
                    <p className='text-sm font-normal text-slate-400'>{role}</p>
                </div>
            </div>
            <p className='font-bold text-slate-500'>{number}</p>
        </div>
    )
}
