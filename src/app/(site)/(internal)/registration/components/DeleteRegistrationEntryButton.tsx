"use client"

import {FC, Fragment, useState} from "react";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import {$delete, useAuthorizedSWRMutation, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import {useRegistrationEntries} from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";
import toast from "react-hot-toast";
import TrashIcon from "@/app/(site)/components/icons/TrashIcon";
import {Button, Tooltip} from "@nextui-org/react";

type Props = {
    entry: RegistrationEntry
}

const DeleteEntry = (entryId: string) =>
    useAuthorizedSWRMutationWithoutArgs<RegistrationEntry>(`/registration/entries/${entryId}`, $delete<RegistrationEntry>)

const DeleteRegistrationEntryButton: FC<Props> = ({entry}) => {
    const {entries: {optimisticData: {removeOptimisticData: removeOptimisticEntry}}} = useRegistrationEntries()
    const {trigger: deleteEntry, isMutating: isDeleting} = DeleteEntry(entry.id)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    return (
        <Fragment>
            <ConfirmationModal
                title="Delete Registration Entry"
                size="2xl"
                isOpen={deleteModalOpen}
                onReject={() => setDeleteModalOpen(false)}
                onAccept={async () => {
                    const doDelete = () => deleteEntry()
                        .then(entry => {
                            if (entry)
                                toast.success(`Successfully deleted registration entry for ${entry.childFirstName} ${entry.childLastName}`)
                            return entry
                        })

                    if (removeOptimisticEntry)
                        await removeOptimisticEntry(doDelete, entry)
                }}
                controlsDisabled={isDeleting}
            >
                Are you sure you want to delete the registration entry for {entry.childFirstName} {entry.childLastName}?
            </ConfirmationModal>
            <Tooltip
                closeDelay={100}
                color="danger"
                shadow="md"
                showArrow
                content="Delete Entry"
            >
                <Button
                    variant="flat"
                    color="danger"
                    onPress={() => setDeleteModalOpen(true)}
                    isIconOnly
                >
                    <TrashIcon/>
                </Button>
            </Tooltip>
        </Fragment>
    )
}

export default DeleteRegistrationEntryButton