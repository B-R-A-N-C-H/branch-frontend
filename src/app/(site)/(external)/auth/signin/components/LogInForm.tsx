"use client"

import {FC, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/(site)/components/inputs/Input";
import {Button, Divider, Spacer} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";

type FormProps = {
    email: string,
    password: string,
}

const LogInForm: FC = () => {
    const {handleSubmit, register} = useForm<FormProps>()
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const router = useRouter()

    const onSubmit: SubmitHandler<FormProps> = useCallback((data) => {
        setIsAuthenticating(true)

        signIn("credentials", {
            ...data,
            redirect: false
        })
            .then((cb) => {
                if (cb?.error)
                    toast.error("Invalid credentials! Please check your details and try again.")
                else if (cb?.ok) {
                    toast.success("Logged in!")
                    router.push("/")
                }
            })
            .finally(() => setIsAuthenticating(false))
    }, [router])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto space-y-6 w-3/4"
        >
            <Input
                id="email"
                isRequired
                isDisabled={isAuthenticating}
                isClearable
                register={register}
                label="Email Address"
                type="email"
            />
            <Spacer y={6} />
            <Input
                id="password"
                isRequired
                isDisabled={isAuthenticating}
                register={register}
                label="Password"
                type="password"
            />
            <Divider/>
            <Button
                type="submit"
                isDisabled={isAuthenticating}
                isLoading={isAuthenticating}
                color="primary"
                variant="shadow"
                fullWidth
            >Log In</Button>
        </form>
    )
}

export default LogInForm