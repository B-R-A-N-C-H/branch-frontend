import {FC} from "react";
import Modal from "@/app/(site)/components/Modal";
import AddEventForm from "@/app/(site)/(external)/events/components/AddEventForm";

type Props = {
    isOpen: boolean,
    onClose: () => void,
}

const AddEventModal: FC<Props> = ({isOpen, onClose}) => {
    return (
        <Modal
            title="Create New Event"
            size="4xl"
            isOpen={isOpen}
            onClose={onClose}
        >
            <AddEventForm onCreate={onClose}/>
        </Modal>
    )
}

export default AddEventModal