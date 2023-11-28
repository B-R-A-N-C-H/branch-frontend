"use client"

import {FC, Fragment, useState} from "react";
import {Button, Tooltip} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";
import EditRegistrationPeriodModal
    from "@/app/(site)/(internal)/admin/registrations/[periodId]/components/EditRegistrationPeriodModal";
import {RegistrationPeriod} from "@/app/utils/types/models/registration";
import {KeyedMutator} from "swr";

type Props = {
    period: RegistrationPeriod,
    mutatePeriod: KeyedMutator<RegistrationPeriod | undefined>
}

const EditRegistrationPeriodButton: FC<Props> = ({period, mutatePeriod}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <EditRegistrationPeriodModal
                mutatePeriod={mutatePeriod}
                period={period}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Tooltip
                shadow="md"
                showArrow
                content="Edit Period"
                color="secondary"
                closeDelay={100}
            >
                <Button
                    color="secondary"
                    isIconOnly
                    variant="light"
                    onPress={() => setModalOpen(true)}
                >
                    <EditIcon/>
                </Button>
            </Tooltip>
        </Fragment>
    )
}

export default EditRegistrationPeriodButton