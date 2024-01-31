'use client'

export default function Layout({ children }) {
    return (
        <>
            <NavBarComponent />
            {children}
        </>
    )
}
