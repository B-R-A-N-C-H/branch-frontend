import {FC, useCallback, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateMemberDto} from "@/app/utils/types/dto/member.dto";
import Input, {ValidationErrors} from "@/app/(site)/components/inputs/Input";
import {PASSWORD_REGEX} from "@/app/utils/regex";
import {Button, Divider} from "@nextui-org/react";
import useSWRMutation from "swr/mutation";
import {handleAxiosError, $post} from "@/app/utils/swr-utils";
import Member from "@/app/utils/types/models/member";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";

type FormProps = CreateMemberDto & {
    confirmedPassword: string
}

const RegisterUser = () => (
    useSWRMutation("/auth/register", $post<CreateMemberDto, Member>())
)

const RegisterForm: FC = () => {
    const {handleSubmit, register} = useForm<FormProps>()
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
    const {trigger: registerUser, isMutating: isRegistering} = RegisterUser()

    const onSubmit: SubmitHandler<FormProps> = useCallback((data) => {
        if (Object.keys(validationErrors).length != 0)
            return;

        const {confirmedPassword, ...dto} = data

        registerUser({
            body: dto
        })
            .then(async () => {
                toast.success("Successfully registered!")
                await signIn('credentials', {
                    email: dto.email,
                    password: dto.password,
                    callbackUrl: "/"
                })
            })

    }, [registerUser, validationErrors])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto space-y-8 w-3/4"
        >
            <Input
                id="email"
                label="Email Address"
                register={register}
                isRequired
                isClearable
                isDisabled={isRegistering}
            />
            <div className="flex gap-6">
                <Input
                    id="firstName"
                    label="Last Name"
                    register={register}
                    isRequired
                    isClearable
                    isDisabled={isRegistering}
                />
                <Input
                    id="lastName"
                    label="First Name"
                    register={register}
                    isRequired
                    isClearable
                    isDisabled={isRegistering}
                />
            </div>
            <Input
                id="password"
                register={register}
                isRequired
                label={"Password"}
                placeholder="Enter your password"
                type="password"
                value={password}
                onValueChange={setPassword}
                isDisabled={isRegistering}
                setValidationErrors={setValidationErrors}
                validation={{
                    predicate(value) {
                        if (!value)
                            return true
                        return PASSWORD_REGEX.test(value)
                    },
                    errorMsg: "Password must have at least 8 characters with 1 uppercase character, 1 lowercase character and 1 number."
                }}
            />
            <Input
                id="confirmedPassword"
                register={register}
                isRequired
                label={"Confirm Password"}
                placeholder="Confirm your password"
                type="password"
                value={confirmedPassword}
                onValueChange={setConfirmedPassword}
                setValidationErrors={setValidationErrors}
                isDisabled={isRegistering}
                validation={{
                    predicate(value) {
                        if (!value)
                            return true;
                        return password === confirmedPassword
                    },
                    errorMsg: "Passwords must match."
                }}
            />
            <Divider/>
            <Button
                isLoading={isRegistering}
                isDisabled={isRegistering}
                type="submit"
                color="primary"
                variant="shadow"
                fullWidth
            >Register</Button>
        </form>
    )
}

export default RegisterForm