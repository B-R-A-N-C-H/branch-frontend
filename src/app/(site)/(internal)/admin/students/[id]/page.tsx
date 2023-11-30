import {RouteContext} from "@/app/utils/api/api-utils";
import {FC} from "react";
import StudentView from "@/app/(site)/(internal)/admin/students/[id]/components/StudentView";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/utils";
import {userHasRole} from "@/app/utils/member-utils";
import {Role} from "@/app/utils/types/models/member";
import {redirect} from "next/navigation";

type Context = RouteContext<{
    id: string
}>

const SpecificStudentPage: FC<Context> = async ({params: {id}}) => {
    const session = await getServerSession(authOptions)

    if (!userHasRole(session, Role.TEACHER))
        return redirect("/")

    return (
        <main className="p-16">
            <StudentView studentId={id} adminView/>
        </main>
    )
}

export default SpecificStudentPage