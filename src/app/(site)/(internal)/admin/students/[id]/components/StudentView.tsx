"use client"

import {FC, Fragment, useEffect} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {Student} from "@/app/utils/types/models/student";
import {useRouter} from "next/navigation";
import {Button, Card, CardBody, Spacer, Spinner} from "@nextui-org/react";
import Title from "@/app/(site)/components/Title";
import {ArrowLeftIcon} from "@nextui-org/shared-icons";
import Link from "next/link";
import {Divider} from "@nextui-org/divider";
import {useSession} from "next-auth/react";
import DeleteStudentButton from "@/app/(site)/(internal)/admin/students/[id]/components/DeleteStudentButton";

type Props = {
    studentId: string,
    adminView?: boolean,
}

const FetchStudent = (studentId: string) =>
    useAuthorizedSWR<Student>(
        `/students/${studentId}`,
        $get<Student>, true
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
                    <div className="flex gap-4">
                        <div>
                            <Title className="text-5xl py-2">
                                {student.firstName.toLowerCase()} {student.lastName.toLowerCase()}
                            </Title>
                            <p className="text-secondary">Date of Birth: {new Date(student.childDateOfBirth)
                                .toLocaleDateString("en", {
                                dateStyle: "medium"
                            })}</p>
                        </div>
                        {adminView && <DeleteStudentButton student={student} />}
                    </div>
                    <Spacer y={12}/>
                    <Title>Contact Information</Title>
                    <Spacer y={6}/>
                    <Card
                        className="p-6 w-1/2"
                    >
                        <CardBody>
                            <div>
                                <Title className="text-xl">Street</Title>
                                <p>{student.streetName}</p>
                            </div>
                            <Spacer y={2}/>
                            <div className="flex gap-4">
                                <div>
                                    <Title className="text-xl">City</Title>
                                    <p>{student.city}</p>
                                </div>
                                <div>
                                    <Title className="text-xl">Parish</Title>
                                    <p>{student.parish}</p>
                                </div>
                            </div>
                            <Divider className="my-6"/>
                            <div>
                                <Title className="text-xl">Primary Emergency Contact</Title>
                                <p>{student.emergencyContactNumber}</p>
                            </div>
                            <Spacer y={6}/>
                            <div>
                                <Title className="text-xl">Secondary Emergency Contact</Title>
                                <p>{student.secondaryEmergencyContactNumber}</p>
                            </div>
                        </CardBody>
                    </Card>
                    <Spacer y={12}/>
                    {adminView && (
                        <Fragment>
                            <Title>Parent Information</Title>
                            <Spacer y={6}/>
                            <Card
                                className="p-6 w-1/2"
                            >
                                <CardBody>
                                    <div>
                                        <Title className="text-xl">Name</Title>
                                        <p className="capitalize">{student.parent.firstName.toLowerCase()} {student.parent.lastName.toLowerCase()}</p>
                                    </div>
                                    <Spacer y={6}/>
                                    <div>
                                        <Title className="text-xl">Email</Title>
                                        <p>{student.parent.email.toLowerCase()}</p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default StudentView