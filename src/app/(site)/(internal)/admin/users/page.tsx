"use client"

import {FC, Fragment, useMemo, useState} from "react";
import Title from "@/app/(site)/components/Title";
import useProtectedRoute from "@/app/(site)/(internal)/admin/hooks/useProtectedRoute";
import {Role} from "@/app/utils/types/models/member";
import {useMembers} from "@/app/(site)/(internal)/admin/users/components/MembersProvider";
import {Spacer, Spinner} from "@nextui-org/react";
import MemberCard from "@/app/(site)/(internal)/admin/users/components/MemberCard";
import Input from "@/app/(site)/components/inputs/Input";
import {SearchIcon} from "@nextui-org/shared-icons";

const UserManagementPage: FC = () => {
    useProtectedRoute(Role.PRINCIPAL, Role.ADMIN)
    const {members: {data, loading: membersLoading}} = useMembers()
    const [searchValue, setSearchValue] = useState<string>('')

    const memberCards = useMemo(() => data
        .filter(member => `${member.firstName.toLowerCase()} ${member.lastName.toLowerCase()}`.includes(searchValue.toLowerCase())
            || member.email.toLowerCase().includes(searchValue)
        )
        .sort((a, b) => `${a.firstName.toLowerCase()} ${a.lastName.toLowerCase()}`.localeCompare(`${b.firstName.toLowerCase()} ${b.lastName.toLowerCase()}`))
        .map(member => (
            <MemberCard key={member.id} member={member}/>
        )), [data, searchValue])

    return (
        <Fragment>
            <Title className="text-5xl phone:text-3xl py-2">Manage Users</Title>
            <Spacer y={6}/>
            <Input
                label="Search"
                placeholder="Enter the name or email of a user to search for"
                startContent={<SearchIcon/>}
                className="w-2/5 tablet:w-3/4 phone:w-full"
                value={searchValue}
                onValueChange={setSearchValue}
            />
            <Spacer y={6}/>
            <div className="rounded-2xl border border-primary p-6 grid grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 gap-4">
                {membersLoading ? <Spinner/> : (memberCards.length ? memberCards :
                    <Title className="col-span-2">No users found...</Title>)}
            </div>
        </Fragment>
    )
}

export default UserManagementPage