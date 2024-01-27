'use client'

import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Input,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Image,
} from '@nextui-org/react'

import { SearchIcon } from '../SearchIcon.jsx'
import { useRouter } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher.jsx'
import Logo from '@/public/vercel.svg'

export default function NavBarComponent() {
    const route = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('token')
        route.push('/')
    }

    return (
        <Navbar isBordered className='mb-6'>
            <NavbarContent justify='start'>
                <NavbarBrand className='mr-4'>
                    <Image src={Logo} width={36} height={36} />
                    <p className='hidden font-light text-inherit sm:block'>
                        Soccer<strong className='font-bold'>Stats</strong>
                    </p>
                </NavbarBrand>
                <NavbarContent className='hidden gap-3 sm:flex'>
                    <NavbarItem>
                        <Link color='foreground' href='#'>
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href='#' aria-current='page' color='foreground'>
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color='foreground' href='#'>
                            Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as='div' className='items-center' justify='end'>
                <Input
                    classNames={{
                        base: 'max-w-full sm:max-w-[10rem] h-10 hidden sm:block',
                        mainWrapper: 'h-full',
                        input: 'text-small',
                        inputWrapper:
                            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
                    }}
                    placeholder='Type to search...'
                    size='sm'
                    startContent={<SearchIcon size={18} />}
                    type='search'
                />
                <ThemeSwitcher />
                <Dropdown placement='bottom-end'>
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as='button'
                            className='transition-transform'
                            color='secondary'
                            name='Jason Hughes'
                            size='sm'
                            src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Profile Actions' variant='flat'>
                        <DropdownItem key='profile' className='h-14 gap-2'>
                            <p className='font-semibold'>Signed in as</p>
                            <p className='font-semibold'>zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key='settings'>My Settings</DropdownItem>
                        <DropdownItem key='team_settings'>
                            Team Settings
                        </DropdownItem>
                        <DropdownItem key='analytics'>Analytics</DropdownItem>
                        <DropdownItem key='system'>System</DropdownItem>
                        <DropdownItem key='configurations'>
                            Configurations
                        </DropdownItem>
                        <DropdownItem key='help_and_feedback'>
                            Help & Feedback
                        </DropdownItem>
                        <DropdownItem
                            key='logout'
                            color='danger'
                            onClick={() => handleLogout()}
                        >
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    )
}
