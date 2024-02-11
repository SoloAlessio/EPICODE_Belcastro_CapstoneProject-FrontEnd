'use client'

import NavBarComponent from '../ui/components/NavBar.jsx'
import { useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import Footer from '../ui/components/Footer.jsx'
import { useSearchParams } from 'next/navigation'

export default function Layout({ children }) {
    const [userData, setUserData] = useState()
    const searchParams = useSearchParams()
    const urlToken = searchParams.get(`token`)

    useEffect(() => {
        if (urlToken) {
            localStorage.setItem(`token`, urlToken)
        }
        const getUser = async () => {
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
        getUser()
    }, [])

    return (
        <UserContext.Provider value={userData}>
            <NavBarComponent setUserData={setUserData} />
            <div className='container px-4 md:mx-auto'>
                {children}
                <Footer />
            </div>
        </UserContext.Provider>
    )
}
