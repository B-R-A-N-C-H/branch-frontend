"use client"

import {FC, Fragment, ReactElement, RefObject, useRef} from "react";
import {Input} from "@nextui-org/input";
import toast from "react-hot-toast";
import MediaType from "@/app/utils/api/MediaType";
import {FileSize} from "@/app/utils/FileSize";

export type FileUploadProps = {
    /**
     * The maximum size of a file.
     */
    maxFileSize?: FileSize,
    onUpload?: (file: File) => void,
    onFileSizeError?: (size: number) => void,
    onFileRemove?: () => void,
    disabled?: boolean,
    fileTypes: MediaType[]
    children?: (inputRef: RefObject<HTMLInputElement>) => ReactElement | ReactElement[],
}

export const FileUpload: FC<FileUploadProps> = ({
                                                    maxFileSize,
                                                    onFileSizeError,
                                                    onUpload,
                                                    onFileRemove,
                                                    fileTypes,
                                                    disabled,
                                                    children,
                                                }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <Fragment>
            <Input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={fileTypes.join(",")}
                isDisabled={disabled}
                onChange={async (e) => {
                    e.preventDefault()

                    const upload = async () => {
                        const allFiles = e.target.files;
                        if (!allFiles || !allFiles.length) {
                            if (onFileRemove)
                                onFileRemove();
                            return Promise.resolve();
                        }

                        const file = allFiles[0];
                        if (maxFileSize && file.size > maxFileSize.toBytes()) {
                            if (onFileSizeError)
                                onFileSizeError(file.size)
                            else
                                toast.error("That file is too big!")
                            return;
                        }

                        if (onUpload)
                            onUpload(file);
                    };

                    await upload()
                    e.target.files = null
                }}
            />
            {children && children(inputRef)}
        </Fragment>
    )
}

export default FileUpload