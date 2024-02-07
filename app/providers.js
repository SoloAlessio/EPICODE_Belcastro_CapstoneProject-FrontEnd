'use client'

import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

export default function Providers({ children }) {
    const theme = useTheme()
    return (
        <NextUIProvider>
            <NextThemesProvider
                attribute='class'
                defaultTheme={theme.systemTheme}
            >
                {children}
            </NextThemesProvider>
        </NextUIProvider>
    )
}
