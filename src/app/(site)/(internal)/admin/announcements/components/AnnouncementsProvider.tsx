"use client"

import {
    createDataContext,
    DataContextProps,
    DataContextState,
    useOptimisticArrayAdd, useOptimisticArrayEdit, useOptimisticArrayRemove
} from "@/app/utils/client/context-utils";
import {Announcement} from "@/app/utils/types/models/announcement";
import {FC, PropsWithChildren} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {KeyedMutator} from "swr";

interface ContextProps extends DataContextProps {
    contents: DataContextState<Announcement[], Announcement>
}

const [Context, hook] = createDataContext<ContextProps>("useAnnouncements must be used in an AnnouncementsProvider!")

const AnnouncementsProvider: FC<PropsWithChildren> = ({children}) => {
    const {data: announcements, isLoading: announcementsLoading, mutate: mutateAnnouncements} = useAuthorizedSWR('/communication/announcements', $get<Announcement[]>)

    const addOptimisticAnnouncement = useOptimisticArrayAdd<Announcement>(announcements, mutateAnnouncements)

    const removeOptimisticAnnouncement = useOptimisticArrayRemove<Announcement>(announcements, mutateAnnouncements, (arr, removed) => (
        arr.filter(announcement => announcement.id !== removed.id)
    ))

    const editOptimisticAnnouncement = useOptimisticArrayEdit<Announcement>(announcements, mutateAnnouncements, (arr, removed) => (
        arr.filter(announcement => announcement.id !== removed.id)
    ))

    return (
        <Context.Provider value={{
            contents: {
                data: announcements ?? [],
                loading: announcementsLoading,
                mutateData: announcements ? (mutateAnnouncements as KeyedMutator<Announcement[]>) : undefined,
                optimisticData: {
                    addOptimisticData: addOptimisticAnnouncement,
                    removeOptimisticData: removeOptimisticAnnouncement,
                    editOptimisticData: editOptimisticAnnouncement
                }
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default AnnouncementsProvider

export const useAnnouncements = hook