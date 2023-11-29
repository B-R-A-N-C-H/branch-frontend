"use client"

import {FC, Fragment, useEffect} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {BranchEvent} from "@/app/utils/types/models/branchEvent";
import {useRouter} from "next/navigation";
import {Button, Card, CardBody, Chip, Spacer, Spinner} from "@nextui-org/react";
import Title from "@/app/(site)/components/Title";
import {ArrowLeftIcon} from "@nextui-org/shared-icons";
import Link from "next/link";
import EditEventButton from "@/app/(site)/(external)/events/[id]/components/EditEventButton";
import DeleteEventButton from "@/app/(site)/(external)/events/[id]/components/DeleteEventButton";

type Props = {
    eventId: string
}

const FetchEvent = (eventId: string) =>
    useAuthorizedSWR<BranchEvent>(
        `/communication/events/${eventId}`,
        $get<BranchEvent>, true
    )

const SpecificEventView: FC<Props> = ({eventId}) => {
    const {data: event, isLoading: eventLoading, mutate: mutateEvent} = FetchEvent(eventId)
    const router = useRouter()

    useEffect(() => {
        if (!eventLoading && !event)
            router.replace("/events")
    }, [event, eventLoading, router]);

    return (
        <Fragment>
            {(eventLoading || !event) ? <Spinner size="lg"/> : (
                <Fragment>
                    <Button
                        variant="light"
                        color="primary"
                        startContent={<ArrowLeftIcon/>}
                        as={Link}
                        href="/events"
                        size="lg"
                    >
                        View All Events
                    </Button>
                    <Spacer y={4}/>
                    <div className="flex gap-4">
                        <Title className="p-2 text-5xl">{event.name}</Title>
                        <div className="flex gap-2">
                            <EditEventButton
                                event={event}
                                mutateEvent={mutateEvent}
                            />
                            <DeleteEventButton event={event}/>
                        </div>
                    </div>
                    <Spacer y={12}/>
                    <Card
                        classNames={{
                            body: "p-12"
                        }}
                    >
                        <CardBody>
                            <div className="w-fit">
                                <p className="grid grid-cols-2"><span
                                    className="font-semibold text-xl">Start Date</span><Chip color="secondary"
                                                                                             variant="flat">{new Date(event.starts).toLocaleString("en", {
                                    timeStyle: "short",
                                    dateStyle: "full"
                                })}</Chip></p>
                                <Spacer y={4}/>
                                <p className="grid grid-cols-2"><span
                                    className="font-semibold text-xl">End Date</span><Chip color="secondary"
                                                                                           variant="flat">{new Date(event.ends).toLocaleString("en", {
                                    timeStyle: "short",
                                    dateStyle: "full"
                                })}</Chip></p>
                            </div>
                        </CardBody>
                    </Card>
                </Fragment>
            )}
        </Fragment>
    )
}

export default SpecificEventView