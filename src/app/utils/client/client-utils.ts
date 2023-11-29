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

export function formatDateTime(date: Date, join: string = "/") {
    const timeString = `T${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`

    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join(join) + timeString;
}

export function transformInputDate(dateString: string) {
    if (dateString.includes("T"))
        return transformInputDateTime(dateString)
    const [year, month, day] = dateString.split("-");
    const parsedDate: Date | undefined = year ? new Date() : undefined;
    parsedDate?.setFullYear(Number(year), Number(month) - 1, Number(day));
    return parsedDate
}

export function transformInputDateTime(dateString: string) {
    const [date, time] = dateString.split("T")
    const [year, month, day] = date.split("-");
    const parsedDate: Date | undefined = year ? new Date() : undefined;
    parsedDate?.setFullYear(Number(year), Number(month) - 1, Number(day));

    const [hoursString, minutesString] = time.split(":")
    parsedDate?.setHours(Number(hoursString), Number(minutesString), 0, 0)
    return parsedDate
}

export type UseStateArray<T> = [T, Dispatch<SetStateAction<T>>]