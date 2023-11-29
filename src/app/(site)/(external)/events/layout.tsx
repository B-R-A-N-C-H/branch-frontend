import {FC, PropsWithChildren} from "react";
import EventsProvider from "@/app/(site)/(external)/events/components/EventsProvider";

const EventsLayout: FC<PropsWithChildren> = ({children}) => {
    return (
        <EventsProvider>
            <main className="p-16">
                {children}
            </main>
        </EventsProvider>
    )
}

export default EventsLayout