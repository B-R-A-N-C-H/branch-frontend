"use client"

import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import CreateRegistrationPeriodForm
    from "@/app/(site)/(internal)/admin/registrations/components/periods/CreateRegistrationPeriodForm";

type Props = {
    isOpen: boolean,
    onClose: () => void,
}

const CreateRegistrationPeriodModal: FC<Props> = ({isOpen, onClose}) => {
    return (
        <Modal
            title="Open New Registration Period"
            size="3xl"
            isOpen={isOpen}
            onClose={onClose}
        >
            <CreateRegistrationPeriodForm onCreate={onClose}/>
        </Modal>
    )
}

export default CreateRegistrationPeriodModal