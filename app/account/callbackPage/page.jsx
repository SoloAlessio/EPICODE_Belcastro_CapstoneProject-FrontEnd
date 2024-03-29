'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    let url

    useEffect(() => {
        url = window.location.href
        console.log(url)
        const index = url.indexOf(`=`)

        const token = url.substring(index + 1)

        if (token) {
            localStorage.setItem(`token`, token)
            router.push(`/dashboard`)
        } else {
            alert(`OPS, Something went wrong!`)
            router.push(`/`)
        }
    }, [url])

    return (
        <div className='flex h-[700px] items-center justify-center'>
            <h1 className='text-center font-semibold text-default-500'>
                Loading...
            </h1>
        </div>
    )
}
