"use client"

import {FC, Fragment} from "react";
import Title from "@/app/(site)/components/Title";
import {Spacer} from "@nextui-org/react";
import CreateAnnouncementButton from "@/app/(site)/(internal)/admin/announcements/components/CreateAnnouncementButton";
import AnnouncementsView from "@/app/(site)/(internal)/admin/announcements/components/view/AnnouncementsView";

const AnnouncementManagementContainer: FC = () => {
    return (
        <Fragment>
            <Title className="text-5xl py-2">Manage Announcements</Title>
            <Spacer y={12}/>
            <CreateAnnouncementButton/>
            <Spacer y={12}/>
            <AnnouncementsView />
        </Fragment>
    )
}

export default AnnouncementManagementContainer