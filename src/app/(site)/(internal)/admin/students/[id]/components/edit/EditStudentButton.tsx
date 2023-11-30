"use client"

import {FC, Fragment, useState} from "react";
import {Button} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";
import {Student} from "@/app/utils/types/models/student";
import {KeyedMutator} from "swr";
import EditStudentModal from "@/app/(site)/(internal)/admin/students/[id]/components/edit/EditStudentModal";

type Props = {
    student: Student,
    mutateStudent: KeyedMutator<Student | undefined>
}

const EditStudentButton: FC<Props> = ({student, mutateStudent}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <EditStudentModal
                student={student}
                mutateStudent={mutateStudent}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                isIconOnly
                className="self-center"
                color="primary"
                variant="flat"
                onPress={() => setModalOpen(true)}
            >
                <EditIcon />
            </Button>
        </Fragment>
    )
}

export default EditStudentButton