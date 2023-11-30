"use client"

import {FC} from "react";
import Title from "@/app/(site)/components/Title";
import {Spacer} from "@nextui-org/react";
import StudentsTable from "@/app/(site)/(internal)/admin/students/components/StudentsTable";
import useProtectedRoute from "@/app/(site)/(internal)/admin/hooks/useProtectedRoute";
import {Role} from "@/app/utils/types/models/member";

const StudentManagementPage: FC = () => {
    useProtectedRoute(Role.TEACHER, Role.HEAD_TEACHER, Role.PRINCIPAL, Role.ADMIN)

    return (
        <main className="p-16">
            <Title className="text-5xl py-2">Manage Students</Title>
            <Spacer y={12}/>
            <StudentsTable/>
        </main>
    )
}

export default StudentManagementPage