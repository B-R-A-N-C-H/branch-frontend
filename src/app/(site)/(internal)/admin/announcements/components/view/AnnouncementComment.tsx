"use client"

import {FC, useState} from "react";
import {Announcement, AnnouncementComment} from "@/app/utils/types/models/announcement";
import {KeyedMutator} from "swr";
import {Avatar, Button, Tooltip} from "@nextui-org/react";
import {$delete, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import {useSession} from "next-auth/react";
import {AnimatePresence, motion} from "framer-motion";
import TrashIcon from "@/app/(site)/components/icons/TrashIcon";
import {userHasRole} from "@/app/utils/member-utils";

type Props = {
    announcement: Announcement,
    comment: AnnouncementComment,
    mutateAnnouncement: KeyedMutator<Announcement | undefined>
}

const DeleteComment = (announcementId: string, commentId: string) =>
    useAuthorizedSWRMutationWithoutArgs<AnnouncementComment>(
        `/communication/announcements/${announcementId}/comments/${commentId}`,
        $delete<AnnouncementComment>
    )

const AnnouncementComment: FC<Props> = ({announcement, comment, mutateAnnouncement}) => {
    const {data: session} = useSession()
    const {trigger: deleteComment} = DeleteComment(comment.announcementId, comment.id)
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false)

    return (
        <div
            className="flex gap-4"
            onMouseEnter={() => setDeleteButtonVisible(true)}
            onMouseLeave={() => setDeleteButtonVisible(false)}
        >
            <Avatar
                isBordered
                color="secondary"
                className="flex-shrink-0"
            />
            <div className="flex-shrink-0">
                <p className="capitalize font-semibold text-sm">
                    {comment.commenter?.firstName} {comment.commenter?.lastName}
                    <span
                        className="font-normal text-subtext text-xs ml-2">{new Date(comment.createdAt).toLocaleString("en", {
                        dateStyle: "medium",
                        timeStyle: "short"
                    })}</span>
                </p>
                <p>{comment.content}</p>
            </div>
            <AnimatePresence>
                {(deleteButtonVisible && (userHasRole(session) || comment.commenterId === session?.user.id)) && (
                    <motion.div
                        className="w-full flex justify-end"
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                    >
                        <Tooltip
                            color="danger"
                            content="Delete Comment"
                            closeDelay={100}
                        >
                            <Button
                                variant="flat"
                                color="danger"
                                isIconOnly
                                onPress={() => {
                                    const doDelete = () => deleteComment()
                                        .then(comment => {
                                            const definedComment = comment!
                                            return {
                                                ...announcement,
                                                comments: announcement.comments?.filter(announcementComment => announcementComment.id !== definedComment.id)
                                            }
                                        })

                                    mutateAnnouncement(doDelete, {
                                        optimisticData: {
                                            ...announcement,
                                            comments: announcement.comments?.filter(announcementComment => announcementComment.id !== comment.id)
                                        },
                                        rollbackOnError: true
                                    })
                                }}
                            >
                                <TrashIcon/>
                            </Button>
                        </Tooltip>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AnnouncementComment