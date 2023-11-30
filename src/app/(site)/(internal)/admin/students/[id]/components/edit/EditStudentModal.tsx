import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import {Student} from "@/app/utils/types/models/student";
import {KeyedMutator} from "swr";
import EditStudentForm from "@/app/(site)/(internal)/admin/students/[id]/components/edit/EditStudentForm";

type Props = {
    student: Student,
    mutateStudent: KeyedMutator<Student | undefined>,
    isOpen: boolean,
    onClose: () => void
}

const EditStudentModal: FC<Props> = ({student, mutateStudent, isOpen, onClose}) => {
    return (
        <Modal
            title="Edit Student"
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
        >
            <EditStudentForm
                student={student}
                mutateStudent={mutateStudent}
                onEdit={onClose}
            />
        </Modal>
    )
}

export default EditStudentModal