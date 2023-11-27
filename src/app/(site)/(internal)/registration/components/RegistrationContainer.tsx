"use client"

import {FC, useState} from "react";
import {Button, Spacer} from "@nextui-org/react";
import GraduationCapIcon from "@/app/(site)/components/icons/GraduationCapIcon";
import RegisteredStudentsTable from "@/app/(site)/(internal)/registration/components/RegisteredStudentsTable";
import Title from "@/app/(site)/components/Title";
import RegistrationModal from "@/app/(site)/(internal)/registration/components/RegistrationModal";

const RegistrationContainer: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div>
            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                startContent={<GraduationCapIcon/>}
                color="primary"
                variant="shadow"
                size="lg"
                onPress={() => setModalOpen(true)}
            >Start Registration</Button>
            <Spacer y={12}/>
            <Title className="font-semibold">Your Registrations</Title>
            <Spacer y={4}/>
            <RegisteredStudentsTable entries={[
                // TODO: Replace with students from API call
                {
                    id: "12345",
                    approved: null,
                    memberId: "23456",
                    by: null,
                    gradeLevel: 1,
                    childFirstName: "John",
                    childLastName: "Doe",
                    childDateOfBirth: new Date().toString(),
                    streetName: "Somewhere",
                    city: "SomeCity",
                    parish: "Kingston",
                    emergencyContactNumber: "anumber",
                    secondaryEmergencyContactNumber: "anumber",
                    registrationPeriodId: "34456",
                    for: null,
                    createdAt: new Date().toString(),
                    updatedAt: new Date().toString(),
                },
            ]}/>
        </div>
    )
}

export default RegistrationContainer