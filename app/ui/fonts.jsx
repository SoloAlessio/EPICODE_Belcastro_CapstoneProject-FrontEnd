import { Poppins, Inter } from "next/font/google"

export const poppins = Poppins({
    style: "normal",
    weight: ["400", "700"],
    display: "swap",
    subsets: ["latin-ext"],
})

export const inter = Inter({
    style: "normal",
    weight: ["400", "700"],
    display: "swap",
    subsets: ["latin"],
})
