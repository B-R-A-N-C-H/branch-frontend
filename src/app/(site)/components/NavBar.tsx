"use client"

import {FC, Fragment} from "react";
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";

const NavBar: FC = () => {
    const {status: sessionStatus} = useSession()

    return (
        <Navbar>
            <NavbarContent>
                <NavbarBrand>
                    <Link href="/">
                        B.R.A.N.C.H
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent>
                {
                    sessionStatus === 'unauthenticated' ? (
                        <Fragment>
                            <NavbarItem>
                                <Button
                                    color="secondary"
                                    as={Link}
                                    href='/auth/signin?tab=signin'
                                >
                                    Log In
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button
                                    color="primary"
                                    variant="shadow"
                                    as={Link}
                                    href='/auth/signin?tab=register'
                                >
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button
                                onPress={() => signOut()}
                            >
                                Sign Out
                            </Button>
                        </Fragment>
                    )
                }
            </NavbarContent>
        </Navbar>
    )
}

export default NavBar