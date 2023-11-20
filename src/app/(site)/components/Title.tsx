import {FC, PropsWithChildren} from "react";
import clsx from "clsx";

type Props = PropsWithChildren & {
    className?: string
}

const Title: FC<Props> = ({children, className}) => {
    return (
        <h1 className={clsx(
            "font-bold text-3xl capitalize h-fit text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary",
            className,
        )}>
            {children}
        </h1>
    )
}

export default Title