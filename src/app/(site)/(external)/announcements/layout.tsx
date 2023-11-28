import {FC, PropsWithChildren} from "react";
import AnnouncementsProvider from "@/app/(site)/(internal)/admin/announcements/components/AnnouncementsProvider";

const AnnouncementsLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <main className="p-16 phone:px-6">
            <AnnouncementsProvider>
                {children}
            </AnnouncementsProvider>
        </main>
    )
}

export default AnnouncementsLayout