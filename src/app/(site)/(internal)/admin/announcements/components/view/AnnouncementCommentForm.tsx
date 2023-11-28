"use client"

import {FC, useCallback} from "react";
import {Announcement, AnnouncementComment} from "@/app/utils/types/models/announcement";
import Input from "@/app/(site)/components/inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {$post, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {CreateAnnouncementCommentDto} from "@/app/utils/types/dto/announcement.dto";
import {KeyedMutator} from "swr";
import {useSession} from "next-auth/react";
import {Button} from "@nextui-org/react";
import {SendFilledIcon} from "@nextui-org/shared-icons";

type Props = {
    announcement?: Announcement,
    mutateAnnouncement: KeyedMutator<Announcement | undefined>
}

type FormProps = {
    content: string
}

const PostComment = (announcementId?: string) =>
    useAuthorizedSWRMutation<CreateAnnouncementCommentDto, AnnouncementComment>(
        announcementId && `/communication/announcements/${announcementId}/comments`,
        $post<CreateAnnouncementCommentDto, AnnouncementComment>
    )

const AnnouncementCommentForm: FC<Props> = ({announcement, mutateAnnouncement}) => {
    const {data: session} = useSession()
    const {register, handleSubmit, reset} = useForm<FormProps>()
    const {trigger: comment, isMutating: isCommenting} = PostComment(announcement?.id)

    const onSubmit: SubmitHandler<FormProps> = useCallback((data) => {
        if (!session || !data.content || !data.content.length)
            return;

        const doComment = () => comment({
            body: {
                content: data.content,
                commenterId: session.user.id
            }
        }).then(comment => {
            comment = comment!
            return ({
                ...announcement!,
                comments: [...(announcement!.comments ?? []), comment]
            })
        })

        mutateAnnouncement(doComment, {
            optimisticData: {
                ...announcement!,
                comments: [...(announcement!.comments ?? []), {
                    id: "",
                    commenterId: session.user.id,
                    parentCommentId: null,
                    announcementId: announcement!.id,
                    content: data.content,
                    createdAt: new Date().toString(),
                    updatedAt: new Date().toString()
                }]
            },
            revalidate: true,
            rollbackOnError: true
        })
        reset()
    }, [announcement, comment, mutateAnnouncement, reset, session])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
            <Input
                autoComplete="off"
                id="content"
                register={register}
                size="sm"
                placeholder="Enter a comment..."
            />
            <Button
                isIconOnly
                color="primary"
                variant="shadow"
                className="self-center"
                type="submit"
            >
                <SendFilledIcon/>
            </Button>
        </form>
    )
}

export default AnnouncementCommentForm