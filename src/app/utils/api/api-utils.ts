import axios from "axios";

export type RouteContext<T extends { [K: string]: string } | unknown> = {
    params: T
}

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})