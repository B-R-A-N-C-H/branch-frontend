"use client"

import {FC, Fragment, useEffect, useMemo} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {Announcement} from "@/app/utils/types/models/announcement";
import {useRouter} from "next/navigation";
import Title from "@/app/(site)/components/Title";
import {Button, Spacer, Spinner} from "@nextui-org/react";
import AnnouncementCommentForm
    from "@/app/(site)/(internal)/admin/announcements/components/view/AnnouncementCommentForm";
import {ArrowLeftIcon} from "@nextui-org/shared-icons";
import Link from "next/link";
import {Divider} from "@nextui-org/divider";
import AnnouncementComment from "@/app/(site)/(internal)/admin/announcements/components/view/AnnouncementComment";

const FetchAnnouncement = (announcementId: string) =>
    useAuthorizedSWR<Announcement>(
        `/communication/announcements/${announcementId}`,
        $get<Announcement>
    )

type Props = {
    announcementId: string,
}

const AnnouncementView: FC<Props> = ({announcementId}) => {
    const {data: announcement, isLoading: announcementLoading, mutate: mutateAnnouncement} = FetchAnnouncement(announcementId)
    const router = useRouter()

    useEffect(() => {
        if (!announcementLoading && !announcement)
            router.push("/announcements")
    }, [announcement, announcementLoading, router])

    const comments = useMemo(() => announcement?.comments
        ?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        ?.map(comment => (
            <AnnouncementComment
                key={comment.id}
                announcement={announcement}
                comment={comment}
                mutateAnnouncement={mutateAnnouncement}
            />
        )), [announcement, mutateAnnouncement])

    return (
        <Fragment>
            {(announcementLoading || !announcement) ? (<Spinner size="lg"/>) : (
                <Fragment>
                    <Button
                        variant="light"
                        color="primary"
                        startContent={<ArrowLeftIcon/>}
                        as={Link}
                        href="/announcements"
                    >
                        View All Announcements
                    </Button>
                    <Spacer y={8}/>
                    <article className="border border-primary rounded-2xl px-6 py-12 whitespace-pre-wrap">
                        <Title className="text-5xl">{announcement.title}</Title>
                        <Spacer y={4}/>
                        <h3 className="font-semibold text-secondary text-xl">Author: {announcement.announcer?.firstName} {announcement?.announcer?.lastName}</h3>
                        <h6 className="text-xs text-subtext">{new Date(announcement!.createdAt).toLocaleString("en", {
                            dateStyle: "full",
                            timeStyle: "short"
                        })}</h6>
                        <Spacer y={12}/>
                        {announcement?.content}
                        {announcement?.commentsEnabled && (
                            <Fragment>
                                <Divider className="my-12"/>
                                <Title>Comments</Title>
                                <Spacer y={6}/>
                                <div className="w-1/2 tablet:w-3/4 phone:w-full">
                                    <AnnouncementCommentForm
                                        announcement={announcement}
                                        mutateAnnouncement={mutateAnnouncement}
                                    />
                                </div>
                                <Spacer y={6}/>
                                <div className="p-6 border border-primary rounded-2xl space-y-6">
                                    {announcement.comments?.length ? comments :
                                        <h3 className="text-xl text-subtext/50">There are no comments... Be the
                                            first!</h3>}
                                </div>
                            </Fragment>
                        )}
                    </article>
                </Fragment>
            )}
        </Fragment>
    )
}

export default AnnouncementView