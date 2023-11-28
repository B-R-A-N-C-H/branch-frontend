"use client"

import {FC, Fragment, useState} from "react";
import {Card, CardBody} from "@nextui-org/react";
import {RegistrationDocument} from "@/app/utils/types/models/registration";
import FileIcon from "@/app/(site)/components/icons/FileIcon";
import RegistrationDocumentModal
    from "@/app/(site)/(internal)/admin/registrations/components/documents/RegistrationDocumentModal";

type Props = {
    document: RegistrationDocument
}

const RegistrationDocumentCard: FC<Props> = ({document}) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <Fragment>
            <RegistrationDocumentModal
                document={document}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Card
                isPressable
                onPress={() => setModalOpen(true)}
                className="bg-secondary transition-fast hover:scale-105 p-3"
                classNames={{
                    body: "text-white"
                }}
            >
                <CardBody>
                    <div className="flex gap-4">
                        <FileIcon width={48}/>
                        <p className="font-semibold self-center">{document.name}</p>
                    </div>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default RegistrationDocumentCard