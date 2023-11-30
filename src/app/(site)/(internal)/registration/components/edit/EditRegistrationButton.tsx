"use client"

import {FC, Fragment, useState} from "react";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import {KeyedMutator} from "swr";
import EditRegistrationModal from "@/app/(site)/(internal)/registration/components/edit/EditRegistrationModal";
import {Button} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";

type Props = {
    entry: RegistrationEntry,
}

const EditRegistrationButton: FC<Props> = ({entry}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <EditRegistrationModal
                entry={entry}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                isIconOnly
                color="primary"
                variant="flat"
                onPress={() => setModalOpen(true)}
            >
                <EditIcon/>
            </Button>
        </Fragment>
    )
}

export default EditRegistrationButton