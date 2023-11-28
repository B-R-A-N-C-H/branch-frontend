import {FC} from "react";
import {Announcement, AnnouncementLevel} from "@/app/utils/types/models/announcement";
import {Avatar, Chip, Spacer} from "@nextui-org/react";
import Link from "next/link";

type Props = {
    announcement: Announcement
}

const AnnouncementCard: FC<Props> = ({announcement}) => {
    return (
        <Link
            href={`/announcements/${announcement.id}`}
            className="grid grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 w-full transition-fast hover:bg-primary/20 cursor-pointer py-6 phone:px-3 px-12"
        >
            <div>
                <Chip
                    size="sm"
                    color="primary"
                    variant="flat"
                >
                    {`${announcement.level !== AnnouncementLevel.GLOBAL ? 'LEVEL ' : ''}${announcement.level}`}
                </Chip>
                <Spacer y={2}/>
                <h3 className="font-semibold self-center text-xl tablet:text-medium capitalize">
                    {announcement.title}
                </h3>
            </div>

            <p className="overflow-hidden w-full whitespace-nowrap overflow-ellipsis self-center text-subtext tablet:hidden">{announcement.content}</p>
            <div className="justify-self-end self-center phone:hidden">
                <div className="flex gap-4">
                    <Avatar
                        isBordered
                        color="primary"
                    />
                    <div>
                        <p>{announcement.announcer?.firstName} {announcement.announcer?.lastName}</p>
                        <p className="text-xs text-secondary">{new Date(announcement.createdAt).toLocaleString("en-JM", {
                            dateStyle: "medium",
                            timeStyle: "short"
                        })}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default AnnouncementCard