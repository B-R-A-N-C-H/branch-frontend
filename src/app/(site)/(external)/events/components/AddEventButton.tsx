"use client"

import {FC, Fragment, useState} from "react";
import AddEventModal from "@/app/(site)/(external)/events/components/AddEventModal";
import {Button} from "@nextui-org/react";
import {PlusFilledIcon} from "@nextui-org/shared-icons";

const AddEventButton: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <AddEventModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                size="lg"
                color="primary"
                variant="shadow"
                startContent={<PlusFilledIcon/>}
                onPress={() => setModalOpen(true)}
            >
                Add New Event
            </Button>
        </Fragment>
    )
}

export default AddEventButton