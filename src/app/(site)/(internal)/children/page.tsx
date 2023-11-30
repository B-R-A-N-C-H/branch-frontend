"use client"

import {FC} from "react";
import Title from "@/app/(site)/components/Title";
import {Spacer} from "@nextui-org/react";
import StudentsTable from "@/app/(site)/(internal)/admin/students/components/StudentsTable";

const RegisteredChildrenPage: FC = () => {
    return (
        <main className="p-16">
            <Title className="text-5xl py-2">Registered Children</Title>
            <Spacer y={12}/>
            <StudentsTable childrenOnly/>
        </main>
    )
}

export default RegisteredChildrenPage