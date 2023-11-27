import {FC, useMemo} from "react";
import {Card, CardFooter, CardHeader, Chip, Divider} from "@nextui-org/react";
import {RegistrationPeriod} from "@/app/utils/types/models/registration";
import Link from "next/link";

type Props = {
    period: RegistrationPeriod
}

const RegistrationPeriodCard: FC<Props> = ({period}) => {
    const state = useMemo<'open' | 'pending' | 'closed'>(() => {
        const today = new Date();
        const starts = new Date(period.starts)
        const ends = new Date(period.ends)
        if (today >= starts && today <= ends)
            return 'open'
        else if (today > ends)
            return 'closed'
        else return 'pending'
    }, [period.ends, period.starts])

    return (
        <Card
            isPressable
            as={Link}
            href={`/admin/registrations/${period.id}`}
            className="border border-primary bg-secondary p-4 transition-faster hover:scale-105 shadow-md"
        >
            <CardHeader className="capitalize text-xl font-semibold text-white p-0 flex gap-2">
                {period.name}
                <Chip
                    color={state === "open" ? "primary" : (state === "closed" ? "danger" : "warning")}
                    className="uppercase font-semibold"
                >{state}</Chip>
            </CardHeader>
            <CardFooter className="p-0">
                <div className="block text-left">
                    <Divider className="my-3"/>
                    <p className="text-sm text-white">Opens: {new Date(period.starts).toLocaleString("en-JM", {
                        dateStyle: "medium"
                    })}</p>
                    <p className="text-sm text-white">Ends: {new Date(period.ends).toLocaleString("en-JM", {
                        dateStyle: "medium"
                    })}</p>
                </div>
            </CardFooter>
        </Card>
    )
}

export default RegistrationPeriodCard