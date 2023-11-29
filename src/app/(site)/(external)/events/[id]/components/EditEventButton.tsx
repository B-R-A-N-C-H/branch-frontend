"use client"

import {FC, Fragment, useState} from "react";
import {BranchEvent} from "@/app/utils/types/models/branchEvent";
import {KeyedMutator} from "swr";
import EditEventModal from "@/app/(site)/(external)/events/[id]/components/EditEventModal";
import {Button} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";

type Props = {
    event: BranchEvent,
    mutateEvent: KeyedMutator<BranchEvent | undefined>,
}

const EditEventButton: FC<Props> = ({event, mutateEvent}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <EditEventModal
                event={event}
                mutateEvent={mutateEvent}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                size="sm"
                isIconOnly
                color="primary"
                variant="flat"
                onPress={() => setModalOpen(true)}
                className="self-center"
            >
                <EditIcon/>
            </Button>
        </Fragment>
    )
}

export default EditEventButton