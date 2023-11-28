"use client"

import {FC} from "react";
import {Card, CardBody} from "@nextui-org/react";
import FileIcon from "@/app/(site)/components/icons/FileIcon";
import {RegistrationDocument} from "@/app/utils/types/models/registration";
import {$get, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";

type Props = {
    doc: RegistrationDocument
}

const FetchFile = (documentId: string) =>
    useAuthorizedSWRMutationWithoutArgs<Uint8Array>(`registration/documents/${documentId}`, $get<Uint8Array>)

const RegistrationDocumentDownloadCard: FC<Props> = ({doc}) => {
    const {trigger: fetch, isMutating: isLoading} = FetchFile(doc.id)

    return (
        <Card
            isDisabled={isLoading}
            isPressable
            onPress={() => {
                fetch()
                    .then(data => {
                        if (!data)
                            return

                        const blob = new Blob([Buffer.from(data)])
                        const downloadUrl = URL.createObjectURL(blob)
                        const aTag = document.createElement("a")
                        aTag.href = downloadUrl
                        aTag.setAttribute('download', doc.name)
                        document.body.appendChild(aTag)
                        aTag.click()
                        aTag.remove()
                    })
            }}
            className="bg-secondary transition-fast hover:scale-105 p-3"
            classNames={{
                body: "text-white"
            }}
        >
            <CardBody>
                <div className="flex gap-4">
                    <FileIcon width={48}/>
                    <p className="font-semibold self-center">{doc.name}</p>
                </div>
            </CardBody>
        </Card>
    )
}

export default RegistrationDocumentDownloadCard