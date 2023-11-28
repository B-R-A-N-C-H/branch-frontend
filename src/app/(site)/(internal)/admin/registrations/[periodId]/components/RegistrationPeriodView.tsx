"use client"

import {FC, Fragment, useEffect, useMemo} from "react";
import useProtectedRoute from "@/app/(site)/(internal)/admin/hooks/useProtectedRoute";
import {Role} from "@/app/utils/types/models/member";
import {$fetch, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {RegistrationEntry, RegistrationPeriod} from "@/app/utils/types/models/registration";
import {Button, Card, CardBody, CardHeader, Spacer, Spinner} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import Title from "@/app/(site)/components/Title";
import {useRegistrationEntries} from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";
import RegistrationEntriesTable from "@/app/(site)/(internal)/registration/components/RegistrationEntriesTable";
import Link from "next/link";
import {ArrowLeftIcon} from "@nextui-org/shared-icons";
import ReviewRegistrationButton
    from "@/app/(site)/(internal)/admin/registrations/[periodId]/components/ReviewRegistrationButton";
import EditRegistrationPeriodButton
    from "@/app/(site)/(internal)/admin/registrations/[periodId]/components/EditRegistrationPeriodButton";
import {useSession} from "next-auth/react";

type Props = {
    periodId: string
}

const FetchRegistrationPeriod = (periodId: string) =>
    useAuthorizedSWR(`registration/periods/${periodId}`, $fetch<RegistrationPeriod>)

const RegistrationPeriodView: FC<Props> = ({periodId}) => {
    useProtectedRoute(Role.HEAD_TEACHER, Role.PRINCIPAL, Role.ADMIN)
    const router = useRouter()
    const {data: session} = useSession()
    const {data: period, isLoading: periodLoading, mutate} = FetchRegistrationPeriod(periodId)
    const {entries: {data: entryArr}} = useRegistrationEntries()
    const relevantEntries = useMemo(() => entryArr.filter(entry => entry.registrationPeriodId === periodId), [entryArr, periodId])

    useEffect(() => {
        if (!period && !periodLoading)
            router.push("/admin/registrations")
    }, [period, periodLoading, router])

    return (
        <Fragment>
            {periodLoading ? <Spinner size="lg"/> : (
                <Fragment>
                    <Button
                        variant="flat"
                        color="primary"
                        as={Link}
                        href="/admin/registrations"
                        startContent={<ArrowLeftIcon/>}
                    >
                        Go Back
                    </Button>
                    <Spacer y={8}/>
                    <Card className="w-full px-6 py-2 font-semibold">
                        <CardHeader>
                            <Title className="text-5xl">{period?.name}</Title>
                            {([Role.ADMIN, Role.PRINCIPAL] as Role[]).includes(session!.user.role!) && (
                                <Fragment>
                                    <Spacer x={4}/>
                                    <EditRegistrationPeriodButton period={period!} mutatePeriod={mutate}/>
                                </Fragment>
                            )}
                        </CardHeader>
                        <CardBody className="block text-left border border-primary w-fit rounded-2xl px-6">
                            <div className="flex gap-2">
                                <div>
                                    <p className="text-sm text-secondary">Opens: {new Date(period!.starts).toLocaleString("en-JM", {
                                        dateStyle: "medium"
                                    })}</p>
                                    <p className="text-sm text-secondary">Ends: {new Date(period!.ends).toLocaleString("en-JM", {
                                        dateStyle: "medium"
                                    })}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    <Spacer y={12}/>
                    <Title>Pending Registrations</Title>
                    <Spacer y={6}/>
                    <RegistrationEntriesTable
                        entries={relevantEntries.filter(entry => entry.approved === null)}
                        actionContent={(entry: RegistrationEntry) => (
                            <Fragment>
                                <ReviewRegistrationButton entry={entry}/>
                            </Fragment>
                        )}
                    />
                    <Spacer y={12}/>
                    <Title>Handled Registrations</Title>
                    <Spacer y={6}/>
                    <RegistrationEntriesTable
                        entries={relevantEntries.filter(entry => entry.approved !== null)}
                        actionContent={(entry: RegistrationEntry) => (
                            <Fragment>
                                <ReviewRegistrationButton entry={entry}/>
                            </Fragment>
                        )}
                    />
                </Fragment>
            )}
        </Fragment>
    )
}

export default RegistrationPeriodView