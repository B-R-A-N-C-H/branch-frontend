"use client"

import {FC, useCallback, useState} from "react";
import {$patch, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {UpdateAnnouncementDto} from "@/app/utils/types/dto/announcement.dto";
import {Announcement, AnnouncementLevel} from "@/app/utils/types/models/announcement";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/(site)/components/inputs/Input";
import TextArea from "@/app/(site)/components/inputs/TextArea";
import Select from "@/app/(site)/components/inputs/Select";
import {Button, Checkbox, SelectItem} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {EditIcon, PlusFilledIcon} from "@nextui-org/shared-icons";
import {KeyedMutator} from "swr";
import toast from "react-hot-toast";

const UpdateAnnouncement = (announcementId: string) =>
    useAuthorizedSWRMutation(
        `/communication/announcements/${announcementId}`,
        $patch<UpdateAnnouncementDto, Announcement>
    )

type FormProps = Partial<{
    title: string,
    content: string,
    level: AnnouncementLevel
}>

type Props = {
    announcement: Announcement,
    mutateAnnouncement: KeyedMutator<Announcement | undefined>
    onEdit?: () => void
}

const EditAnnouncementForm: FC<Props> = ({announcement, onEdit, mutateAnnouncement}) => {
    const {trigger: update} = UpdateAnnouncement(announcement.id)
    const {register, handleSubmit} = useForm<FormProps>()
    const [formState, setFormState] = useState<FormProps>({})
    const [commentsDisabled, setCommentsDisabled] = useState<boolean>()

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (data) => {
        const doUpdate = () => update({
            body: {
                ...data,
                commentsEnabled: !commentsDisabled
            }
        }).then(announcement => {
            if (announcement)
                toast.success("Successfully edited this announcement!")
            return announcement
        })

        mutateAnnouncement(doUpdate, {
            optimisticData: {
                ...announcement,
                title: data.title ?? announcement.title,
                content: data.content ?? announcement.content,
                level: data.level ?? announcement.level,
                commentsEnabled: commentsDisabled !== undefined ? !commentsDisabled : announcement.commentsEnabled
            },
            revalidate: true,
            rollbackOnError: true
        })
        if (onEdit)
            onEdit()
    }, [announcement, commentsDisabled, mutateAnnouncement, onEdit, update])

    const updateState = useCallback((key: keyof FormProps, val: unknown) => {
        setFormState(prev => ({
            ...prev,
            [key]: val
        }))
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Input
                register={register}
                isRequired
                id="title"
                autoComplete="off"
                value={formState.title ?? announcement.title}
                onValueChange={val => updateState('title', val)}
                label="Announcement Title"
            />
            <TextArea
                autoComplete="off"
                value={formState.content ?? announcement.content}
                onValueChange={val => updateState('content', val)}
                register={register}
                isRequired
                id="content"
                label="Announcement"
            />
            <Select
                id="level"
                register={register}
                isRequired
                label="Grade Level"
                selectedKeys={[formState.level ?? announcement.level]}
                onSelectionChange={(selection) => {
                    const role = (Array.from(selection) as string[])[0]
                    updateState('level', role)
                }}
            >
                <SelectItem key={AnnouncementLevel.GLOBAL} value={AnnouncementLevel.GLOBAL}>Global</SelectItem>
                <SelectItem key={AnnouncementLevel.ONE} value={AnnouncementLevel.ONE}>Level 1</SelectItem>
                <SelectItem key={AnnouncementLevel.TWO} value={AnnouncementLevel.TWO}>Level 2</SelectItem>
                <SelectItem key={AnnouncementLevel.THREE} value={AnnouncementLevel.THREE}>Level 3</SelectItem>
            </Select>
            <Checkbox
                isSelected={commentsDisabled ?? !announcement.commentsEnabled}
                onValueChange={setCommentsDisabled}
                color="primary"
            >Disable Comments</Checkbox>
            <Divider/>
            <div className="flex gap-2 justify-end">
                <Button
                    variant="shadow"
                    color="primary"
                    startContent={<EditIcon/>}
                    type="submit"
                    isDisabled={Object.keys(formState).length === 0 && commentsDisabled === undefined}
                >
                    Edit Announcement
                </Button>
            </div>
        </form>
    )
}

export default EditAnnouncementForm