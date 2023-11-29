"use client"

import {FC} from "react";
import {BranchEvent} from "@/app/utils/types/models/branchEvent";
import {KeyedMutator} from "swr";
import Modal from "@/app/(site)/components/Modal";
import EditEventForm from "@/app/(site)/(external)/events/[id]/components/EditEventForm";

type Props = {
    event: BranchEvent,
    mutateEvent: KeyedMutator<BranchEvent | undefined>,
    isOpen: boolean,
    onClose: () => void,
}

const EditEventModal: FC<Props> = ({event, mutateEvent, isOpen, onClose}) => {
    return (
        <Modal
            title={`Edit ${event.name}`}
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
        >
            <EditEventForm
                event={event}
                mutateEvent={mutateEvent}
                onEdit={onClose}
            />
        </Modal>
    )
}

export default EditEventModal