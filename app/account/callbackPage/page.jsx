'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        const { token } = router.query
        if (token) {
            console.log(token)
            localStorage.setItem(`token`, token)
            router.push(`/dashboard`)
        } else {
            alert(`OPS, Something went wrong!`)
            router.push(`/`)
        }
    }, [router.query])

    return <div>{localStorage.getItem(`token`) || `No Token`}</div>
}