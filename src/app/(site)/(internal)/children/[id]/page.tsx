import {RouteContext} from "@/app/utils/api/api-utils";
import {FC} from "react";
import StudentView from "@/app/(site)/(internal)/admin/students/[id]/components/StudentView";

type Context = RouteContext<{
    id: string
}>

const SpecificStudentPage: FC<Context> = async ({params: {id}}) => {

    return (
        <main className="p-16">
            <StudentView studentId={id} />
        </main>
    )
}

export default SpecificStudentPage