"use client"

import React, {FC, useMemo, useState} from "react";
import Modal from "@/app/(site)/components/Modal";
import {Tab, Tabs} from "@nextui-org/tabs";
import {Button, Divider} from "@nextui-org/react";
import RegistrationFormProvider from "@/app/(site)/(internal)/registration/components/RegistrationFormProvider";
import RegistrationGeneralInfoForm from "@/app/(site)/(internal)/registration/components/RegistrationGeneralInfoForm";
import RegistrationContactInfoForm from "@/app/(site)/(internal)/registration/components/RegistrationContactInfoForm";

type Props = {
    isOpen: boolean,
    onClose: () => void,
}

type TabKey = "form" | "contact_info" | "documents"

const RegistrationModal: FC<Props> = ({isOpen, onClose}) => {
    const [selectedTab, setSelectedTab] = useState<TabKey>("form")

    return (
        <Modal
            isDismissable={false}
            size="5xl"
            isOpen={isOpen}
            onClose={() => {
                setSelectedTab("form")
                onClose()
            }}
            title="Register Your Child"
        >
            <RegistrationFormProvider>
                <Tabs
                    disableAnimation={false}
                    color="primary"
                    variant="underlined"
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as TabKey)}
                >
                    <Tab key="form" title="General Student Information">
                        <RegistrationGeneralInfoForm/>
                        <Divider className="my-6"/>
                        <div className="flex justify-end gap-4">
                            <Button
                                onPress={() => setSelectedTab("contact_info")}
                                color="secondary"
                                variant="shadow"
                            >Continue</Button>
                        </div>
                    </Tab>
                    <Tab key="contact_info" title="Student Contact Information">
                        <RegistrationContactInfoForm/>
                        <Divider className="my-6"/>
                        <div className="flex justify-end gap-4">
                            <Button
                                onPress={() => setSelectedTab("form")}
                                color="secondary"
                                variant="shadow"
                            >Go Back</Button>
                            <Button
                                onPress={() => setSelectedTab("documents")}
                                color="secondary"
                                variant="shadow"
                            >Continue</Button>
                        </div>
                    </Tab>
                    <Tab key="documents" title="Registration Documents">
                        documents!
                        <Divider className="my-6"/>
                        <div className="flex justify-end gap-4">
                            <Button
                                onPress={() => setSelectedTab("contact_info")}
                                color="secondary"
                                variant="shadow"
                            >Go Back</Button>
                            <Button
                                onPress={() => setSelectedTab("documents")}
                                color="secondary"
                                variant="shadow"
                            >Continue</Button>
                        </div>
                    </Tab>
                </Tabs>
            </RegistrationFormProvider>
        </Modal>
    )
}

export default RegistrationModal