"use client"

import React, {FC, PropsWithChildren} from "react";
import {SWRConfig} from "swr";
import {NextUIProvider} from "@nextui-org/react";
import NavBar from "@/app/(site)/components/NavBar";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import {Toaster} from "react-hot-toast";

type Props = PropsWithChildren & {
    session: Session | null
}

const Providers: FC<Props> = ({children, session}) => {
    return (
        <SWRConfig>
            <NextUIProvider>
                <SessionProvider session={session}>
                    <Toaster
                        position="top-center"
                        reverseOrder
                        toastOptions={{
                            className: `
                                        bg-light-secondary/90 border border-primary
                                        backdrop-blur-sm p-6
                                        min-w-96 max-w-[32rem]
                                        flex
                                        gap-4
                                        justify-between`,
                            style: {
                                borderRadius: "1.5rem",
                                padding: "1.5rem"
                            }
                        }}
                    />
                    <NavBar/>
                    {children}
                </SessionProvider>
            </NextUIProvider>
        </SWRConfig>
    )
}

export default Providers