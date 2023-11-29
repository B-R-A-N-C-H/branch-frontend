"use client"

import {FC, useCallback, useEffect, useState} from "react";
import {$patch, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {UpdateEventDto} from "@/app/utils/types/dto/event.dto";
import {SubmitHandler, useForm} from "react-hook-form";
import {BranchEvent} from "@/app/utils/types/models/branchEvent";
import {KeyedMutator} from "swr";
import Input from "@/app/(site)/components/inputs/Input";
import {formatDate, formatDateTime, transformInputDate} from "@/app/utils/client/client-utils";
import {Button, Checkbox} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {EditIcon} from "@nextui-org/shared-icons";
import toast from "react-hot-toast";
import {useEvents} from "@/app/(site)/(external)/events/components/EventsProvider";

type FormProps = {
    name?: string
}

type Props = {
    event: BranchEvent,
    mutateEvent: KeyedMutator<BranchEvent | undefined>,
    onEdit?: () => void,
}

const EditEvent = (eventId: string) =>
    useAuthorizedSWRMutation<UpdateEventDto, BranchEvent>(
        `/communication/events/${eventId}`,
        $patch<UpdateEventDto, BranchEvent>
    )

const EditEventForm: FC<Props> = ({onEdit, event, mutateEvent}) => {
    const {contents: {optimisticData: {editOptimisticData: editOptimisticEvent}}} = useEvents()
    const {register, handleSubmit} = useForm<FormProps>()
    const {trigger: edit, isMutating: isEditing} = EditEvent(event.id)
    const [name, setName] = useState<string>()
    const [starts, setStartDate] = useState<Date>()
    const [ends, setEndDate] = useState<Date>()
    const [allDay, setAllDay] = useState(false)

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (data) => {
        const startDate = starts ?? new Date(event.starts)
        const endDate = ends ?? new Date(event.ends)

        if (allDay) {
            startDate.setHours(0, 0, 0, 0)
            endDate.setHours(23, 59, 59, 999)
        }

        const optimisticEvent: BranchEvent = {
            ...event,
            name: data.name ?? event.name,
            starts: startDate.toString(),
            ends: endDate.toString()
        }

        const editEvent = () => edit({
            body: {
                name: data.name,
                starts: startDate,
                ends: endDate
            }
        }).then(async (event) => {
            if (event) {
                await mutateEvent(optimisticEvent)
                toast.success("Successfully edited this event!")
                if (onEdit)
                    onEdit()
            }
            return event
        })

        if (editOptimisticEvent)
            await editOptimisticEvent(editEvent, optimisticEvent)
    }, [allDay, edit, editOptimisticEvent, ends, event, mutateEvent, onEdit, starts])

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
                isDisabled={isEditing}
                id="name"
                value={name ?? event.name}
                onValueChange={setName}
                register={register}
                label="Event Name"
            />
            <div className="flex gap-4">
                <Input
                    isDisabled={isEditing}
                    id="starts"
                    label={`${!allDay ? "Start " : ""} Date`}
                    type={allDay ? "date" : "datetime-local"}
                    placeholder={" "}
                    value={(starts || event.starts) && (allDay ? formatDate(starts ?? new Date(event.starts), "-") : formatDateTime(starts ?? new Date(event.starts), "-"))}
                    onValueChange={val => setStartDate(transformInputDate(val))}
                    max={ends ? formatDateTime(ends, "-") : formatDateTime(new Date(event.ends), "-")}
                />
                {!allDay && (
                    <Input
                        isDisabled={isEditing}
                        id="ends"
                        label="End Date"
                        type="datetime-local"
                        placeholder={" "}
                        value={(ends || event.ends) && formatDateTime(ends ?? new Date(event.ends), "-")}
                        onValueChange={val => setEndDate(transformInputDate(val))}
                        min={starts ? formatDateTime(starts, "-") : formatDateTime(new Date(event.starts), "-")}
                    />
                )}
            </div>
            <Checkbox
                isDisabled={isEditing}
                color="primary"
                isSelected={allDay}
                onValueChange={setAllDay}
            >
                All day
            </Checkbox>
            <Divider/>
            <div className="flex justify-end gap-2">
                <Button
                    isDisabled={isEditing}
                    isLoading={isEditing}
                    type="submit"
                    variant="shadow"
                    color="primary"
                    startContent={<EditIcon/>}
                >
                    Edit Event
                </Button>
            </div>
        </form>
    )
}

export default EditEventForm