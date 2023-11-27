"use client"

import {FC} from "react";
import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import useMemberData from "@/app/hooks/useMemberData";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {memberHasRole} from "@/app/utils/member-utils";
import {Role} from "@/app/utils/types/models/member";
import GraduationCapIcon from "@/app/(site)/components/icons/GraduationCapIcon";
import ChatBubbleIcon from "@/app/(site)/components/icons/ChatBubbleIcon";
import SignOutIcon from "@/app/(site)/components/icons/SignOutIcon";
import CheckListIcon from "@/app/(site)/components/icons/CheckListIcon";
import CalendarStrokeIcon from "@/app/(site)/components/icons/CalendarStrokeIcon";
import UserIcon from "@/app/(site)/components/icons/UserIcon";

const UserProfile: FC = () => {
    const {data: member, isLoading: dataIsLoading} = useMemberData()

    return (
        <Dropdown
            showArrow
            className="border font-semibold border-primary/30 px-4 py-6 bg-gradient-to-b from-[#00ca8250] to-[#00947190] backdrop-blur-md"
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
                    <DropdownItem key="profile" color="secondary" isReadOnly>
                        <Link href="/" className="font-bold">
                            BRANCH
                        </Link>
                        <p className="font-bold text-xl">Hey <span className="capitalize">{member?.firstName}</span></p>
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection showDivider>
                    <DropdownItem
                        key="register"
                        color="secondary"
                        isReadOnly
                        startContent={<GraduationCapIcon/>}
                    >
                        <Link href="/registration">
                            Registration
                        </Link>
                    </DropdownItem>
                    {
                        memberHasRole(member, Role.PRINCIPAL) ? (
                                <DropdownItem
                                    key="manage_registrations"
                                    color="secondary"
                                    isReadOnly
                                    startContent={<CheckListIcon width={20}/>}
                                >
                                    <Link href="/admin/registrations">
                                        Manage Registrations
                                    </Link>
                                </DropdownItem>
                            )
                            : <DropdownItem className="hidden"></DropdownItem>
                    }
                    {
                        memberHasRole(member, Role.TEACHER) ? (
                                <DropdownItem
                                    key="manage_registrations"
                                    color="secondary"
                                    isReadOnly
                                    startContent={<ChatBubbleIcon width={20}/>}
                                >
                                    <Link href="/">
                                        Manage Announcements
                                    </Link>
                                </DropdownItem>
                            )
                            : <DropdownItem className="hidden"></DropdownItem>
                    }
                    {
                        memberHasRole(member, Role.HEAD_TEACHER) ? (
                                <DropdownItem
                                    key="manage_registrations"
                                    color="secondary"
                                    isReadOnly
                                    startContent={<CalendarStrokeIcon width={20}/>}
                                >
                                    <Link href="/">
                                        Manage Events
                                    </Link>
                                </DropdownItem>
                            )
                            : <DropdownItem className="hidden"></DropdownItem>
                    }
                    {
                        memberHasRole(member, Role.PRINCIPAL) ? (
                                <DropdownItem
                                    key="manage_registrations"
                                    color="secondary"
                                    isReadOnly
                                    startContent={<UserIcon width={20}/>}
                                >
                                    <Link href="/admin/users">
                                        Manage Users
                                    </Link>
                                </DropdownItem>
                            )
                            : <DropdownItem className="hidden"></DropdownItem>
                    }
                </DropdownSection>
                <DropdownItem
                    color="danger"
                    key="log_out"
                    startContent={<SignOutIcon width={20}/>}
                >
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default UserProfile