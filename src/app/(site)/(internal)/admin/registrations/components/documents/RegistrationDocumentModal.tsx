"use client"

import {FC, Fragment, useState} from "react";
import Modal from "@/app/(site)/components/Modal";
import {RegistrationDocument} from "@/app/utils/types/models/registration";
import FileIcon from "@/app/(site)/components/icons/FileIcon";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/react";
import TrashIcon from "@/app/(site)/components/icons/TrashIcon";
import ConfirmationModal from "@/app/(site)/components/ConfirmationModal";
import {$delete, useAuthorizedSWRMutationWithoutArgs} from "@/app/utils/swr-utils";
import toast from "react-hot-toast";
import {
    useRegistrationDocuments
} from "@/app/(site)/(internal)/admin/registrations/components/documents/RegistrationDocumentProvider";

type Props = {
    document: RegistrationDocument,
    isOpen: boolean,
    onClose: () => void,
}

const DeleteDocument = (documentId: string) =>
    useAuthorizedSWRMutationWithoutArgs<RegistrationDocument>(`/registration/documents/${documentId}`, $delete<RegistrationDocument>)

const RegistrationDocumentModal: FC<Props> = ({isOpen, onClose, document}) => {
    const {documents: {optimisticData: {removeOptimisticData: removeOptimisticDocument}}} = useRegistrationDocuments()
    const {trigger: deleteDocument, isMutating: isDeleting} = DeleteDocument(document.id)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    return (
        <Fragment>
            <ConfirmationModal
                isOpen={deleteModalOpen}
                onReject={() => setDeleteModalOpen(false)}
                onAccept={async () => {
                    const doDelete = () => deleteDocument()
                        .then(doc => {
                            if (doc)
                                toast.success(`You have successfully deleted ${doc.name}`)
                            return doc
                        })

                    if (removeOptimisticDocument)
                        await removeOptimisticDocument(doDelete, document)
                            .then(() => {
                                setDeleteModalOpen(false)
                                onClose()
                            })

                }}
                controlsDisabled={isDeleting}
            >
                <p>Are you sure you want to remove {document.name} as a registration document?</p>
            </ConfirmationModal>
            <Modal
                size="xl"
                title={document.name}
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="flex gap-4">
                    <FileIcon width={64} className="text-primary"/>
                    <div>
                        <p className="font-bold text-2xl">{document.name}</p>
                        <p className="text-sm text-subtext">Media Type: {document.mimeType}</p>
                    </div>
                </div>
                <Divider className="my-6"/>
                <div className="flex justify-end gap-4">
                    <Button
                        color="danger"
                        variant="shadow"
                        startContent={<TrashIcon/>}
                        onPress={() => setDeleteModalOpen(true)}
                    >
                        Delete Document
                    </Button>
                </div>
            </Modal>
        </Fragment>
    )
}

export default RegistrationDocumentModal