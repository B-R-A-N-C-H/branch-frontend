"use client"

import {
    createDataContext,
    DataContextProps,
    DataContextState,
    useOptimisticArrayAdd, useOptimisticArrayEdit, useOptimisticArrayRemove
} from "@/app/utils/client/context-utils";
import {FC, PropsWithChildren} from "react";
import {RegistrationPeriod} from "@/app/utils/types/models/registration";
import {KeyedMutator} from "swr";
import {$fetch, useAuthorizedSWR} from "@/app/utils/swr-utils";

interface Context extends DataContextProps {
    periods: DataContextState<RegistrationPeriod[], RegistrationPeriod> & {
        currentPeriod?: RegistrationPeriod
    }
}

const [Context, hook] = createDataContext<Context>("useRegistrationPeriod must be used in a RegistrationPeriodProvider")

const RegistrationPeriodProvider: FC<PropsWithChildren> = ({children}) => {
    const {
        data: periods,
        isLoading: periodsLoading,
        mutate: mutatePeriods
    } = useAuthorizedSWR('/registration/periods', $fetch<RegistrationPeriod[]>)

    const currentPeriod = periods?.find(period => {
        const today = new Date()
        return new Date(period.starts) <= today && new Date(period.ends) >= today
    })

    const addOptimisticPeriod = useOptimisticArrayAdd<RegistrationPeriod>(periods, mutatePeriods)

    const removeOptimisticPeriod = useOptimisticArrayRemove(periods, mutatePeriods,
        (arr, removed) => arr.filter(entry => entry.id !== removed.id)
    )

    const editOptimisticPeriod = useOptimisticArrayEdit(periods, mutatePeriods,
        (arr, removed) => arr.filter(entry => entry.id !== removed.id)
    )

    return (
        <Context.Provider value={{
            periods: {
                loading: periodsLoading,
                data: periods ?? [],
                mutateData: periods ? (mutatePeriods as KeyedMutator<RegistrationPeriod[]>) : undefined,
                optimisticData: {
                    addOptimisticData: addOptimisticPeriod,
                    removeOptimisticData: removeOptimisticPeriod,
                    editOptimisticData: editOptimisticPeriod
                },
                currentPeriod
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default RegistrationPeriodProvider

export const useRegistrationPeriods = hook