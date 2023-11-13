"use client"

import {FC, useEffect, useState} from "react";
import {Tab, Tabs, Card, CardBody} from "@nextui-org/react";
import LogInForm from "@/app/(site)/(external)/auth/signin/components/LogInForm";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import RegisterForm from "@/app/(site)/(external)/auth/signin/components/RegisterForm";

const SignInPage: FC = () => {
    const {data: sessionData, status: sessionStatus} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedTab, setSelectedTab] = useState<string>(searchParams.get("tab")?.toLowerCase() === "register" ? "register" : "signin")

    useEffect(() => {
        if (sessionStatus !== 'loading' && sessionData !== null)
            router.push("/")
    }, [router, sessionData, sessionStatus])

    return (
        <main className="flex justify-center py-24 h-full">
            {sessionStatus === 'unauthenticated' && (
                <Card className="w-1/2 tablet:w-3/4 phone:w-[90%]">
                    <CardBody>
                        <Tabs
                            aria-label="Options"
                            color="primary"
                            size='lg'
                            classNames={{
                                base: "justify-center",
                            }}
                            onSelectionChange={(key) => setSelectedTab(key as string)}
                            selectedKey={selectedTab}
                        >
                            <Tab key="signin" title="Sign In">
                                <LogInForm/>
                            </Tab>
                            <Tab key="register" title="Sign Up">
                                <RegisterForm/>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            )}
        </main>
    )
}

export default SignInPage