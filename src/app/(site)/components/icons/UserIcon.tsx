import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const UserIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
        viewBox="0 0 24 24"
    >
        <g
            className={clsx("self-center", className)}
            stroke={clsx(fill ?? "currentColor")}
        >
            <circle cx={12} cy={6} r={4} strokeWidth={1.5}/>
            <path
                strokeLinecap="round"
                strokeWidth={1.5}
                d="M19.997 18c.003-.164.003-.331.003-.5 0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
            />
        </g>
    </svg>
)
export default UserIcon
