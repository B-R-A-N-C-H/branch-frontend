"use client"

import {FC, useState} from "react";
import {Button, Spacer} from "@nextui-org/react";
import GraduationCapIcon from "@/app/(site)/components/icons/GraduationCapIcon";
import RegistrationEntriesTable from "@/app/(site)/(internal)/registration/components/RegistrationEntriesTable";
import Title from "@/app/(site)/components/Title";
import RegistrationModal from "@/app/(site)/(internal)/registration/components/RegistrationModal";
import {useRegistrationEntries} from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";
import {
    useRegistrationPeriods
} from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodProvider";

const RegistrationContainer: FC = () => {
    const {periods: {currentPeriod}} = useRegistrationPeriods()
    const {entries: {data: entryArr}} = useRegistrationEntries()
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div>
            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Button
                isDisabled={!currentPeriod}
                startContent={<GraduationCapIcon/>}
                color="primary"
                variant="shadow"
                size="lg"
                onPress={() => setModalOpen(true)}
            >Start Registration</Button>
            <Spacer y={12}/>
            <Title className="font-semibold">Your Registrations</Title>
            <Spacer y={4}/>
            <RegistrationEntriesTable entries={entryArr}/>
        </div>
    )
}

export default RegistrationContainer