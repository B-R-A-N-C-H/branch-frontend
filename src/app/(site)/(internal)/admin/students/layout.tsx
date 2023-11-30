import {FC, PropsWithChildren} from "react";
import StudentsProvider from "@/app/(site)/(internal)/admin/students/components/StudentsProvider";

const StudentManagementLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <StudentsProvider>
            {children}
        </StudentsProvider>
    )
}

export default StudentManagementLayout