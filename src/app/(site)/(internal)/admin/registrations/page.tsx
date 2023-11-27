"use client"

import {FC, Fragment} from "react";
import Title from "@/app/(site)/components/Title";
import {Spacer} from "@nextui-org/react";
import RegistrationEntriesProvider from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";
import useProtectedRoute from "@/app/(site)/(internal)/admin/hooks/useProtectedRoute";
import {Role} from "@/app/utils/types/models/member";
import RegistrationPeriodProvider
    from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodProvider";
import RegistrationPeriodContainer from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodContainer";

const RegistrationsManagementPage: FC = () => {
    useProtectedRoute(Role.HEAD_TEACHER, Role.PRINCIPAL, Role.ADMIN)

    return (
        <main className="p-16">
            <Title className="text-5xl py-1">Manage Registrations</Title>
            <Spacer y={12}/>
            <RegistrationPeriodProvider>
                <RegistrationPeriodContainer />
            </RegistrationPeriodProvider>
            {/*<RegistrationEntriesProvider>*/}
            {/*</RegistrationEntriesProvider>*/}
        </main>
    )
}

export default RegistrationsManagementPage