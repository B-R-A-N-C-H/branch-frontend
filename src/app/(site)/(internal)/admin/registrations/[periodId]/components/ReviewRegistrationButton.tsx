"use client"

import {FC, Fragment, useState} from "react";
import {Button, Tooltip} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import ReviewRegistrationModal
    from "@/app/(site)/(internal)/admin/registrations/[periodId]/components/ReviewRegistrationModal";

type Props = {
    entry: RegistrationEntry
}

const ReviewRegistrationButton: FC<Props> = ({entry}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <ReviewRegistrationModal
                entry={entry}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Tooltip
                closeDelay={100}
                color="secondary"
                shadow="md"
                showArrow
                content="Review Entry"
            >
                <Button
                    isIconOnly
                    color="secondary"
                    variant="flat"
                    onPress={() => setModalOpen(true)}
                >
                    <EditIcon/>
                </Button>
            </Tooltip>
        </Fragment>
    )
}

export default ReviewRegistrationButton