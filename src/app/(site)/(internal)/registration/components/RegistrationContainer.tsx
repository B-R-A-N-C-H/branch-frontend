"use client"

import {FC} from "react";
import {Button, Spacer} from "@nextui-org/react";
import GraduationCapIcon from "@/app/(site)/components/icons/GraduationCapIcon";
import RegisteredStudentsTable from "@/app/(site)/(internal)/registration/components/RegisteredStudentsTable";
import Title from "@/app/(site)/components/Title";

const RegistrationContainer: FC = () => {
    return (
        <div>
            <Button
                startContent={<GraduationCapIcon/>}
                color="primary"
                variant="shadow"
                size="lg"
            >Start Registration</Button>
            <Spacer y={12}/>
            <Title className="font-semibold">Your Registrations</Title>
            <Spacer y={4} />
            <RegisteredStudentsTable />
        </div>
    )
}

export default RegistrationContainer