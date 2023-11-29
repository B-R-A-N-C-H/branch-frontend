import {AnnouncementLevel} from "@/app/utils/types/models/announcement";

export type CreateAnnouncementDto = {
    title: string,
    content: string,
    announcerId: string,
    level?: AnnouncementLevel,
    commentsEnabled?: boolean,
}

export type UpdateAnnouncementDto = Partial<Omit<CreateAnnouncementDto, 'announcerId'>>

export type CreateAnnouncementCommentDto = {
    content: string,
    commenterId: string,
    parentCommentId?: string,
}