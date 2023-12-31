"use client"

import {FC, useCallback, useState} from "react";
import {$post, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {CreateAnnouncementDto} from "@/app/utils/types/dto/announcement.dto";
import {Announcement, AnnouncementLevel} from "@/app/utils/types/models/announcement";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAnnouncements} from "@/app/(site)/(internal)/admin/announcements/components/AnnouncementsProvider";
import Input from "@/app/(site)/components/inputs/Input";
import TextArea from "@/app/(site)/components/inputs/TextArea";
import Select from "@/app/(site)/components/inputs/Select";
import {Button, Checkbox, SelectItem} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {PlusFilledIcon} from "@nextui-org/shared-icons";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

const CreateAnnouncement = () =>
    useAuthorizedSWRMutation<CreateAnnouncementDto, Announcement>(
        '/communication/announcements',
        $post
    )

type FormProps = {
    title: string,
    content: string,
    level: AnnouncementLevel,
}

type Props = {
    onCreate?: () => void
}

const CreateAnnouncementForm: FC<Props> = ({onCreate}) => {
    const {data: session} = useSession()
    const {contents: {optimisticData: {addOptimisticData: addOptimisticAnnouncement}}} = useAnnouncements()
    const {register, handleSubmit} = useForm<FormProps>()
    const {trigger: createAnnouncement, isMutating: isCreating} = CreateAnnouncement()
    const [commentsDisabled, setCommentsDisabled] = useState(false)
    const router = useRouter()

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (data) => {
        if (!session)
            return;

        const create = () => createAnnouncement({
            body: {
                ...data,
                commentsEnabled: !commentsDisabled,
                announcerId: session.user.id,
            }
        }).then(announcement => {
            if (announcement) {
                toast.success("You have successfully posted your announcement!")
                if (onCreate)
                    onCreate()
                router.push(`/announcements/${announcement.id}`)
            }
            return announcement
        })

        if (addOptimisticAnnouncement)
            await addOptimisticAnnouncement(create, {
                id: "",
                ...data,
                announcerId: session.user.id,
                commentsEnabled: true,
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
            }, {
                revalidate: true
            })
    }, [addOptimisticAnnouncement, commentsDisabled, createAnnouncement, onCreate, router, session])

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
                label="Announcement Title"
            />
            <TextArea
                autoComplete="off"
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
            >
                <SelectItem key={AnnouncementLevel.GLOBAL} value={AnnouncementLevel.GLOBAL}>Global</SelectItem>
                <SelectItem key={AnnouncementLevel.ONE} value={AnnouncementLevel.ONE}>Level 1</SelectItem>
                <SelectItem key={AnnouncementLevel.TWO} value={AnnouncementLevel.TWO}>Level 2</SelectItem>
                <SelectItem key={AnnouncementLevel.THREE} value={AnnouncementLevel.THREE}>Level 3</SelectItem>
            </Select>
            <Checkbox
                isSelected={commentsDisabled}
                onValueChange={setCommentsDisabled}
                color="primary"
            >Disable Comments</Checkbox>
            <Divider/>
            <div className="flex gap-2 justify-end">
                <Button
                    variant="shadow"
                    color="primary"
                    startContent={<PlusFilledIcon/>}
                    type="submit"
                >
                    Post Announcement
                </Button>
            </div>
        </form>
    )
}

export default CreateAnnouncementForm