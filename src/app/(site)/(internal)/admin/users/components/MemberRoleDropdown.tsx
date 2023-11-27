"use client"

import {FC, useState} from "react";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import Member, {Role} from "@/app/utils/types/models/member";
import {Session} from "next-auth";
import {useMembers} from "@/app/(site)/(internal)/admin/users/components/MembersProvider";
import {$delete, $patch, useAuthorizedSWRMutation, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import {EditMemberDto} from "@/app/utils/types/dto/member.dto";
import toast from "react-hot-toast";

type Props = {
    member: Member,
    session: Session | null
}

const EditMember = (memberId: string) =>
    useAuthorizedSWRMutation<EditMemberDto, Member>(`/members/${memberId}`, $patch<EditMemberDto, Member>)


const MemberRoleDropdown: FC<Props> = ({session, member}) => {
    const {
        members: {
            optimisticData: {
                editOptimisticData: editOptimisticMember
            }
        }
    } = useMembers()
    const {trigger: editMember, isMutating: isEditing} = EditMember(member.id)
    const [selectedKey, setSelectedKey] = useState<string>(member.role ?? "none")

    return (
        <Dropdown
            isDisabled={isEditing}
        >
            <DropdownTrigger>
                <Button
                    isLoading={isEditing}
                    className="w-64 capitalize"
                    color="primary"
                    variant="flat"
                >{selectedKey.toLowerCase().replaceAll("_", " ")}</Button>
            </DropdownTrigger>
            <DropdownMenu
                color="primary"
                variant="flat"
                selectionMode='single'
                selectedKeys={[selectedKey]}
                onSelectionChange={keys => setSelectedKey((Array.from(keys) as string[])[0])}
                onAction={async (key) => {
                    let role: Role | null | undefined = undefined
                    switch (key) {
                        case "none": {
                            role = null
                            break;
                        }
                        default: {
                            role = key as Role
                            break;
                        }
                    }

                    const edit = () => editMember({
                        body: {role}
                    }).then(member => {
                        if (member)
                            toast.success(`Successfully updated the role for ${member.firstName} ${member.lastName}!`)
                        return member
                    })

                    if (editOptimisticMember)
                        await editOptimisticMember(edit, {
                            ...member,
                            role: role ?? null
                        })
                }}
            >
                <DropdownItem key="none">No Role</DropdownItem>
                <DropdownItem key="TEACHER">Teacher</DropdownItem>
                <DropdownItem key="HEAD_TEACHER">Head Teacher</DropdownItem>
                {session?.user.role === Role.ADMIN ?
                    <DropdownItem key="PRINCIPAL">Principal</DropdownItem> :
                    <DropdownItem className="hidden"></DropdownItem>}
            </DropdownMenu>
        </Dropdown>
    )
}

export default MemberRoleDropdown