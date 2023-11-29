import {FC, Fragment} from "react";
import {RouteContext} from "@/app/utils/api/api-utils";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import {userHasRole} from "@/app/utils/member-utils";
import {Role} from "@/app/utils/types/models/member";
import {redirect} from "next/navigation";
import SpecificEventView from "@/app/(site)/(external)/events/[id]/components/SpecificEventView";

type Context = RouteContext<{
    id: string
}>

const SpecificEventPage: FC<Context> = async ({params: {id}}) => {
    const session = await getServerSession(authOptions)

    if (!userHasRole(session, Role.HEAD_TEACHER))
        return redirect("/events")


    return (
        <Fragment>
            <SpecificEventView eventId={id} />
        </Fragment>
    )
}

export default SpecificEventPage