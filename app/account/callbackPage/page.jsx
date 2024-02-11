import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
    const router = useRouter()

    useEffect(() => {
        const { token } = router.query
        if (token) {
            localStorage.setItem(`token`, token)
            router.push(`/dashboard`)
        } else {
            alert(`OPS, Something went wrong!`)
            router.push(`/`)
        }
    }, [router.query])
}
