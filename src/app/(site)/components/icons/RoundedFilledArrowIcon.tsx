import * as React from "react"
import {IconProps} from "@/app/(site)/components/icons/icon-utils";
import clsx from "clsx";

const RoundedFilledArrowIcon = ({className, fill, width, height}: IconProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width ?? 24}
        height={height ?? width ?? 24}
        fill="none"
        viewBox="0 0 20 20"
    >
        <path
            className={clsx("self-center", className)}
            fill={clsx(fill ?? "currentColor")}
            d="M20 10c0 5.49-4.532 10-10.05 10A9.95 9.95 0 0 1 0 10.98h10.936l-3.153 3.236a.944.944 0 0 0 0 1.372c.197.196.394.294.69.294.295 0 .493-.098.69-.294l4.827-4.902a.945.945 0 0 0 0-1.372L9.163 4.412a.956.956 0 0 0-1.38 0 .945.945 0 0 0 0 1.372l3.153 3.236H0C.493 3.922 4.828 0 9.95 0 15.469 0 20 4.51 20 10Z"
        />
    </svg>
)
export default RoundedFilledArrowIcon
