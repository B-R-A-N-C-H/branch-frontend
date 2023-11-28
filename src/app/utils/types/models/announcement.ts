import Member from "@/app/utils/types/models/member";

export enum AnnouncementLevel {
    GLOBAL = "GLOBAL",
    ONE = "ONE",
    TWO = "TWO",
    THREE = "THREE"
}

export type Announcement = {
    id: string,
    level: AnnouncementLevel,
    content: string,
    title: string,
    commentsEnabled: boolean,
    comments?: AnnouncementComment[],
    announcerId: string,
    announcer?: Member,
    createdAt: string,
    updatedAt: string
}

export type AnnouncementComment = {
    id: string,
    parentCommentId: string | null,
    parentComment?: AnnouncementComment | null,
    childComments?: AnnouncementComment[],
    announcementId: string,
    announcement?: Announcement,
    commenterId: string,
    commenter?: Member,
    content: string,
    createdAt: string,
    updatedAt: string
}