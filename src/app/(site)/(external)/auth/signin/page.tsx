"use client"

import {FC, useEffect, useState} from "react";
import {Tab, Tabs, Card, CardBody, CardHeader} from "@nextui-org/react";
import LogInForm from "@/app/(site)/(external)/auth/signin/components/LogInForm";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import RegisterForm from "@/app/(site)/(external)/auth/signin/components/RegisterForm";
import Link from "next/link";

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
        <main className="flex justify-center py-24 h-screen"
             style={{
                 backgroundImage: 'url("/assets/hero-bg.jpg")',
             }}>
            {sessionStatus === 'unauthenticated' && (
                <Card
                    className="w-1/2 tablet:w-3/4 phone:w-[90%] h-fit"
                    classNames={{
                        header: "flex justify-center items-center my-2"
                    }}
                >
                    <CardHeader>
                        <Link href="/" className="font-bold text-2xl text-primary">
                            BRANCH
                        </Link>
                    </CardHeader>
                    <CardBody>
                        <Tabs
                            aria-label="Options"
                            color="primary"
                            size='lg'
                            classNames={{
                                base: "justify-center",
                                tabList: "bg-secondary/20 border-primary/30 border"
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