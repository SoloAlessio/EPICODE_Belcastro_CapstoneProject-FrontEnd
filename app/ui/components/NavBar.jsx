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

import {
    FaGear,
    FaTrophy,
    FaCircleInfo,
    FaArrowRightFromBracket,
} from 'react-icons/fa6'

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
                        <Link color='foreground' href='#' aria-current='page'>
                            MyTeam
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href='#' color='foreground'>
                            Leagues
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color='foreground' href='#'>
                            Clubs
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
                <Dropdown placement='bottom-end' backdrop='blur'>
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as='button'
                            className='transition-transform'
                            color='secondary'
                            name='Belcastro Alessio'
                            size='sm'
                            src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Profile Actions' variant='flat'>
                        <DropdownItem
                            key='profile'
                            className='mb-4 h-14 gap-2'
                            startContent={
                                <Avatar
                                    isBordered
                                    as='button'
                                    className='mr-2 transition-transform'
                                    color='secondary'
                                    name='Belcastro Alessio'
                                    size='sm'
                                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                                />
                            }
                        >
                            <p className='font-semibold'>Belcastro Alessio</p>
                            <p className='text-sm text-default-500'>
                                Welcome Back!
                            </p>
                        </DropdownItem>
                        <DropdownItem
                            description='Manage your account settings'
                            key='settings'
                            startContent={<FaGear className='mr-2' />}
                        >
                            Settings
                        </DropdownItem>
                        <DropdownItem
                            description='How your team is doing?'
                            key='analytics'
                            startContent={<FaTrophy className='mr-2' />}
                        >
                            MyTeam
                        </DropdownItem>
                        <DropdownItem
                            description='Help us improve the app'
                            key='help_and_feedback'
                            startContent={<FaCircleInfo className='mr-2' />}
                        >
                            Help & Feedback
                        </DropdownItem>
                        <DropdownItem
                            description='Log out from your account'
                            startContent={
                                <FaArrowRightFromBracket className='mr-2' />
                            }
                            key='logout'
                            className='mt-4'
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
