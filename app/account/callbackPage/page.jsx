'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    useEffect(() => {
        const token = router.query.token ?? ''
        if (token) {
            console.log(token)
            localStorage.setItem(`token`, token)
            router.push(`/dashboard`)
        } else {
            alert(`OPS, Something went wrong!`)
            router.push(`/`)
        }
    }, [router.query])

    return (
        <div className='flex h-[700px] items-center justify-center'>
            <h1 className='text-center font-semibold text-default-500'>
                Loading...
            </h1>
        </div>
    )
}
