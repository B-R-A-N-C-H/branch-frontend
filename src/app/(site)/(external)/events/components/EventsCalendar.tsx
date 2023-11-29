"use client"

import {FC, useMemo, useState} from "react";
import {Calendar, Event, momentLocalizer, View, Views} from 'react-big-calendar'
import moment from 'moment'
import {useEvents} from "@/app/(site)/(external)/events/components/EventsProvider";
import {Spinner} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {userHasRole} from "@/app/utils/member-utils";
import {Role} from "@/app/utils/types/models/member";

const localizer = momentLocalizer(moment)

const EventsCalendar: FC = () => {
    const {data: session} = useSession()
    const {contents: {data: events, loading}} = useEvents()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState<View>(Views.MONTH)
    const router = useRouter()

    const eventsParsed = useMemo<Event[]>(() => events.map(event => ({
        title: event.name,
        start: new Date(event.starts),
        end: new Date(event.ends),
        resource: {id: event.id}
    })), [events])

    return (
        loading ? <Spinner size="lg"/> : (
            <Calendar
                localizer={localizer}
                date={currentDate}
                onNavigate={(date) => {
                    setCurrentDate(date)
                }}
                events={eventsParsed}
                showMultiDayTimes
                view={view}
                // @ts-ignore
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                onView={setView}
                onDoubleClickEvent={(e) => {
                    if (userHasRole(session, Role.HEAD_TEACHER))
                        router.push(`/events/${e.resource.id}`)
                }}
            />
        )
    )
}

export default EventsCalendar