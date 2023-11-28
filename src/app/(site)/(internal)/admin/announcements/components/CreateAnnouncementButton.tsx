"use client"

import {FC, Fragment, useState} from "react";
import {Button} from "@nextui-org/react";
import {PlusFilledIcon} from "@nextui-org/shared-icons";
import CreateAnnouncementModal from "@/app/(site)/(internal)/admin/announcements/components/CreateAnnouncementModal";

const CreateAnnouncementButton: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <CreateAnnouncementModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                variant="shadow"
                color="primary"
                size="lg"
                startContent={<PlusFilledIcon/>}
                onPress={() => setModalOpen(true)}
            >
                New Announcement
            </Button>
        </Fragment>
    )
}

export default CreateAnnouncementButton