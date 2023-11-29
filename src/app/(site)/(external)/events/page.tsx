import {FC, Fragment} from "react";
import Title from "@/app/(site)/components/Title";
import {Spacer} from "@nextui-org/react";
import EventsCalendar from "@/app/(site)/(external)/events/components/EventsCalendar";
import AddEventButton from "@/app/(site)/(external)/events/components/AddEventButton";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import {userHasRole} from "@/app/utils/member-utils";
import {Role} from "@/app/utils/types/models/member";

const EventsPage: FC = async () => {
    const session = await getServerSession(authOptions)

    return (
        <Fragment>
            <Title className="text-5xl">Events</Title>
            <Spacer y={12}/>
            {userHasRole(session, Role.HEAD_TEACHER) && <AddEventButton/>}
            <Spacer y={6}/>
            <div className="w-full h-[48rem]">
                <EventsCalendar/>
            </div>
        </Fragment>
    )
}

export default EventsPage