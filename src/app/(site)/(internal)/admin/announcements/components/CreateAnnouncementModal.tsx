"use client"

import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import CreateAnnouncementForm from "@/app/(site)/(internal)/admin/announcements/components/CreateAnnouncementForm";

type Props = {
    isOpen: boolean,
    onClose: () => void
}

const CreateAnnouncementModal: FC<Props> = ({isOpen, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create A New Announcement"
            size="4xl"
        >
            <CreateAnnouncementForm onCreate={onClose} />
        </Modal>
    )
}

export default CreateAnnouncementModal