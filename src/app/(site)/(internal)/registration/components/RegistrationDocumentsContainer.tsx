"use client"

import {FC, useMemo} from "react";
import {
    useRegistrationDocuments
} from "@/app/(site)/(internal)/admin/registrations/components/documents/RegistrationDocumentProvider";
import Title from "@/app/(site)/components/Title";
import {Divider} from "@nextui-org/divider";
import RegistrationDocumentDownloadCard
    from "@/app/(site)/(internal)/registration/components/RegistrationDocumentDownloadCard";

const RegistrationDocumentsContainer: FC = () => {
    const {documents: {data: documentArr}} = useRegistrationDocuments()
    const cards = useMemo(() => (
        documentArr.map(doc => (
            <RegistrationDocumentDownloadCard key={doc.id} doc={doc}/>
        ))
    ), [documentArr])
    return (
        <div>
            <Title className="text-lg font-semibold">Here are some documents you need to download and submit in person
                to complete your
                registration.</Title>
            <Divider className="my-6"/>
            <div
                className="border border-primary rounded-2xl p-6 grid grid-cols-3 tablet:grid-cols-2 phone:grid-cols-1 gap-4">
                {cards.length ? cards :
                    <Title className="text-medium col-span-3">No documents have been uploaded...</Title>}
            </div>
        </div>
    )
}

export default RegistrationDocumentsContainer