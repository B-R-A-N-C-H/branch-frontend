"use client"

import {FC, Fragment, useState} from "react";
import EditAnnouncementModal from "@/app/(site)/(internal)/admin/announcements/components/view/EditAnnouncementModal";
import {Announcement} from "@/app/utils/types/models/announcement";
import {Button} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";
import {KeyedMutator} from "swr";

type Props = {
    announcement: Announcement
    mutateAnnouncement: KeyedMutator<Announcement | undefined>
}

const EditAnnouncementButton: FC<Props> = ({announcement, mutateAnnouncement}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <EditAnnouncementModal
                announcement={announcement}
                mutateAnnouncement={mutateAnnouncement}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                isIconOnly
                variant="flat"
                onPress={() => setModalOpen(true)}
                color="secondary"
                className="self-center"
            >
                <EditIcon />
            </Button>
        </Fragment>
    )
}

export default EditAnnouncementButton