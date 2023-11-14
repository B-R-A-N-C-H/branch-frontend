"use client"

import {FC} from "react";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import useMemberData from "@/app/hooks/useMemberData";
import Link from "next/link";
import {signOut} from "next-auth/react";

const UserProfile: FC = () => {
    const {data: member, isLoading: dataIsLoading} = useMemberData()

    return (
        <Dropdown
            showArrow
            closeOnSelect
            placement={"bottom"}
            offset={10}
        >
            <DropdownTrigger>
                <Avatar
                    color="primary"
                    isBordered
                    as="button"
                    className="transition-transform"
                    classNames={{
                        name: "capitalize font-semibold"
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                onAction={(key) => {
                    switch (key) {
                        case "log_out": {
                            signOut()
                            break;
                        }
                    }
                }}
            >
                <DropdownSection showDivider>
                    <DropdownItem key="profile" isReadOnly>
                        <Link href="/">
                            B.R.A.N.C.H
                        </Link>
                        <p className="font-bold text-xl">Hey <span className="capitalize">{member?.firstName}</span></p>
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem
                    color="danger"
                    key="log_out"
                >
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserProfile