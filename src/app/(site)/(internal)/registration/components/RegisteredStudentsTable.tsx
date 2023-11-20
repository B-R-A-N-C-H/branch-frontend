"use client"

import {FC, Key, useCallback, useMemo} from "react";
import Table, {Column} from "@/app/(site)/components/Table";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import {Button, Chip, TableCell, TableRow} from "@nextui-org/react";
import TrashIcon from "@/app/(site)/components/icons/TrashIcon";
import CircledCheckIcon from "@/app/(site)/components/icons/CircledCheckIcon";
import CircledXIcon from "@/app/(site)/components/icons/CircledXIcon";
import PendingIcon from "@/app/(site)/components/icons/PendingIcon";

const RegisteredStudentsTable: FC = () => {
    const columns = useMemo<Column[]>(() => ([
        {
            key: "student_name",
            value: "Student Name"
        },
        {
            key: "student_grade_level",
            value: "Grade Level",
        },
        {
            key: "registration_status",
            value: "Status"
        },
        {
            key: "actions",
            value: "Actions"
        }
    ]), [])

    const fetchKeyValue = useCallback((item: RegistrationEntry, key: Key) => {
        switch (key) {
            case "student_name": {
                return `${item.childFirstName} ${item.childLastName}`
            }
            case "student_grade_level" : {
                return item.gradeLevel
            }
            case "registration_status": {
                return item.approved === null ? <Chip
                    variant="flat"
                    startContent={<PendingIcon width={16}/>}
                    classNames={{
                        content: "font-semibold"
                    }}
                >PENDING</Chip> : (
                    item.approved ?
                        <Chip
                            color="success"
                            variant="flat"
                            startContent={<CircledCheckIcon width={16}/>}
                            classNames={{
                                content: "font-semibold"
                            }}
                        >APPROVED</Chip> :
                        <Chip
                            variant="flat"
                            color="danger"
                            startContent={<CircledXIcon width={16}/>}
                            classNames={{
                                content: "font-semibold"
                            }}
                        >REJECTED</Chip>
                )
            }
            case "actions": {
                return (
                    <div className="flex gap-2">
                        <Button
                            variant="flat"
                            color="danger"
                            isIconOnly
                        >
                            <TrashIcon/>
                        </Button>
                    </div>
                )
            }
        }
    }, [])

    // TODO: Replace with students from API call
    const registeredStudents = useMemo<RegistrationEntry[]>(() => ([
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
    ]), [])

    return (
        <Table
            columns={columns}
            items={registeredStudents}
        >
            {(entry) => (
                <TableRow key={entry.id}>
                    {key => (
                        <TableCell className="capitalize">{fetchKeyValue(entry, key)}</TableCell>
                    )}
                </TableRow>
            )}
        </Table>
    )
}

export default RegisteredStudentsTable