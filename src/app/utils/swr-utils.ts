"use client"

import {api} from "@/app/utils/api/api-utils";
import {AxiosError, AxiosRequestConfig} from "axios";
import toast from "react-hot-toast";
import {NestResponse} from "@/app/utils/types/nest";
import useSWR from "swr";
import {useSession} from "next-auth/react";
import useSWRMutation from "swr/mutation";


export type MutatorArgs<T> = {
    arg: {
        body: T
    }
}

export const useAuthorizedSWR = <R>(url: string, cb: (token?: string, suppressErrorToast?: boolean) => (url: string) => Promise<R | undefined>, suppressErrorToast: boolean = false) => {
    const {data: session} = useSession()
    return useSWR(session && url, cb(session?.backendTokens.accessToken, suppressErrorToast))
}

export const useAuthorizedSWRMutation = <A, R>(url: string | undefined = undefined, cb: (token?: string, config?: AxiosRequestConfig) => (url: string, args: MutatorArgs<A>) => Promise<R | undefined>, config?: AxiosRequestConfig) => {
    const {data: session} = useSession()
    return useSWRMutation(session && url, cb(session?.backendTokens.accessToken, config))
}

export const useAuthorizedSWRMutationWithoutArgs = <R>(url: string, cb: (token?: string) => (url: string) => Promise<R | undefined>) => {
    const {data: session} = useSession()
    return useSWRMutation(session && url, cb(session?.backendTokens.accessToken))
}


export const $get = <R>(token?: string, suppressErrorToast: boolean = false) =>
    (url: string) => api.get<NestResponse<R>>(url, token ? {
        headers: {
            authorization: getBearerString(token)
        }
    } : undefined)
        .then(res => res.data as R)
        .catch(e => {
            if (!suppressErrorToast)
                return handleAxiosError(e)
            else console.error(e)
        })

export const $getWithArgs = <A extends Record<string, string>, R>(token?: string) => async (url: string, args?: MutatorArgs<A>): Promise<R | undefined> => {
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
    } else return $get<R>(token)(url)
}

export const $post = <B, R>(token?: string, config?: AxiosRequestConfig) => (url: string, {arg}: MutatorArgs<B>) => api.post<NestResponse<R>>(url, arg.body, token || config ? {
    ...config,
    headers: {
        authorization: token && getBearerString(token),
        ...config?.headers
    },
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)

export const $put = <B, R>(token?: string, config?: AxiosRequestConfig) => (url: string, {arg}: MutatorArgs<B>) => api.put<NestResponse<R>>(url, arg.body, token || config ? {
    ...config,
    headers: {
        authorization: token && getBearerString(token),
        ...config?.headers
    },
} : undefined)
    .then(res => res.data as R)
    .catch(handleAxiosError)

export const $postWithoutArgs = <R>(token?: string) => (url: string) => api.post<NestResponse<R>>(url, undefined, token ? {
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

export const $delete = <R>(token?: string) => (url: string) => api.delete<NestResponse<R>>(url, token ? {
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