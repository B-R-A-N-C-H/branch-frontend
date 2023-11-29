"use client"

import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import EditAnnouncementForm from "@/app/(site)/(internal)/admin/announcements/components/view/EditAnnouncementForm";
import {Announcement} from "@/app/utils/types/models/announcement";
import {KeyedMutator} from "swr";

type Props = {
    announcement: Announcement,
    mutateAnnouncement: KeyedMutator<Announcement | undefined>
    isOpen: boolean,
    onClose: () => void
}

const EditAnnouncementModal: FC<Props> = ({announcement, mutateAnnouncement, isOpen, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Announcement"
            size="4xl"
        >
            <EditAnnouncementForm
                announcement={announcement}
                mutateAnnouncement={mutateAnnouncement}
                onEdit={onClose}
            />
        </Modal>
    )
}

export default EditAnnouncementModal