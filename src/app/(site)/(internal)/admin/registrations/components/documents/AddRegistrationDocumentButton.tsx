"use client"

import {FC, Fragment} from "react";
import FileUpload from "@/app/(site)/components/FileUpload";
import MediaType from "@/app/utils/api/MediaType";
import {Button} from "@nextui-org/react";
import {EditDocumentBulkIcon} from "@nextui-org/shared-icons";
import {$put, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {RegistrationDocument} from "@/app/utils/types/models/registration";
import toast from "react-hot-toast";
import {
    useRegistrationDocuments
} from "@/app/(site)/(internal)/admin/registrations/components/documents/RegistrationDocumentProvider";

const UploadDocument = () =>
    useAuthorizedSWRMutation<FormData, RegistrationDocument>(
        '/registration/documents',
        $put<FormData, RegistrationDocument>,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

const AddRegistrationDocumentButton: FC = () => {
    const {documents: {optimisticData: {addOptimisticData: addOptimisticDocument}}} = useRegistrationDocuments()
    const {trigger: uploadDocument, isMutating: isUploading} = UploadDocument()

    return (
        <Fragment>
            <FileUpload
                disabled={isUploading}
                fileTypes={[MediaType.ALL]}
                onUpload={async (file) => {
                    const formData = new FormData()
                    formData.append("file", file)

                    const upload = () => uploadDocument({
                        body: formData
                    }).then(doc => {
                        if (doc)
                            toast.success(`Successfully uploaded ${file.name}!`)
                        return doc
                    })

                    if (addOptimisticDocument)
                        await addOptimisticDocument(upload, {
                            id: "",
                            mimeType: file.type,
                            name: file.name,
                            createdAt: new Date().toString(),
                            updatedAt: new Date().toString()
                        }, {
                            revalidate: true
                        })
                }}
            >
                {(ref) => (
                    <Button
                        size="lg"
                        isDisabled={isUploading}
                        isLoading={isUploading}
                        variant="shadow"
                        color="primary"
                        startContent={<EditDocumentBulkIcon/>}
                        onPress={() => ref.current?.click()}
                    >
                        Upload New Document
                    </Button>
                )}
            </FileUpload>
        </Fragment>
    )
}

export default AddRegistrationDocumentButton