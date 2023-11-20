import * as React from "react";
import {IconProps} from "./icon-utils";
import clsx from "clsx";

const TrashIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={clsx("self-center", className)}
        width={width ?? 16}
        height={height ?? width ?? 16}
        fill="none"
        viewBox="0 0 24 24"
    >
        <g fill={clsx(fill ?? "currentColor")}>
            <path
                d="M22 4.6H2c-.6 0-1 .4-1 1s.4 1 1 1h1.4v11.7c0 2.6 2 4.7 4.6 4.7h8c2.6 0 4.6-2.1 4.6-4.6V6.6H22c.6 0 1-.4 1-1s-.4-1-1-1ZM8.4 3h7.3c.6 0 1-.4 1-1s-.4-1-1-1H8.4c-.6 0-1 .4-1 1s.4 1 1 1Z"
            />
            <path
                d="M9.3 18.5c-.6 0-1-.4-1-1v-7.3c0-.6.4-1 1-1s1 .4 1 1v7.3c0 .5-.5 1-1 1ZM14.7 18.5c-.6 0-1-.4-1-1v-7.3c0-.6.4-1 1-1s1 .4 1 1v7.3c0 .5-.4 1-1 1Z"
            />
        </g>
    </svg>
);
export default TrashIcon;