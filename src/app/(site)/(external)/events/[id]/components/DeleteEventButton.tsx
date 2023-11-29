"use client"

import {FC, Fragment, useState} from "react";
import {BranchEvent} from "@/app/utils/types/models/branchEvent";
import {$delete, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {Button} from "@nextui-org/react";
import {DeleteIcon} from "@nextui-org/shared-icons";
import {useEvents} from "@/app/(site)/(external)/events/components/EventsProvider";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

type Props = {
    event: BranchEvent
}

const DeleteEvent = (eventId: string) =>
    useAuthorizedSWRMutationWithoutArgs<BranchEvent>(
        `/communication/events/${eventId}`,
        $delete<BranchEvent>
    )

const DeleteEventButton: FC<Props> = ({event}) => {
    const {contents: {optimisticData: {removeOptimisticData: removeOptimisticEvent}}} = useEvents()
    const {trigger: deleteEvent, isMutating: isDeleting} = DeleteEvent(event.id)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const router = useRouter()

    return (
        <Fragment>
            <ConfirmationModal
                title={`Delete ${event.name}`}
                isOpen={deleteModalOpen}
                controlsDisabled={isDeleting}
                onReject={() => setDeleteModalOpen(false)}
                onAccept={async () => {
                    const doDelete = () => deleteEvent()
                        .then(event => {
                            if (event) {
                                setDeleteModalOpen(false)
                                toast.success(`Successfully deleted ${event.name}!`)
                                router.replace("/events")
                            }
                            return event
                        })

                    if (removeOptimisticEvent)
                        await removeOptimisticEvent(doDelete, event)
                }}
            >
                Are you sure you want to delete this event?
            </ConfirmationModal>
            <Button
                isIconOnly
                variant="flat"
                color="danger"
                size="sm"
                onPress={() => setDeleteModalOpen(true)}
                className="self-center"
            >
                <DeleteIcon/>
            </Button>
        </Fragment>
    )
}

export default DeleteEventButton