"use client"

import {FC} from "react";
import AnnouncementsProvider from "@/app/(site)/(internal)/admin/announcements/components/AnnouncementsProvider";
import useProtectedRoute from "@/app/(site)/(internal)/admin/hooks/useProtectedRoute";
import {Role} from "@/app/utils/types/models/member";
import AnnouncementManagementContainer
    from "@/app/(site)/(internal)/admin/announcements/components/AnnouncementManagementContainer";

const AnnouncementManagementPage: FC = () => {
    useProtectedRoute(Role.TEACHER, Role.HEAD_TEACHER, Role.PRINCIPAL, Role.ADMIN)

    return (
        <main className="p-16 phone:px-4">
            <AnnouncementsProvider>
                <AnnouncementManagementContainer/>
            </AnnouncementsProvider>
        </main>
    )
}

export default AnnouncementManagementPage