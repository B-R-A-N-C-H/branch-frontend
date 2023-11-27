"use client"

import {FC, PropsWithChildren, useCallback} from "react";
import {SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {createGenericContext} from "@/app/utils/client/context-utils";

export type RegistrationEntryDto = {
    memberId: string,
    gradeLevel: number,
    childFirstName: string,
    childLastName: string,
    childDateOfBirth: Date,
    streetName: string,
    city: string,
    parish: string,
    emergencyContactNumber: string,
    secondaryEmergencyContactNumber?: string
}

type Context = {
    form: Omit<UseFormReturn<RegistrationEntryDto>, "handleSubmit">
}

const [RegistrationFormContext, hook] = createGenericContext<Context>("useRegistrationFormData must be used in a RegistrationFormProvider!")

const RegistrationFormProvider: FC<PropsWithChildren> = ({children}) => {
    const {handleSubmit, ...form} = useForm<RegistrationEntryDto>()

    const onSubmit: SubmitHandler<RegistrationEntryDto> = useCallback((dto) => {
        console.log(dto)
    }, [])

    return (
        <RegistrationFormContext.Provider value={{form}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </RegistrationFormContext.Provider>
    )
}

export default RegistrationFormProvider

export const useRegistrationFormData = hook;