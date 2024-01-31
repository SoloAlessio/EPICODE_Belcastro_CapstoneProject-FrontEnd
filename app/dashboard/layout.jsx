'use client'

import NavBarComponent from '../ui/components/NavBar.jsx'
import { useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext.jsx'

export default function Layout({ children }) {
    const [userData, setUserData] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token')
        const getUser = async () => {
            try {
                const res = await fetch(`${process.env.ENDPOINT}/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

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
            <NavBarComponent />
            {children}
        </UserContext.Provider>
    )
}
