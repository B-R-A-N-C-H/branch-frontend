"use client"

import {FC, useCallback, useMemo, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateRegistrationPeriodDto} from "@/app/utils/types/dto/registration";
import Input from "@/app/(site)/components/inputs/Input";
import {$post, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {RegistrationPeriod} from "@/app/utils/types/models/registration";
import {
    useRegistrationPeriods
} from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodProvider";
import {formatDate, transformInputDate} from "@/app/utils/client/client-utils";
import {Button, Divider} from "@nextui-org/react";
import toast from "react-hot-toast";

const CreateRegistrationPeriod = () =>
    useAuthorizedSWRMutation<CreateRegistrationPeriodDto, RegistrationPeriod>(
        '/registration/periods',
        $post<CreateRegistrationPeriodDto, RegistrationPeriod>
    )

type Props = {
    onCreate?: () => void
}

const CreateRegistrationPeriodForm: FC<Props> = ({onCreate}) => {
    const {periods: {optimisticData: {addOptimisticData}}} = useRegistrationPeriods()
    const {register, handleSubmit} = useForm<CreateRegistrationPeriodDto>()
    const {trigger: createPeriod, isMutating: isCreating} = CreateRegistrationPeriod()
    const [starts, setStarts] = useState<Date>()
    const [ends, setEnds] = useState<Date>()


    const onSubmit: SubmitHandler<CreateRegistrationPeriodDto> = useCallback(async (data) => {
        if (!starts || !ends)
            return

        const create = () => createPeriod({
            body: {
                name: data.name,
                starts, ends
            }
        })
            .then((data) => {
                if (data) {
                    toast.success(`Successfully created ${data.name}!`)
                    if (onCreate)
                        onCreate()
                }
                return data
            })

        if (addOptimisticData)
            await addOptimisticData(create, {
                id: "",
                createdAt: "",
                updatedAt: "",
                starts: data.starts.toString(),
                ends: data.ends.toString(),
                name: data.name
            }, {
                revalidate: true
            })

    }, [addOptimisticData, createPeriod, ends, onCreate, starts])

    const today = useMemo(() => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        return d
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Input
                isDisabled={isCreating}
                id="name"
                register={register}
                label="Period Name"
                isRequired
            />
            <div className="flex gap-x-6">
                <Input
                    isDisabled={isCreating}
                    isRequired
                    id="starts"
                    register={register}
                    label="Starts At"
                    type="date"
                    min={formatDate(today, "-")}
                    max={ends && formatDate(ends, "-")}
                    value={starts && formatDate(starts, "-")}
                    onValueChange={val => setStarts(transformInputDate(val))}
                    placeholder=" "
                />
                <Input
                    isDisabled={isCreating}
                    isRequired
                    id="ends"
                    register={register}
                    label="Ends At"
                    type="date"
                    min={starts && formatDate(starts, "-")}
                    value={ends && formatDate(ends, "-")}
                    onValueChange={val => setEnds(transformInputDate(val))}
                    placeholder=" "
                />
            </div>
            <Divider/>
            <div className="flex justify-end gap-2">
                <Button
                    type="submit"
                    isLoading={isCreating}
                    isDisabled={isCreating}
                    color="primary"
                    variant="shadow"
                >Create Period</Button>
            </div>
        </form>
    )
}

export default CreateRegistrationPeriodForm