"use client"

import {api} from "@/app/utils/api-utils";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {NestResponse} from "@/app/utils/types/nest";

export async function fetcher<T>(url: string): Promise<NestResponse<T> | undefined> {
    try {
        return (await api.get<NestResponse<T>>(url)).data;
    } catch (e) {
        console.error(e)
    }
}

export async function fetcherWithArgs<A extends Record<string, string>, R>(url: string, args?: MutatorArgs<A>): Promise<NestResponse<R> | undefined> {
    try {
        if (args) {
            const filteredBody = {...args.arg.body}
            Object.keys(filteredBody).forEach(key => {
                if (!filteredBody[key])
                    delete filteredBody[key]
            })
            return (await api.get<NestResponse<R>>(url + `?${new URLSearchParams(filteredBody).toString()}`)).data;
        } else
            return (await api.get<NestResponse<R>>(url)).data;
    } catch (e) {
        console.error(e)
    }
}


export type MutatorArgs<T> = {
    arg: {
        body: T
    }
}

export const postMutator = <B, R>() => (url: string, {arg}: MutatorArgs<B>) => api.post<NestResponse<R>>(url, arg.body)
export const postMutatorWithoutArgs = <R, >() => (url: string) => api.post<NestResponse<R>>(url)
export const patchMutator = <B, R>() => (url: string, {arg}: MutatorArgs<B>) => api.patch<NestResponse<R>>(url, arg.body)

export const deleteMutatorWithArgs = <B extends Record<string, string> | undefined, R>() => (url: string, args?: MutatorArgs<B>) => api.delete<NestResponse<R>>(`${url}${args ? "?" + new URLSearchParams(args.arg.body).toString() : ""}`)
export const deleteMutator = <R, >() => (url: string) => api.delete<NestResponse<R>>(url)


export function handleAxiosError(error: any): undefined {
    if (!(error instanceof AxiosError)) {
        console.error(error)
        toast.error("Something went wrong!")
        return undefined;
    }

    toast.error(error.response?.data.message ?? error.response?.statusText ?? "Something went wrong!")
    return undefined
}