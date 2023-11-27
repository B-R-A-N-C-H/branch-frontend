import {FC, PropsWithChildren} from "react";
import MembersProvider from "@/app/(site)/(internal)/admin/users/components/MembersProvider";

const UserManagementLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <MembersProvider>
            <main className="p-16 phone:px-4">
                {children}
            </main>
        </MembersProvider>
    )
}

export default UserManagementLayout