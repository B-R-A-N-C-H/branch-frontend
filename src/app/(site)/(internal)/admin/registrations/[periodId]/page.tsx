import {RouteContext} from "@/app/utils/api/api-utils";
import RegistrationPeriodView
    from "@/app/(site)/(internal)/admin/registrations/[periodId]/components/RegistrationPeriodView";

type Context = RouteContext<{
    periodId: string
}>

const RegistrationPeriodPage = ({params: {periodId}}: Context) => {
    return (
        <main className="p-16">
            <RegistrationPeriodView periodId={periodId}/>
        </main>
    )
}

export default RegistrationPeriodPage