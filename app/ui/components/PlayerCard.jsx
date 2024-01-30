import React from 'react'

export default function PlayerCard({ player, role, number }) {
    return (
        <div class='flex items-center justify-between'>
            <div class='flex items-center gap-4'>
                <div class='h-12 w-12 rounded-full bg-slate-300'></div>
                <div>
                    <h4 class='text-sm font-bold text-slate-500'>
                        {player.name}
                    </h4>
                    <p class='text-sm font-normal text-slate-400'>{role}</p>
                </div>
            </div>
            <p class='font-bold text-slate-500'>{number}</p>
        </div>
    )
}
