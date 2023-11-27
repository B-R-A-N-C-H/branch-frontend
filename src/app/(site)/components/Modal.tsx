import {FC, ReactElement} from "react";
import {Modal as NextModal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps} from "@nextui-org/react";

type Props = {
    subtitle?: string,
    header?: ReactElement | ReactElement[]
    footer?: ReactElement | ReactElement[]
} & ModalProps

const Modal: FC<Props> = ({classNames, header, footer, title, subtitle, children, ...props}) => {
    return (
        <NextModal
            backdrop="opaque"
            placement="center"
            scrollBehavior="outside"
            classNames={{
                wrapper: "overflow-x-hidden",
                base: "py-6 px-3 phone:px-0 border border-primary",
                closeButton: "hover:bg-primary/20",
                ...classNames
            }}
            {...props}
        >
            <ModalContent>
                {(title || subtitle || header) && (
                    <ModalHeader>
                        <div className="break-all">
                            {title && <h1 className="text-4xl">{title}</h1>}
                            {subtitle && <h3 className="text-sm text-subtext mt-3">{subtitle}</h3>}
                            {header}
                        </div>
                    </ModalHeader>
                )}
                <ModalBody>
                    {children}
                </ModalBody>
                {footer && (
                    <ModalFooter>
                        {footer}
                    </ModalFooter>
                )}
            </ModalContent>
        </NextModal>
    )
}

export default Modal