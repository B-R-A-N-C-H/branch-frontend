import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const GraduationCapIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        xmlSpace="preserve"
        viewBox="0 0 32 32"
    >
        <g
            fill="none"
            className={clsx("self-center", className)}
            stroke={clsx(fill ?? "currentColor")}
        >
            <path
                d="M3 13v11"
                style={{
                    strokeWidth: 2,
                    strokeMiterlimit: 10,
                }}
            />
            <circle cx={3} cy={24} r={2}/>
            <path
                d="M16 8.833 3.5 13 16 17.167 28.5 13z"
                style={{
                    strokeWidth: 2,
                    strokeMiterlimit: 10,
                }}
            />
            <path
                d="M7 14.451V20c0 1.657 4.029 3 9 3s9-1.343 9-3v-5.549"
                style={{
                    strokeWidth: 2,
                    strokeMiterlimit: 10,
                }}
            />
        </g>
    </svg>
)
export default GraduationCapIcon
