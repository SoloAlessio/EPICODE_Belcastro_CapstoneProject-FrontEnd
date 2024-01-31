'use client'

import React from 'react'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Button,
} from '@nextui-org/react'

export default function page() {
    return (
        <div className='container md:mx-auto'>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-6 rounded bg-content1 p-4'>
                    <h1 className='text-lg font-bold text-foreground'>Match</h1>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant='ghost'>Open Dropdown</Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label='Static Actions'>
                            <DropdownItem key={'ciao'}>Ciao</DropdownItem>
                            <DropdownItem key={'ciao'}>Addio</DropdownItem>
                            <DropdownItem key={'Arrivederci'}>
                                Arrivederci
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
