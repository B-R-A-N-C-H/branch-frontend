"use client"
import {KeyedMutator, MutatorOptions} from "swr";
import {Context, createContext, Dispatch, SetStateAction, useCallback, useContext} from "react";

/**
 * `T - State Data Type`, `O - Optimistic Data Type`
 * The reason it's setup this way is due to the state data type and the optimistic data
 * type not being exactly the same.
 * For example, the state may be `T` while optimistic data may be `T | undefined`.
 *
 * Example
 * ```
 * type MyContextState = DataContextState<MyState[], MyState>
 * ```
 */
export type DataContextState<T, O> = {
    loading: boolean,
    data: T,
    mutateData?: KeyedMutator<T>,
    optimisticData: {
        addOptimisticData?: OptimisticWorker<O>,
        removeOptimisticData?: OptimisticWorker<O>,
        editOptimisticData?: OptimisticWorker<O>
    },
    [T: string]: any
}

export type OptimisticWorker<T> = (work: () => Promise<T | undefined | null>, data: T, options?: Omit<MutatorOptions, 'optimisticData'>) => Promise<void>

export const useOptimisticArrayAdd = <T>(currentArray: T[] | undefined, mutateArray: KeyedMutator<T[] | undefined>, options?: Omit<MutatorOptions, 'optimisticData'>) =>
    useCallback<OptimisticWorker<T>>(async (work, optimisticData) => {
        if (!currentArray)
            return
        const mutate = mutateArray
        const doWork = async (): Promise<T[]> => {
            const data = await work()
            if (!data)
                return currentArray
            return [...currentArray, data]
        }

        await mutate(doWork, {
            optimisticData: [...currentArray, optimisticData],
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [currentArray, mutateArray, options])

export const useOptimisticArrayRemove = <T>(currentArray: T[] | undefined, mutateArray: KeyedMutator<T[] | undefined>, removeLogic: (arr: T[], removedData: T) => T[], options?: Omit<MutatorOptions, 'optimisticData'>) =>
    useCallback<OptimisticWorker<T>>(async (work, optimisticData) => {
        if (!currentArray)
            return
        const mutate = mutateArray
        const doWork = async (): Promise<T[]> => {
            const removedData = await work()
            if (!removedData)
                return currentArray
            return removeLogic(currentArray, removedData)
        }

        await mutate(doWork, {
            optimisticData: removeLogic(currentArray, optimisticData),
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [currentArray, mutateArray, options, removeLogic])

export const useOptimisticArrayEdit = <T>(currentArray: T[] | undefined, mutateArray: KeyedMutator<T[] | undefined>, removeLogic: (arr: T[], removedData: T) => T[], options?: Omit<MutatorOptions, 'optimisticData'>) =>
    useCallback<OptimisticWorker<T>>(async (work, optimisticData) => {
        if (!currentArray)
            return

        const mutate = mutateArray

        const doUpdate = (editedData: T): T[] => {
            const newArr = removeLogic(currentArray, editedData)
            newArr.push(editedData)
            return newArr
        }

        const doWork = async (): Promise<T[]> => {
            const updatedData = await work()
            if (!updatedData)
                return currentArray
            return doUpdate(updatedData)
        }

        await mutate(doWork, {
            optimisticData: doUpdate(optimisticData),
            rollbackOnError: true,
            revalidate: false,
            ...options
        })
    }, [currentArray, mutateArray, options, removeLogic])

export interface DataContextProps {
    [K: string]: DataContextState<any, any>
}

export function createDataContext<T extends DataContextProps>(hookErr?: string): [Context<T | undefined>, () => T] {
    return createGenericContext<T>(hookErr)
}

export function createGenericContext<T>(hookErr?: string): [Context<T | undefined>, () => T] {
    const context = createContext<T | undefined>(undefined)
    const useHook = () => useGenericContextHook(context, hookErr)
    return [context, useHook]
}

export function useGenericContextHook<T>(context: Context<T | undefined>, hookErr?: string): T {
    const data = useContext(context)
    if (!data)
        throw new Error(hookErr ?? "This hook cannot be used here!")
    return data
}

export type UseStateArray<T> = [T, Dispatch<SetStateAction<T>>]