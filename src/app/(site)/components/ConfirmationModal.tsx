import {FC, PropsWithChildren, ReactElement} from "react";
import Modal from "@/app/(site)/components/Modal";
import {Divider} from "@nextui-org/divider";
import {Button} from "@nextui-org/button";
import {CheckIcon, CloseIcon} from "@nextui-org/shared-icons";

type Props = {
    title?: string
    size?: "lg" | "xl" | "2xl"
    onAccept?: () => void,
    onReject?: () => void,
    rejectContent?: ReactElement | ReactElement[] | string
    acceptContent?: ReactElement | ReactElement[] | string
    controlsDisabled?: boolean,
    isOpen?: boolean,
} & PropsWithChildren

const ConfirmationModal: FC<Props> = ({
                                          title,
                                          children,
                                          size,
                                          isOpen,
                                          onAccept,
                                          onReject,
                                          rejectContent,
                                          acceptContent,
                                          controlsDisabled
                                      }) => {
    return (
        <Modal
            placement="center"
            size={size}
            title={title}
            isOpen={isOpen}
            onClose={onReject}
            isDismissable={false}
        >
            {children}
            <Divider className="my-6"/>
            <div className="flex justify-end gap-4">
                <Button
                    isDisabled={controlsDisabled}
                    color="primary"
                    variant="flat"
                    onPress={onAccept}
                    startContent={<CheckIcon/>}
                >
                    {acceptContent ?? "I'm sure"}
                </Button>
                <Button
                    color="danger"
                    variant="shadow"
                    onPress={onReject}
                    startContent={<CloseIcon/>}
                >
                    {rejectContent ?? "Nevermind"}
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmationModal