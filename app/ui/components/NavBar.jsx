'use client'

import React, { useContext } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
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

import { useRouter } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher.jsx'
import { UserContext } from '../../context/UserContext.jsx'

export default function NavBarComponent() {
    const userData = useContext(UserContext)
    const route = useRouter()
    const handleLogout = () => {
        localStorage.removeItem('token')
        route.push('/')
    }

    return (
        <Navbar isBordered className='mb-6'>
            <NavbarContent justify='start'>
                <NavbarBrand className='mr-4'>
                    <Link href='/dashboard' color='foreground'>
                        <Image src='/images/logo.svg' width={40} height={40} />
                        <p className='ml-2 hidden font-light text-inherit sm:block'>
                            Soccer<strong className='font-bold'>Stats</strong>
                        </p>
                    </Link>
                </NavbarBrand>
                <NavbarContent className='hidden gap-3 sm:flex'>
                    <NavbarItem isActive>
                        <Link
                            color='foreground'
                            href='/dashboard'
                            aria-current='page'
                        >
                            MyTeam
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
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
                                    name={userData?.name}
                                    size='sm'
                                    src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                                />
                            }
                        >
                            <p className='font-semibold'>{userData?.name}</p>
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
