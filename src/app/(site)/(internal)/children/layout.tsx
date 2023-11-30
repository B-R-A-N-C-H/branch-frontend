import {FC, PropsWithChildren} from "react";
import StudentsProvider from "@/app/(site)/(internal)/admin/students/components/StudentsProvider";

const RegisteredChildrenLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <StudentsProvider>
            {children}
        </StudentsProvider>
    )
}

export default RegisteredChildrenLayout