"use client"

import {FC, useCallback, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/(site)/components/inputs/Input";
import {Button, Checkbox} from "@nextui-org/react";
import {formatDate, formatDateTime, transformInputDate} from "@/app/utils/client/client-utils";
import {Divider} from "@nextui-org/divider";
import {PlusFilledIcon} from "@nextui-org/shared-icons";
import {$post, useAuthorizedSWR, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {CreateEventDto} from "@/app/utils/types/dto/event.dto";
import {useEvents} from "@/app/(site)/(external)/events/components/EventsProvider";
import toast from "react-hot-toast";
import {BranchEvent} from "@/app/utils/types/models/branchEvent";

type FormProps = {
    name: string,
}

type Props = {
    onCreate?: () => void
}

const CreateEvent = () =>
    useAuthorizedSWRMutation<CreateEventDto, BranchEvent>(
        '/communication/events',
        $post<CreateEventDto, BranchEvent>
    )

const AddEventForm: FC<Props> = ({onCreate}) => {
    const {contents: {optimisticData: {addOptimisticData: addOptimisticEvent}}} = useEvents()
    const {register, handleSubmit} = useForm<FormProps>()
    const {trigger: create, isMutating: isCreating} = CreateEvent()
    const [starts, setStartDate] = useState<Date>()
    const [ends, setEndDate] = useState<Date>()
    const [allDay, setAllDay] = useState(false)

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (data) => {
        if (!starts || !ends)
            return

        if (allDay) {
            starts?.setHours(0, 0, 0, 0)
            ends?.setHours(23, 59, 59, 999)
        }

        const createEvent = () => create({
            body: {
                name: data.name,
                starts: starts,
                ends: ends
            }
        }).then(event => {
            if (event) {
                toast.success("Successfully created your event!")
                if (onCreate)
                    onCreate()
            }
            return event
        })

        if (addOptimisticEvent)
            await addOptimisticEvent(createEvent, {
                id: "",
                name: data.name,
                starts: starts!.toString(),
                ends: ends!.toString(),
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
            })

    }, [addOptimisticEvent, allDay, create, ends, onCreate, starts])

    useEffect(() => {
        if (allDay)
            setEndDate(starts)
    }, [allDay, starts])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Input
                isDisabled={isCreating}
                id="name"
                register={register}
                label="Event Name"
                isRequired
            />
            <div className="flex gap-4">
                <Input
                    isDisabled={isCreating}
                    isRequired
                    id="starts"
                    label={`${!allDay ? "Start " : ""} Date`}
                    type={allDay ? "date" : "datetime-local"}
                    placeholder={" "}
                    value={starts && (allDay ? formatDate(starts, "-") : formatDateTime(starts, "-"))}
                    onValueChange={val => setStartDate(transformInputDate(val))}
                />
                {!allDay && (
                    <Input
                        isDisabled={isCreating}
                        isRequired
                        id="ends"
                        label="End Date"
                        type="datetime-local"
                        placeholder={" "}
                        value={ends && formatDateTime(ends, "-")}
                        onValueChange={val => setEndDate(transformInputDate(val))}
                    />
                )}
            </div>
            <Checkbox
                isDisabled={isCreating}
                color="primary"
                isSelected={allDay}
                onValueChange={setAllDay}
            >
                All day
            </Checkbox>
            <Divider/>
            <div className="flex justify-end gap-2">
                <Button
                    isDisabled={isCreating}
                    isLoading={isCreating}
                    type="submit"
                    variant="shadow"
                    color="primary"
                    startContent={<PlusFilledIcon/>}
                >
                    Create Event
                </Button>
            </div>
        </form>
    )
}

export default AddEventForm