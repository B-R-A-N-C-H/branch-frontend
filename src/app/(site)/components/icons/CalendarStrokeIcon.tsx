import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const CalendarStrokeIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 16 16"
    >
        <path
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
            d="M13.5 2H13V.5a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5V2H4V.5a.5.5 0 0 0-.5-.5.5.5 0 0 0-.5.5V2h-.5A2.5 2.5 0 0 0 0 4.5v9A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 13.5 2Zm0 1A1.5 1.5 0 0 1 15 4.5V5h-2V3ZM12 3v2H4V3ZM2.5 3H3v2H1v-.5A1.5 1.5 0 0 1 2.5 3Zm11 12h-11A1.5 1.5 0 0 1 1 13.5V6h14v7.5a1.5 1.5 0 0 1-1.5 1.5ZM4 10.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm0 3a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm3-6a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm0 3a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm0 3a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm3-6a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm0 3a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm0 3a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm3-6a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Zm0 3a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5Z"
            data-name="Path 159"
        />
    </svg>
)
export default CalendarStrokeIcon
