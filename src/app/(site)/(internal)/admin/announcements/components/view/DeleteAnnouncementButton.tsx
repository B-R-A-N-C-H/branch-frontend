"use client"

import {FC, Fragment, useState} from "react";
import {Button} from "@nextui-org/react";
import {DeleteIcon} from "@nextui-org/shared-icons";
import {$delete, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import {Announcement} from "@/app/utils/types/models/announcement";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {useRouter} from "next/navigation";
import {useAnnouncements} from "@/app/(site)/(internal)/admin/announcements/components/AnnouncementsProvider";
import toast from "react-hot-toast";

const DeleteAnnouncement = (announcementId: string) =>
    useAuthorizedSWRMutationWithoutArgs<Announcement>(
        `/communication/announcements/${announcementId}`,
        $delete<Announcement>
    )

type Props = {
    announcement: Announcement
}

const DeleteAnnouncementButton: FC<Props> = ({announcement}) => {
    const {contents: {optimisticData: {removeOptimisticData: removeOptimisticAnnouncement}}} = useAnnouncements()
    const {trigger: deleteAnnouncement, isMutating: isDeleting} = DeleteAnnouncement(announcement.id)
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()

    return (
        <Fragment>
            <ConfirmationModal
                title="Delete Announcement"
                size="2xl"
                controlsDisabled={isDeleting}
                isOpen={modalOpen}
                onReject={() => setModalOpen(false)}
                onAccept={async () => {
                    const doDelete = () => deleteAnnouncement()
                        .then(announcement => {
                            if (announcement) {
                                toast.success("Successfully deleted that announcement!")
                                setModalOpen(false)
                            }

                            return announcement
                        })

                    if (removeOptimisticAnnouncement)
                        await removeOptimisticAnnouncement(doDelete, announcement)
                            .then(() => router.replace("/announcements"))
                }}
            >
                Are you sure you want to delete this announcement?
            </ConfirmationModal>
            <Button
                isIconOnly
                isLoading={isDeleting}
                isDisabled={isDeleting}
                variant="flat"
                color="danger"
                className="self-center"
                onPress={() => setModalOpen(true)}
            >
                <DeleteIcon/>
            </Button>
        </Fragment>

    )
}

export default DeleteAnnouncementButton