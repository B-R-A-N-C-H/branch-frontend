"use client"

import {FC, useMemo} from "react";
import {useAnnouncements} from "@/app/(site)/(internal)/admin/announcements/components/AnnouncementsProvider";
import AnnouncementCard from "@/app/(site)/(internal)/admin/announcements/components/view/AnnouncementCard";
import Title from "@/app/(site)/components/Title";
import {Spinner} from "@nextui-org/react";

const AnnouncementsView: FC = () => {
    const {contents: {data: announcements, loading: announcementsLoading}} = useAnnouncements()

    const announcementCards = useMemo(() => announcements
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map(announcement => (
                <AnnouncementCard key={announcement.id} announcement={announcement}/>
            ))
        , [announcements])

    return (
        <div className="border border-primary rounded-2xl w-3/4 tablet:w-full overflow-hidden">
            {announcementsLoading ? (
                <div className="p-12">
                    <Spinner size="lg" />
                </div>
            ) : (
                announcementCards.length ? announcementCards : <Title className="m-12">There are no announcements...</Title>
            )}
        </div>
    )
}

export default AnnouncementsView