'use client'

import React, { useContext, useState } from 'react'

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
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Image,
    Button,
    Input,
    Tooltip,
} from '@nextui-org/react'

import {
    FaGear,
    FaTrophy,
    FaCircleInfo,
    FaArrowRightFromBracket,
    FaTrash,
} from 'react-icons/fa6'

import { useRouter } from 'next/navigation'
import ThemeSwitcher from './ThemeSwitcher.jsx'
import { UserContext } from '../../context/UserContext.jsx'

export default function NavBarComponent({ setUserData }) {
    const userData = useContext(UserContext)
    const route = useRouter()

    const [name, setName] = useState(userData?.name)
    const [surname, setSurname] = useState(userData?.surname)
    const [email, setEmail] = useState(userData?.email)

    const [isLoading, setIsLoading] = useState(false)

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    /* LOGOUT */
    const handleLogout = () => {
        localStorage.removeItem('token')
        route.push('/')
    }

    /* UPDATE USER DATA */
    const updateUser = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_ENDPOINT}/users/me`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )

            if (res.ok) {
                let data = await res.json()
                setUserData(data)
            }
        } catch (error) {
            console.table({
                status: error.status,
                error: error.statusText,
            })
            throw new Error(error)
        }
    }

    /* SET NEW USER DATA */
    const handleSettings = async () => {
        setIsLoading(true)
        const errorMessage = document.querySelector('#error')
        try {
            let res = await fetch(
                `${process.env.NEXT_PUBLIC_ENDPOINT}/users/me`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        name: name,
                        surname: surname,
                        email: email,
                    }),
                }
            )

            if (res.ok) {
                updateUser()
                setIsLoading(false)
                onOpenChange()
            } else {
                setIsLoading(false)
                errorMessage.innerHTML = 'Error updating settings'
            }
        } catch (error) {
            setIsLoading(false)
            errorMessage.innerHTML = error.message
        }
    }

    /* DELETE USER */
    const handleDelete = async () => {
        const errorMessage = document.querySelector('#error')
        if (!confirm('Are you sure you want to delete your account?')) {
            return
        }
        try {
            let res = await fetch(
                `${process.env.NEXT_PUBLIC_ENDPOINT}/users/me`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )

            if (res.ok) {
                handleLogout()
            } else {
                errorMessage.innerHTML = 'Error deleting account'
            }
        } catch (error) {
            errorMessage.innerHTML = error.message
        }
    }

    return (
        <>
            {/* NAVABAR */}
            <Navbar
                isBordered
                className='mb-6 [&_header]:container [&_header]:px-4'
            >
                <NavbarContent justify='center'>
                    <NavbarBrand className='mr-4'>
                        <Link href='/dashboard' color='foreground'>
                            <Image
                                src='/images/logo.svg'
                                alt='navbar logo'
                                width={40}
                                height={40}
                            />
                            <p className='ml-2 hidden font-light text-inherit sm:block'>
                                Soccer
                                <strong className='font-bold'>Stats</strong>
                            </p>
                        </Link>
                    </NavbarBrand>
                    <NavbarContent
                        justify='end'
                        className='hidden gap-8 sm:flex'
                    >
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
                            <Link href='/dashboard/leagues' color='foreground'>
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
                                color='primary'
                                name={userData?.name}
                                size='sm'
                                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                            />
                        </DropdownTrigger>

                        <DropdownMenu
                            aria-label='Profile Actions'
                            variant='flat'
                        >
                            <DropdownItem
                                key='profile'
                                isDisabled
                                className='mb-4 h-14 gap-2'
                                startContent={
                                    <Avatar
                                        isBordered
                                        className='mr-2 transition-transform'
                                        color='primary'
                                        name={`
                                            ${userData?.name} 
                                            ${userData?.surname}
                                        `}
                                        size='sm'
                                        src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
                                    />
                                }
                            >
                                <p className='font-semibold'>
                                    {userData?.name}
                                </p>
                                <p className='text-sm text-default-500'>
                                    Welcome Back!
                                </p>
                            </DropdownItem>
                            <DropdownItem
                                description='Manage your account settings'
                                key='settings'
                                startContent={<FaGear className='mr-2' />}
                                onPress={onOpen}
                            >
                                Settings
                            </DropdownItem>
                            <DropdownItem
                                description='How your team is doing?'
                                key='analytics'
                                startContent={<FaTrophy className='mr-2' />}
                                href='/dashboard'
                            >
                                MyTeam
                            </DropdownItem>
                            <DropdownItem
                                description='Help us improve the app'
                                key='help_and_feedback'
                                startContent={<FaCircleInfo className='mr-2' />}
                                onPress={() =>
                                    window.open(
                                        'mailto:belcastroalessio@outlook.it'
                                    )
                                }
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

            {/* SETTINGS MODAL */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement='bottom-center'
                backdrop='blur'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex items-center gap-4'>
                                <FaGear />
                                <span>Settings</span>
                                <p
                                    id='error'
                                    className='text-sm text-danger'
                                ></p>
                            </ModalHeader>
                            <ModalBody>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <Input
                                            isRequired
                                            defaultValue={userData?.name}
                                            onValueChange={setName}
                                            label='Name'
                                            type='text'
                                        />
                                        <Input
                                            isRequired
                                            defaultValue={userData?.surname}
                                            onValueChange={setSurname}
                                            label='Surname'
                                            type='text'
                                        />
                                    </div>
                                    <Input
                                        isRequired
                                        defaultValue={userData?.email}
                                        onValueChange={setEmail}
                                        label='Email'
                                        type='email'
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter className='justify-between'>
                                <Tooltip content='Delete Acccount'>
                                    <Button
                                        isIconOnly
                                        color='danger'
                                        variant='shadow'
                                        onClick={() => handleDelete()}
                                    >
                                        <FaTrash />
                                    </Button>
                                </Tooltip>
                                <div className='flex gap-4'>
                                    <Button
                                        color='danger'
                                        variant='flat'
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        color='primary'
                                        isLoading={isLoading}
                                        onPress={() => handleSettings()}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
