import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const CircledXIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        viewBox="0 0 32 32"
    >
        <title>{"cross-circle"}</title>
        <path
            fill={clsx(fill ?? "currentColor")}
            fillRule="evenodd"
            d="M21.657 20.24a1.002 1.002 0 1 1-1.415 1.42l-4.236-4.24-4.266 4.27c-.394.39-1.032.39-1.426 0a1.015 1.015 0 0 1 0-1.43l4.266-4.27-4.236-4.23a1.006 1.006 0 0 1 0-1.42 1 1 0 0 1 1.414 0l4.236 4.24 4.298-4.3a1.014 1.014 0 0 1 1.425 0c.393.4.393 1.03 0 1.43l-4.297 4.3 4.237 4.23ZM16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0Z"
        />
    </svg>
)
export default CircledXIcon
