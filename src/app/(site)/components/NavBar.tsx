"use client"

import {FC, Fragment} from "react";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import Link from "next/link";
import {useSession} from "next-auth/react";
import UserProfile from "@/app/(site)/(external)/auth/signin/components/UserProfile";
import {usePathname} from "next/navigation";
import clsx from "clsx";

const bannedRoutes = [
    "signin"
]

const NavBar: FC = () => {
    const {status: sessionStatus} = useSession()
    const pathName = usePathname()
    const isBannedRoute = bannedRoutes.some(routeName => pathName.includes(`/${routeName}`))

    return (
        <Navbar
            position="static"
            className={clsx(isBannedRoute && "hidden")}
            classNames={{
                base: "!bg-white/20 absolute",
                menu: "!bg-white/20 absolute",
                item: "text-white hover:text-primary ease-in-out duration-300",
                menuItem: "text-white hover:text-secondary ease-in-out duration-300"
            }}
        >
            <NavbarContent justify="start">
                <NavbarMenuToggle className="laptop-min:hidden text-white"/>
                <NavbarBrand>
                    <Link href="/" className="font-bold text-2xl text-white">
                        BRANCH
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="gap-16 laptop:hidden">
                <NavbarItem>
                    <Link href="/">
                        ABOUT
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/">
                        ANNOUNCEMENTS
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/">
                        EVENTS
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end" className="laptop:hidden">
                {
                    sessionStatus === 'unauthenticated' ? (
                        <Fragment>
                            <NavbarItem>
                                <Button
                                    variant="ghost"
                                    className="text-white hover:!text-primary hover:!bg-secondary hover:!border-primary"
                                    as={Link}
                                    href='/auth/signin?tab=signin'
                                >
                                    Log In
                                </Button>
                            </NavbarItem>
                            <NavbarItem>
                                <Button
                                    className="text-white hover:!text-primary hover:!bg-secondary hover:!border-primary"
                                    variant="ghost"
                                    as={Link}
                                    href='/auth/signin?tab=register'
                                >
                                    Sign Up
                                </Button>
                            </NavbarItem>
                        </Fragment>
                    ) : (
                        <NavbarItem>
                            <UserProfile/>
                        </NavbarItem>
                    )
                }
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href="/">
                        ABOUT
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="/">
                        ANNOUNCEMENTS
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="/">
                        EVENTS
                    </Link>
                </NavbarMenuItem>
                {
                    sessionStatus === 'unauthenticated' ? (
                        <Fragment>
                            <NavbarMenuItem>
                                <Button
                                    fullWidth
                                    variant="ghost"
                                    className="text-white hover:!text-primary hover:!bg-secondary hover:!border-primary"
                                    as={Link}
                                    href='/auth/signin?tab=signin'
                                >
                                    Log In
                                </Button>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Button
                                    fullWidth
                                    className="text-white hover:!text-primary hover:!bg-secondary hover:!border-primary"
                                    variant="ghost"
                                    as={Link}
                                    href='/auth/signin?tab=register'
                                >
                                    Sign Up
                                </Button>
                            </NavbarMenuItem>
                        </Fragment>
                    ) : (
                        <NavbarMenuItem>
                            <UserProfile/>
                        </NavbarMenuItem>
                    )
                }
            </NavbarMenu>
        </Navbar>
    )
}

export default NavBar