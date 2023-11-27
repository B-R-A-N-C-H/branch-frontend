"use client"

import {FC, Fragment, useEffect} from "react";
import useProtectedRoute from "@/app/(site)/(internal)/admin/hooks/useProtectedRoute";
import {Role} from "@/app/utils/types/models/member";
import {$fetch, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {RegistrationPeriod} from "@/app/utils/types/models/registration";
import {Card, CardBody, Divider, Spacer, Spinner} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import Title from "@/app/(site)/components/Title";

type Props = {
    periodId: string
}

const FetchRegistrationPeriod = (periodId: string) =>
    useAuthorizedSWR(`registration/periods/${periodId}`, $fetch<RegistrationPeriod>)

const RegistrationPeriodView: FC<Props> = ({periodId}) => {
    useProtectedRoute(Role.HEAD_TEACHER, Role.PRINCIPAL, Role.ADMIN)
    const router = useRouter()
    const {data: period, isLoading: periodLoading} = FetchRegistrationPeriod(periodId)

    useEffect(() => {
        if (!period && !periodLoading)
            router.push("/admin/registrations")
    }, [period, periodLoading, router])

    return (
        <Fragment>
            {periodLoading ? <Spinner size="lg"/> : (
                <Fragment>
                    <Title className="text-5xl">{period?.name}</Title>
                    <Spacer y={3}/>
                    <Card className="w-fit px-6 py-2 font-semibold">
                        <CardBody className="block text-left">
                            <p className="text-sm text-secondary">Opens: {new Date(period.starts).toLocaleString("en-JM", {
                                dateStyle: "medium"
                            })}</p>
                            <p className="text-sm text-secondary">Ends: {new Date(period.ends).toLocaleString("en-JM", {
                                dateStyle: "medium"
                            })}</p>
                        </CardBody>
                    </Card>
                    <Divider className="my-6"/>
                </Fragment>
            )}
        </Fragment>
    )
}

export default RegistrationPeriodView