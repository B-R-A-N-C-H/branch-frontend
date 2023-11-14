"use client"

import {api} from "@/app/utils/api/api-utils";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {NestResponse} from "@/app/utils/types/nest";


export type MutatorArgs<T> = {
    arg: {
        body: T
    }
}

export const $fetch = <R, >(token?: string) => (url: string): Promise<R | undefined> => api.get<NestResponse<R>>(url, token ? {
    headers: {
        authorization: getBearerString(token)
    }
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)

export const $fetchWithArgs = <A extends Record<string, string>, R>(token?: string) => async (url: string, args?: MutatorArgs<A>): Promise<R | undefined> => {
    if (args) {
        const filteredBody = {...args.arg.body}
        Object.keys(filteredBody).forEach(key => {
            if (!filteredBody[key])
                delete filteredBody[key]
        })

        return api.get<NestResponse<R>>(url + `?${new URLSearchParams(filteredBody).toString()}`, token ? {
            headers: {
                authorization: getBearerString(token)
            }
        } : undefined)
            .then(res => res.data as R)
            .catch(handleAxiosError)
    } else return $fetch<R>(token)(url)
}

export const $post = <B, R>(token?: string) => (url: string, {arg}: MutatorArgs<B>) => api.post<NestResponse<R>>(url, arg.body, token ? {
    headers: {
        authorization: getBearerString(token)
    }
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)

export const $postWithoutArgs = <R, >(token?: string) => (url: string) => api.post<NestResponse<R>>(url, undefined, token ? {
    headers: {
        authorization: getBearerString(token)
    }
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)

export const $patch = <B, R>(token?: string) => (url: string, {arg}: MutatorArgs<B>) => api.patch<NestResponse<R>>(url, arg.body, token ? {
    headers: {
        authorization: getBearerString(token)
    }
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)

export const $deleteWithArgs = <B extends Record<string, string> | undefined, R>(token?: string) => (url: string, args?: MutatorArgs<B>) => api.delete<NestResponse<R>>(`${url}${args ? "?" + new URLSearchParams(args.arg.body).toString() : ""}`, token ? {
    headers: {
        authorization: getBearerString(token)
    }
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)

export const $delete = <R, >(token?: string) => (url: string) => api.delete<NestResponse<R>>(url, token ? {
    headers: {
        authorization: getBearerString(token)
    }
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)


export const getBearerString = (token: string) => `Bearer ${token}`

export function handleAxiosError(error: any): undefined {
    if (!(error instanceof AxiosError)) {
        console.error(error)
        toast.error("Something went wrong!")
        return undefined;
    }

    toast.error(error.response?.data.message ?? error.response?.statusText ?? "Something went wrong!")
    return undefined
}