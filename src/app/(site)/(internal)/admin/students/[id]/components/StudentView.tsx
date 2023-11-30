"use client"

import {FC, Fragment, useEffect} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {Student} from "@/app/utils/types/models/student";
import {useRouter} from "next/navigation";
import {Button, Spacer, Spinner} from "@nextui-org/react";
import Title from "@/app/(site)/components/Title";
import {ArrowLeftIcon} from "@nextui-org/shared-icons";
import Link from "next/link";

type Props = {
    studentId: string,
    adminView?: boolean,
}

const FetchStudent = (studentId: string) =>
    useAuthorizedSWR<Student>(
        `/students/${studentId}`,
        $get<Student>
    )

const StudentView: FC<Props> = ({studentId, adminView}) => {
    const {data: student, isLoading: studentLoading, mutate: mutateStudent} = FetchStudent(studentId)
    const router = useRouter()

    useEffect(() => {
        if (!studentLoading && !student)
            router.replace(adminView ? "/admin/students" : "/children")
    }, [adminView, router, student, studentLoading])

    return (
        <Fragment>
            {(studentLoading || !student) ? <Spinner size="lg"/> : (
                <Fragment>
                    <Button
                        variant="light"
                        color="primary"
                        startContent={<ArrowLeftIcon/>}
                        as={Link}
                        size="lg"
                        href={adminView ? "/admin/students" : "/children"}
                    >
                        View All {adminView ? "Students" : "Children"}
                    </Button>
                    <Spacer y={6}/>
                    <Title
                        className="text-5xl py-2">{student.firstName.toLowerCase()} {student.lastName.toLowerCase()}</Title>
                    <Spacer y={12}/>
                    <Title>Contact Information</Title>
                    <Spacer y={12}/>
                    {adminView && (
                        <Title>Parent Information</Title>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default StudentView