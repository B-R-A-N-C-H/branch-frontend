"use client"

import {FC, useCallback, useMemo, useState} from "react";
import Modal from "@/app/(site)/components/Modal";
import {RegistrationPeriod} from "@/app/utils/types/models/registration";
import Input from "@/app/(site)/components/inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {UpdateRegistrationPeriodDto} from "@/app/utils/types/dto/registration.dto";
import {formatDate, transformInputDate} from "@/app/utils/client/client-utils";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";
import {$patch, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import toast from "react-hot-toast";
import {KeyedMutator} from "swr";

type Props = {
    period: RegistrationPeriod,
    isOpen: boolean,
    onClose: () => void,
    mutatePeriod: KeyedMutator<RegistrationPeriod | undefined>
}

type FormProps = Partial<{
    name: string,
    starts: string,
    ends: string
}>

const UpdatePeriod = (periodId: string) =>
    useAuthorizedSWRMutation<UpdateRegistrationPeriodDto, RegistrationPeriod>(
        `/registration/periods/${periodId}`,
        $patch<UpdateRegistrationPeriodDto, RegistrationPeriod>
    )

const EditRegistrationPeriodModal: FC<Props> = ({period, isOpen, onClose, mutatePeriod}) => {
    const [formState, setFormState] = useState<FormProps>({})
    const {register, handleSubmit} = useForm<FormProps>()
    const {trigger: updatePeriod, isMutating: isUpdating} = UpdatePeriod(period.id)

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (dto) => {
        const starts = transformInputDate(dto.starts ?? "")
        const ends = transformInputDate(dto.ends ?? "")

        const doUpdate = () => updatePeriod({
            body: {
                name: dto.name,
                starts, ends
            }
        })
            .then(entry => {
                if (entry) {
                    toast.success("Successfully updated this registration period!")
                    onClose()
                }
                return entry
            })

        await mutatePeriod(doUpdate, {
            optimisticData: {
                ...period,
                name: dto.name ?? period.name,
                starts: starts?.toString() ?? period.starts,
                ends: ends?.toString() ?? period.ends
            }

        })
    }, [mutatePeriod, onClose, period, updatePeriod])

    const today = useMemo(() => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        return d
    }, [])

    return (
        <Modal
            title="Edit Registration Period"
            size="2xl"
            isOpen={isOpen}
            onClose={() => {
                setFormState({})
                onClose()
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    register={register}
                    id="name"
                    label="Name"
                    value={formState.name ?? period.name}
                    onValueChange={(val) => setFormState(prev => ({
                        ...prev,
                        name: val
                    }))}
                />
                <div className="flex gap-6">
                    <Input
                        id="starts"
                        register={register}
                        label="Starts At"
                        type="date"
                        max={(formState.ends || period.ends) && (formState.ends ?? formatDate(new Date(period.ends), "-"))}
                        value={(formState.starts || period.starts) && (formState.starts ?? formatDate(new Date(period.starts), "-"))}
                        onValueChange={val => setFormState(prev => ({
                            ...prev,
                            starts: val
                        }))}
                        placeholder=" "
                    />
                    <Input
                        id="ends"
                        register={register}
                        label="Ends At"
                        type="date"
                        min={formState.starts ?? formatDate(today, "-")}
                        value={(formState.ends || period.ends) && (formState.ends ?? formatDate(new Date(period.ends), "-"))}
                        onValueChange={val => setFormState(prev => ({
                            ...prev,
                            ends: val
                        }))}
                        placeholder=" "
                    />
                </div>
                <Divider/>
                <div className="flex justify-end">
                    <Button
                        color="primary"
                        variant="shadow"
                        type="submit"
                        startContent={<EditIcon/>}
                    >
                        Edit Period
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default EditRegistrationPeriodModal