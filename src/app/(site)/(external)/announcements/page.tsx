"use client"

import {FC, Fragment} from "react";
import Title from "@/app/(site)/components/Title";
import AnnouncementsView from "@/app/(site)/(internal)/admin/announcements/components/view/AnnouncementsView";
import {useSession} from "next-auth/react";
import {Role} from "@/app/utils/types/models/member";
import {Spacer} from "@nextui-org/react";
import CreateAnnouncementButton from "@/app/(site)/(internal)/admin/announcements/components/CreateAnnouncementButton";

const AnnouncementsPage: FC = () => {
    const {data: session} = useSession()

    return (
        <Fragment>
            <Title className="text-5xl">Announcements</Title>
            {(session && session.user.role !== null && ([Role.ADMIN, Role.PRINCIPAL, Role.HEAD_TEACHER, Role.TEACHER] as Role[]).includes(session.user.role)) && (
                <Fragment>
                    <Spacer y={12}/>
                    <CreateAnnouncementButton/>
                </Fragment>
            )}
            <Spacer y={12}/>
            <AnnouncementsView/>
        </Fragment>
    )
}

export default AnnouncementsPage