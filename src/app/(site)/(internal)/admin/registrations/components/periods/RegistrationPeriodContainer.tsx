"use client"

import {FC, Fragment, useMemo} from "react";
import {
    useRegistrationPeriods
} from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodProvider";
import Title from "@/app/(site)/components/Title";
import {Spacer, Spinner} from "@nextui-org/react";
import CreateRegistrationPeriodButton
    from "@/app/(site)/(internal)/admin/registrations/components/periods/CreateRegistrationPeriodButton";
import RegistrationPeriodCard
    from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodCard";
import {useSession} from "next-auth/react";
import {Role} from "@/app/utils/types/models/member";

const RegistrationPeriodContainer: FC = () => {
    const {data: session} = useSession()
    const {periods: {data: periodArr, loading: periodsLoading}} = useRegistrationPeriods()

    const periodCards = useMemo(() => periodArr.map(period => (
        <RegistrationPeriodCard key={period.id} period={period}/>
    )), [periodArr])

    return (
        <Fragment>
            <Title>Periods</Title>
            {([Role.ADMIN, Role.PRINCIPAL] as Role[]).includes(session!.user.role!) && (
                <Fragment>
                    <Spacer y={6}/>
                    <CreateRegistrationPeriodButton/>
                </Fragment>
            )}
            <Spacer y={6}/>
            <div className="rounded-2xl border-primary border p-6 w-1/2 grid grid-cols-2 gap-4">
                {periodsLoading ? <Spinner/> : (periodCards.length ? periodCards :
                    <Title className="col-span-2">There are no periods...</Title>)}
            </div>
        </Fragment>
    )
}

export default RegistrationPeriodContainer