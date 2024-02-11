import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function UrlToken() {
    const searchParams = useSearchParams()
    const urlToken = searchParams.get(`token`)

    if (urlToken) {
        localStorage.setItem(`token`, urlToken)
    }
}
