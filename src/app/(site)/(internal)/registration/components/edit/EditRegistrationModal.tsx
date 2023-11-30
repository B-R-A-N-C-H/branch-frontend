"use client"

import {FC} from "react";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import {KeyedMutator} from "swr";
import Modal from "@/app/(site)/components/Modal";
import EditRegistrationForm from "@/app/(site)/(internal)/registration/components/edit/EditRegistrationForm";

type Props = {
    entry: RegistrationEntry,
    isOpen: boolean,
    onClose: () => void
}

const EditRegistrationModal: FC<Props> = ({entry, isOpen, onClose}) => {
    return (
        <Modal
            title="Edit Registration Entry"
            size="4xl"
            isOpen={isOpen}
            onClose={onClose}
        >
            <EditRegistrationForm
                entry={entry}
                onEdit={onClose}
            />
        </Modal>
    )
}

export default EditRegistrationModal