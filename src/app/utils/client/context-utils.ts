"use client"
import {KeyedMutator, MutatorOptions} from "swr";
import {Context, createContext, Dispatch, SetStateAction, useContext} from "react";

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