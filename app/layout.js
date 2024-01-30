import './globals.css'
import { poppins } from './ui/fonts'
import Providers from './providers'

export const metadata = {
    title: 'SoccerStats',
    description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body
                className={`bg-background text-foreground ${poppins.className}`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
