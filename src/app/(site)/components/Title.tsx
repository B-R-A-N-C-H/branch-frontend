import {FC, PropsWithChildren} from "react";

const Title: FC<PropsWithChildren> = ({children}) => {
    return (
        <h1 className="font-bold text-3xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            {children}
        </h1>
    )
}

export default Title