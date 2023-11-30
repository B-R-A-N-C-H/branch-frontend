"use client"

import {FC, Fragment, useState} from "react";
import {Student} from "@/app/utils/types/models/student";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {$delete, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import {Button} from "@nextui-org/react";
import {DeleteIcon} from "@nextui-org/shared-icons";
import {useRouter} from "next/navigation";
import {useStudents} from "@/app/(site)/(internal)/admin/students/components/StudentsProvider";
import toast from "react-hot-toast";

type Props = {
    student: Student
}

const DeleteStudent = (studentId: string) =>
    useAuthorizedSWRMutationWithoutArgs<Student>(`/students/${studentId}`, $delete<Student>)

const DeleteStudentButton: FC<Props> = ({student}) => {
    const {contents: {optimisticData: {removeOptimisticData: removeOptimisticStudent}}} = useStudents()
    const {trigger: deleteStudent, isMutating: isDeleting} = DeleteStudent(student.id)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const router = useRouter()

    return (
        <Fragment>
            <ConfirmationModal
                title={`Delete ${student.firstName} ${student.lastName}`}
                size="2xl"
                isOpen={deleteModalOpen}
                onReject={() => setDeleteModalOpen(false)}
                onAccept={async () => {
                    const doDelete = () =>
                        deleteStudent()
                            .then(student => {
                                if (student) {
                                    toast.success(`Successfully deleted ${student.firstName} ${student.lastName}`)
                                    setDeleteModalOpen(false)
                                    router.push("/admin/students")
                                }

                                return student
                            })

                    if (removeOptimisticStudent)
                        await removeOptimisticStudent(doDelete, student)
                }}
                controlsDisabled={isDeleting}
            >
                <p>
                    Are you sure you want to delete <span
                    className="capitalize">{student.firstName.toLowerCase()} {student.lastName.toLowerCase()}</span>?
                </p>
            </ConfirmationModal>
            <Button
                isIconOnly
                variant="flat"
                color="danger"
                onPress={() => setDeleteModalOpen(true)}
                className="self-center"
            >
                <DeleteIcon/>
            </Button>
        </Fragment>
    )
}

export default DeleteStudentButton