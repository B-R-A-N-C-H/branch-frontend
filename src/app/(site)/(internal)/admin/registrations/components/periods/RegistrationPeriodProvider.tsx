import {
    createDataContext,
    DataContextProps,
    DataContextState,
    OptimisticWorker
} from "@/app/utils/client/context-utils";
import {FC, PropsWithChildren, useCallback} from "react";
import {RegistrationPeriod} from "@/app/utils/types/models/registration";
import useSWR, {KeyedMutator} from "swr";
import {$fetch, useAuthorizedSWR} from "@/app/utils/swr-utils";

interface Context extends DataContextProps {
    periods: DataContextState<RegistrationPeriod[], RegistrationPeriod>
}

const [Context, hook] = createDataContext<Context>("useRegistrationPeriod must be used in a RegistrationPeriodProvider")

const RegistrationPeriodProvider: FC<PropsWithChildren> = ({children}) => {
    const {
        data: periods,
        isLoading: periodsLoading,
        mutate: mutatePeriods
    } = useAuthorizedSWR('/registration/periods', $fetch<RegistrationPeriod[]>)

    const addOptimisticPeriod = useCallback<OptimisticWorker<RegistrationPeriod>>(async (work, optimisticEntry, options) => {
        if (!periods)
            return
        const mutate = mutatePeriods
        const doWork = async (): Promise<RegistrationPeriod[]> => {
            const period = await work()
            if (!period)
                return periods
            return [...periods, period]
        }

        await mutate(doWork, {
            optimisticData: [...periods, optimisticEntry],
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [periods, mutatePeriods])

    const removeOptimisticPeriod = useCallback<OptimisticWorker<RegistrationPeriod>>(async (work, removedOptimisticDream) => {
        if (!periods)
            return
        const mutate = mutatePeriods
        const doWork = async (): Promise<RegistrationPeriod[]> => {
            const removedDream = await work()
            if (!removedDream)
                return periods
            return periods.filter(entry => entry.id !== removedDream.id)
        }

        await mutate(doWork, {
            optimisticData: periods.filter(entry => entry.id !== removedOptimisticDream.id),
            rollbackOnError: true,
            revalidate: false,
        })
    }, [periods, mutatePeriods])

    const editOptimisticPeriod = useCallback<OptimisticWorker<RegistrationPeriod>>(async (work, editedOptimisticDream, options) => {
        if (!periods)
            return

        const mutate = mutatePeriods

        const doUpdate = (editedDream: RegistrationPeriod): RegistrationPeriod[] => {
            const newArr = periods.filter(dream => dream.id !== editedDream.id)
            newArr.push(editedDream)
            return newArr
        }

        const doWork = async (): Promise<RegistrationPeriod[]> => {
            const updatedDream = await work()
            if (!updatedDream)
                return periods
            return doUpdate(updatedDream)
        }

        await mutate(doWork, {
            optimisticData: doUpdate(editedOptimisticDream),
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [periods, mutatePeriods])

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
                }
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default RegistrationPeriodProvider

export const useRegistrationPeriods = hook