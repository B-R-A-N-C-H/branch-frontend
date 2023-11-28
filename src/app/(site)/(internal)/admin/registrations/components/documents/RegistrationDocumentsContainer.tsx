"use client"

import {FC, Fragment, useMemo} from "react";
import Title from "@/app/(site)/components/Title";
import {Spacer} from "@nextui-org/react";
import AddRegistrationDocumentButton
    from "@/app/(site)/(internal)/admin/registrations/components/documents/AddRegistrationDocumentButton";
import {
    useRegistrationDocuments
} from "@/app/(site)/(internal)/admin/registrations/components/documents/RegistrationDocumentProvider";
import RegistrationDocumentCard
    from "@/app/(site)/(internal)/admin/registrations/components/documents/RegistrationDocumentCard";
import {Role} from "@/app/utils/types/models/member";
import {useSession} from "next-auth/react";

const RegistrationDocumentsContainer: FC = () => {
    const {data: session} = useSession()
    const {documents: {data: documentsArr}} = useRegistrationDocuments()
    const documentCards = useMemo(() => (
        documentsArr.map(doc => (
            <RegistrationDocumentCard key={doc.id} document={doc}/>
        ))
    ), [documentsArr])

    return (
        <Fragment>
            <Title>Documents</Title>
            <Spacer y={6}/>
            {([Role.ADMIN, Role.PRINCIPAL] as Role[]).includes(session!.user.role!) && (
                <Fragment>
                    <AddRegistrationDocumentButton/>
                    <Spacer y={6}/>
                </Fragment>
            )}
            <div
                className="rounded-2xl p-6 border border-primary grid grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 gap-4">
                {documentCards.length ? documentCards : <Title className="col-span-3">There are no documents...</Title>}
            </div>
        </Fragment>
    )
}

export default RegistrationDocumentsContainer