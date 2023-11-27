"use client"

import {FC, Fragment, useState} from "react";
import Member from "@/app/utils/types/models/member";
import {Button} from "@nextui-org/react";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {$delete, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import toast from "react-hot-toast";
import {useMembers} from "@/app/(site)/(internal)/admin/users/components/MembersProvider";

type Props = {
    member: Member,
    onDelete: () => void,
}

const DeleteMember = (memberId: string) =>
    useAuthorizedSWRMutationWithoutArgs<Member>(`/members/${memberId}`, $delete<Member>)

const MemberDeleteButton: FC<Props> = ({member, onDelete}) => {
    const {members: {optimisticData: {removeOptimisticData: removeOptimisticMember}}} = useMembers()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const {trigger: deleteMember, isMutating: isDeleting} = DeleteMember(member.id)

    return (
        <Fragment>
            <ConfirmationModal
                title={`Delete ${member.firstName.toLowerCase()} ${member.lastName.toLowerCase()}`}
                isOpen={deleteModalOpen}
                onReject={() => setDeleteModalOpen(false)}
                onAccept={async () => {
                    const doDelete = () => deleteMember()
                        .then(member => {
                            if (member) {
                                toast.success(`Successfully deleted ${member.firstName.toLowerCase()} ${member.lastName.toLowerCase()}!`)
                                onDelete()
                            }
                            return member
                        })
                    if (removeOptimisticMember)
                        await removeOptimisticMember(doDelete, member)
                }}
            >
                <p>Are you sure you want to delete <span
                    className="capitalize">{member.firstName.toLowerCase()} {member.lastName.toLowerCase()}</span>?</p>
            </ConfirmationModal>
            <Button
                isLoading={isDeleting}
                isDisabled={isDeleting}
                onPress={() => setDeleteModalOpen(true)}
                variant="shadow"
                color="danger"
            >Delete Member</Button>
        </Fragment>
    )
}

export default MemberDeleteButton