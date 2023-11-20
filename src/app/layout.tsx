import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.scss'
import Providers from "@/app/(site)/components/providers/Providers";
import {PropsWithChildren} from "react";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import clsx from "clsx";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'B.R.A.N.C.H',
    description: 'The Basic School Registration, Announcement and Communication Hub',
}

export default async function RootLayout({children}: PropsWithChildren) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
        <body className={clsx(inter.className, "overflow-x-hidden")}>
        <Providers session={session}>
            {children}
        </Providers>
        </body>
        </html>
    )
}
