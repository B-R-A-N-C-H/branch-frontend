"use client"

import {Context, createContext, Dispatch, SetStateAction, useContext} from "react";

function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
}

export function formatDate(date: Date, join: string = "/") {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join(join);
}

export function transformInputDate(dateString: string) {
    const [year, month, day] = dateString.split("-");
    const parsedDate: Date | undefined = year ? new Date() : undefined;
    parsedDate?.setFullYear(Number(year), Number(month) - 1, Number(day));
    return parsedDate
}

export type UseStateArray<T> = [T, Dispatch<SetStateAction<T>>]