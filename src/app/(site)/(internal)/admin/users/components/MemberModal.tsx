"use client"

import {FC, Fragment, useMemo} from "react";
import Modal from "@/app/(site)/components/Modal";
import Member, {Role} from "@/app/utils/types/models/member";
import {useSession} from "next-auth/react";
import {Avatar, Button, Divider} from "@nextui-org/react";
import MemberRoleDropdown from "@/app/(site)/(internal)/admin/users/components/MemberRoleDropdown";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import MemberDeleteButton from "@/app/(site)/(internal)/admin/users/components/MemberDeleteButton";

type Props = {
    member: Member,
    isOpen: boolean,
    onClose: () => void,
}

const MemberModal: FC<Props> = ({isOpen, onClose, member}) => {
    const {data: session, status: sessionStatus} = useSession()

    const isSelf = useMemo(() =>
            sessionStatus !== 'loading' && session?.user.id === member.id,
        [member.id, session?.user.id, sessionStatus])

    const selfAdmin = useMemo(() =>
            session?.user.role === Role.ADMIN || session?.user.role === Role.PRINCIPAL,
        [session?.user.role])

    const canUpdate = useMemo(() => {
            if (member.role === Role.ADMIN)
                return false

            if (member.role === Role.PRINCIPAL && session?.user.role !== Role.ADMIN)
                return false
            else return !isSelf && selfAdmin
        }
        , [isSelf, member.role, selfAdmin, session?.user.role])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
        >
            <div className="flex gap-8">
                <Avatar
                    isBordered
                    color="primary"
                    className="self-center w-32 h-32"
                />
                <div className="self-center">
                    <p className="capitalize font-semibold self-center text-3xl">
                        {member.firstName.toLowerCase()} {member.lastName.toLowerCase()}{(session?.user.id === member.id) && " (You)"}
                    </p>
                    <p className="text-lg">{member.email}</p>
                </div>
            </div>
            {canUpdate && (
                <Fragment>
                    <Divider className="my-6"/>
                    <h3 className="font-bold text-2xl">Update Role</h3>
                    <MemberRoleDropdown member={member} session={session}/>
                </Fragment>
            )}
            {canUpdate && (
                <Fragment>
                    <Divider className="my-6"/>
                    <div className="flex justify-end">
                        <MemberDeleteButton member={member} onDelete={onClose}/>
                    </div>
                </Fragment>
            )}
        </Modal>
    )
}

export default MemberModal