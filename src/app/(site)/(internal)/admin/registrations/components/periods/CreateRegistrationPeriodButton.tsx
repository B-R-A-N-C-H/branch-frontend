"use client"

import {FC, Fragment, useState} from "react";
import {PlusFilledIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/react";
import CreateRegistrationPeriodModal
    from "@/app/(site)/(internal)/admin/registrations/components/periods/CreateRegistrationPeriodModal";

const CreateRegistrationPeriodButton: FC = () => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <CreateRegistrationPeriodModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                color="primary"
                variant="shadow"
                size="lg"
                startContent={<PlusFilledIcon/>}
                onPress={() => setModalOpen(true)}
            >
                Open A Period
            </Button>
        </Fragment>
    )
}

export default CreateRegistrationPeriodButton