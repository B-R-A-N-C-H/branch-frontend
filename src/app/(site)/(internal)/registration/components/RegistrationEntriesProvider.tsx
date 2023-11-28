"use client"

import {FC, PropsWithChildren, useCallback} from "react";
import {
    createDataContext,
    DataContextProps,
    DataContextState,
    OptimisticWorker
} from "@/app/utils/client/context-utils";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import useSWR, {KeyedMutator} from "swr";
import {$fetch} from "@/app/utils/swr-utils";
import {useSession} from "next-auth/react";
import {
    useRegistrationPeriods
} from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodProvider";

interface RegistrationEntriesContextProps extends DataContextProps {
    entries: DataContextState<RegistrationEntry[], RegistrationEntry>
}

const [RegistrationEntriesContext, hook] = createDataContext<RegistrationEntriesContextProps>("useRegistrationEntries must be used within a RegistrationEntriesProvider!")

type Props = {} & PropsWithChildren

const RegistrationEntriesProvider: FC<Props> = ({children}) => {
    const {data: session} = useSession()
    const {
        data: entries,
        isLoading: entriesLoading,
        mutate: mutateEntries
    } = useSWR(session && `/registration/entries`, $fetch<RegistrationEntry[]>(session?.backendTokens.accessToken))

    const addOptimisticEntry = useCallback<OptimisticWorker<RegistrationEntry>>(async (work, optimisticEntry, options) => {
        if (!entries)
            return
        const mutate = mutateEntries
        const doWork = async (): Promise<RegistrationEntry[]> => {
            const entry = await work()
            if (!entry)
                return entries
            return [...entries, entry]
        }

        await mutate(doWork, {
            optimisticData: [...entries, optimisticEntry],
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [entries, mutateEntries])

    const removeOptimisticEntry = useCallback<OptimisticWorker<RegistrationEntry>>(async (work, removedOptimisticDream) => {
        if (!entries)
            return
        const mutate = mutateEntries
        const doWork = async (): Promise<RegistrationEntry[]> => {
            const removedEntry = await work()
            if (!removedEntry)
                return entries
            return entries.filter(entry => entry.id !== removedEntry.id)
        }

        await mutate(doWork, {
            optimisticData: entries.filter(entry => entry.id !== removedOptimisticDream.id),
            rollbackOnError: true,
            revalidate: false,
        })
    }, [entries, mutateEntries])

    const editOptimisticEntry = useCallback<OptimisticWorker<RegistrationEntry>>(async (work, editedOptimisticDream, options) => {
        if (!entries)
            return

        const mutate = mutateEntries

        const doUpdate = (editedDream: RegistrationEntry): RegistrationEntry[] => {
            const newArr = entries.filter(dream => dream.id !== editedDream.id)
            newArr.push(editedDream)
            return newArr
        }

        const doWork = async (): Promise<RegistrationEntry[]> => {
            const updatedEntry = await work()
            if (!updatedEntry)
                return entries
            return doUpdate(updatedEntry)
        }

        await mutate(doWork, {
            optimisticData: doUpdate(editedOptimisticDream),
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [entries, mutateEntries])

    return (
        <RegistrationEntriesContext.Provider value={{
            entries: {
                loading: entriesLoading,
                data: entries ?? [],
                mutateData: entries ? (mutateEntries as KeyedMutator<RegistrationEntry[]>) : undefined,
                optimisticData: {
                    addOptimisticData: addOptimisticEntry,
                    removeOptimisticData: removeOptimisticEntry,
                    editOptimisticData: editOptimisticEntry
                }
            }
        }}>
            {children}
        </RegistrationEntriesContext.Provider>
    )
}

export default RegistrationEntriesProvider

export const useRegistrationEntries = hook