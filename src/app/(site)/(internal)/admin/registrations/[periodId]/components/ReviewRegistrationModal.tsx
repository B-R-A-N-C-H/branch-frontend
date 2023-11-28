"use client"

import {FC, PropsWithChildren, useCallback} from "react";
import Modal from "@/app/(site)/components/Modal";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import Title from "@/app/(site)/components/Title";
import {Button, Spacer} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {CheckIcon, CloseIcon} from "@nextui-org/shared-icons";
import {$post, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {ReviewRegistrationDto} from "@/app/utils/types/dto/registration.dto";
import {useRegistrationEntries} from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";
import toast from "react-hot-toast";

type Props = {
    entry: RegistrationEntry,
    isOpen: boolean,
    onClose: () => void,
}

const ReviewRegistrationEntry = (entryId: string) =>
    useAuthorizedSWRMutation<ReviewRegistrationDto, RegistrationEntry>(`/registration/entries/${entryId}/review`, $post<ReviewRegistrationDto, RegistrationEntry>)

const ReviewRegistrationModal: FC<Props> = ({entry, isOpen, onClose}) => {
    const {entries: {optimisticData: {editOptimisticData: editOptimisticEntry}}} = useRegistrationEntries()
    const {trigger: review, isMutating: isReviewing} = ReviewRegistrationEntry(entry.id)

    const doReview = useCallback(async (status: boolean) => {
        const work = () => review({
            body: {approved: status}
        }).then(entry => {
            if (entry) {
                toast.success(`You have successfully ${status ? "approved" : "rejected"} the registration for ${entry.childFirstName} ${entry.childLastName}!`)
                onClose()
            }
            return entry
        })

        if (editOptimisticEntry)
            await editOptimisticEntry(work, {
                ...entry,
                approved: status
            })
    }, [editOptimisticEntry, entry, onClose, review])

    return (
        <Modal
            title={`Registration Entry For ${entry.childFirstName} ${entry.childLastName}`}
            size="4xl"
            isOpen={isOpen}
            onClose={onClose}
        >
            <section className="space-y-6">
                <Title>General Information</Title>
                <div className="grid grid-cols-2 phone:grid-cols-1 gap-4">
                    <DataContainer label="Child First Name">
                        {entry.childFirstName}
                    </DataContainer>
                    <DataContainer label="Child Last Name">
                        {entry.childLastName}
                    </DataContainer>
                </div>
                <DataContainer label="Grade Level">
                    {entry.gradeLevel}
                </DataContainer>
            </section>
            <Spacer y={10}/>
            <section className="space-y-6">
                <Title>Contact Information</Title>
                <DataContainer label="Lot #, Street Name">
                    {entry.streetName}
                </DataContainer>
                <div className="grid grid-cols-2 phone:grid-cols-1 gap-4">
                    <DataContainer label="City">
                        {entry.city}
                    </DataContainer>
                    <DataContainer label="Parish">
                        {entry.parish}
                    </DataContainer>
                </div>
                <div className="grid grid-cols-2 phone:grid-cols-1 gap-4">
                    <DataContainer label="Emergency Contact">
                        {entry.emergencyContactNumber}
                    </DataContainer>
                    <DataContainer label="Secondary Emergency Contact">
                        {entry.secondaryEmergencyContactNumber}
                    </DataContainer>
                </div>
                <Divider className="my-6"/>
                <div className="flex justify-end gap-4">
                    <Button
                        color="success"
                        variant="shadow"
                        startContent={<CheckIcon/>}
                        onPress={() => doReview(true)}
                    >
                        Approve
                    </Button>
                    <Button
                        color="danger"
                        variant="shadow"
                        startContent={<CloseIcon/>}
                        onPress={() => doReview(false)}
                    >
                        Reject
                    </Button>
                </div>
            </section>
        </Modal>
    )
}

export default ReviewRegistrationModal

type DataContainerProps = PropsWithChildren & {
    label: string,
}

const DataContainer: FC<DataContainerProps> = ({children, label}) => {
    return (
        <div className="p-4 bg-primary/50 flex-grow border border-primary rounded-2xl shadow-md">
            <h6 className="font-semibold text-secondary">{label}</h6>
            <Spacer y={2}/>
            {children}
        </div>
    )
}