import {FC, Fragment} from "react";
import {RouteContext} from "@/app/utils/api/api-utils";
import AnnouncementView from "@/app/(site)/(internal)/admin/announcements/components/view/AnnouncementView";

type Context = RouteContext<{
    id: string
}>

const SpecificAnnouncementPage: FC<Context> = ({params: {id}}) => {
    return (
        <Fragment>
            <AnnouncementView announcementId={id} />
        </Fragment>
    )
}

export default SpecificAnnouncementPage