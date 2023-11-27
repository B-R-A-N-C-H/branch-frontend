import {FC, Fragment} from "react";
import Title from "@/app/(site)/components/Title";
import {Metadata} from "next";
import RegistrationContainer from "@/app/(site)/(internal)/registration/components/RegistrationContainer";
import {Spacer} from "@nextui-org/react";
import RegistrationEntriesProvider from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";

export const metadata: Metadata = {
    title: "BRANCH - Registration",
    description: "Seamlessly register your child."
}

const RegistrationPage: FC = () => {
    return (
        <main className="p-16">
            <Title className="text-5xl py-1">Registration</Title>
            <Spacer y={12}/>
            {/*<RegistrationEntriesProvider>*/}
            <RegistrationContainer/>
            {/*</RegistrationEntriesProvider>*/}
        </main>
    )
}

export default RegistrationPage