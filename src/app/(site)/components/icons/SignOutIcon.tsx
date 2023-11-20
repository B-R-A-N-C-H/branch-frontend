import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const SignOutIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        className="icon glyph"
        viewBox="0 0 24 24"
    >
        <g
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
        >
            <path
                d="m20.49 3.84-6-1.5A2 2 0 0 0 12 4.28V5h-2a2 2 0 0 0-2 2v1a1 1 0 0 0 2 0V7h2v10h-2v-1a1 1 0 0 0-2 0v1a2 2 0 0 0 2 2h2v.72a2 2 0 0 0 .77 1.57 2 2 0 0 0 1.23.43 2.12 2.12 0 0 0 .49-.06l6-1.5A2 2 0 0 0 22 18.22V5.78a2 2 0 0 0-1.51-1.94Z"/>
            <path
                d="M4.41 13H9a1 1 0 0 0 0-2H4.41l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1.15 1.15 0 0 0-.21.33.94.94 0 0 0 0 .76 1.15 1.15 0 0 0 .21.33l3 3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42Z"/>
        </g>
    </svg>
)
export default SignOutIcon