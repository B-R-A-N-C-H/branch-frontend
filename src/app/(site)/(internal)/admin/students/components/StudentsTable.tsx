"use client"

import {FC, Fragment, Key, useMemo, useState} from "react";
import Table, {Column} from "@/app/(site)/components/Table";
import {useStudents} from "@/app/(site)/(internal)/admin/students/components/StudentsProvider";
import {Button, Spacer, TableCell, TableRow, Tooltip} from "@nextui-org/react";
import {Student} from "@/app/utils/types/models/student";
import Input from "@/app/(site)/components/inputs/Input";
import {EyeIcon, SearchIcon} from "@nextui-org/shared-icons";
import Link from "next/link";

const columns: Column[] = [
    {
        key: "student_name",
        value: "Student Name"
    },
    {
        key: "student_grade_level",
        value: "Grade Level",
    },
    {
        key: "date_registered",
        value: "Date Registered"
    },
    {
        key: "actions",
        value: "Actions"
    }
]

const fetchKeyValue = (student: Student, key: Key) => {
    switch (key) {
        case "student_name": {
            return <p className="capitalize">{student.firstName.toLowerCase()} {student.lastName.toLowerCase()}</p>
        }
        case "student_grade_level": {
            return student.gradeLevel
        }
        case "date_registered": {
            return new Date(student.createdAt).toLocaleDateString("en", {
                dateStyle: "medium"
            })
        }
        case "actions": {
            return (
                <div className="flex gap-2">
                    <Tooltip
                        color="primary"
                        content={`View ${student.firstName}'s Details`}
                        closeDelay={100}
                        classNames={{
                            content: 'capitalize'
                        }}
                    >
                        <Button
                            isIconOnly
                            color="primary"
                            variant="flat"
                            as={Link}
                            href={`/admin/students/${student.id}`}
                        >
                            <EyeIcon/>
                        </Button>
                    </Tooltip>
                </div>
            )
        }
    }
}

const StudentsTable: FC = () => {
    const {contents: {data: students, loading: studentsLoading}} = useStudents()
    const [search, setSearch] = useState<string>()

    const visibleStudents = useMemo(() => students
            .filter(student => search ? `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(search.toLowerCase()) : true
            )
        , [search, students])

    return (
        <Fragment>
            <Input
                label="Search"
                startContent={<SearchIcon/>}
                className="w-2/5 tablet:w-3/4 phone:w-full"
                value={search}
                onValueChange={setSearch}
            />
            <Spacer y={6}/>
            <Table
                columns={columns}
                items={visibleStudents}
                isLoading={studentsLoading}
                emptyContent="There are no registered students..."
            >
                {student => (
                    <TableRow key={student.id}>
                        {key => (
                            <TableCell>{fetchKeyValue(student, key)}</TableCell>
                        )}
                    </TableRow>
                )}
            </Table>
        </Fragment>
    )
}

export default StudentsTable