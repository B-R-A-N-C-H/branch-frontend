"use client"

import {
    ArrayDataContextState,
    createDataContext,
    DataContextProps, useOptimisticArrayAdd, useOptimisticArrayEdit, useOptimisticArrayRemove
} from "@/app/utils/client/context-utils";
import {BranchEvent} from "@/app/utils/types/models/branchEvent"
import {FC, PropsWithChildren} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {KeyedMutator} from "swr";

interface ContextProps extends DataContextProps {
    contents: ArrayDataContextState<BranchEvent>
}

const [Context, hook] = createDataContext<ContextProps>("useEvents must be used in an EventsProvider")

const EventsProvider: FC<PropsWithChildren> = ({children}) => {
    const {data: events, isLoading: eventsLoading, mutate: mutateEvents} = useAuthorizedSWR<BranchEvent[]>('/communication/events', $get<BranchEvent[]>)

    const addOptimisticEvent = useOptimisticArrayAdd<BranchEvent>(events, mutateEvents)

    const removeOptimisticEvent = useOptimisticArrayRemove<BranchEvent>(events, mutateEvents, (arr, removed) => (
        arr.filter(event => event.id !== removed.id)
    ))

    const editOptimisticEvent = useOptimisticArrayEdit<BranchEvent>(events, mutateEvents, (arr, removed) => (
        arr.filter(event => event.id !== removed.id)
    ))

    return (
        <Context.Provider value={{
            contents: {
                data: events ?? [],
                loading: eventsLoading,
                mutateData: events ? (mutateEvents as KeyedMutator<BranchEvent[]>) : undefined,
                optimisticData: {
                    addOptimisticData: addOptimisticEvent,
                    removeOptimisticData: removeOptimisticEvent,
                    editOptimisticData: editOptimisticEvent
                }
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default EventsProvider

export const useEvents = hook