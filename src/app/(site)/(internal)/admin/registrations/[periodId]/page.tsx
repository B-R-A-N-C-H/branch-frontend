import {RouteContext} from "@/app/utils/api/api-utils";
import RegistrationPeriodView
    from "@/app/(site)/(internal)/admin/registrations/[periodId]/components/RegistrationPeriodView";
import RegistrationEntriesProvider from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";

type Context = RouteContext<{
    periodId: string
}>

const RegistrationPeriodPage = ({params: {periodId}}: Context) => {
    return (
        <main className="p-16">
            <RegistrationEntriesProvider>
                <RegistrationPeriodView periodId={periodId}/>
            </RegistrationEntriesProvider>
        </main>
    )
}

export default RegistrationPeriodPage