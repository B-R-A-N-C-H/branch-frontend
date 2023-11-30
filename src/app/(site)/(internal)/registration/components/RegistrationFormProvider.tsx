"use client"

import {FC, PropsWithChildren, useCallback} from "react";
import {SubmitHandler, useForm, UseFormReturn} from "react-hook-form";
import {createGenericContext} from "@/app/utils/client/context-utils";
import {useRegistrationEntries} from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";
import {transformInputDate} from "@/app/utils/client/client-utils";
import {$post, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {RegistrationEntry, RegistrationPeriod} from "@/app/utils/types/models/registration";
import toast from "react-hot-toast";
import {
    useRegistrationPeriods
} from "@/app/(site)/(internal)/admin/registrations/components/periods/RegistrationPeriodProvider";

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
    secondaryEmergencyContactNumber: string,
    registrationPeriodId: string,
}

export type RegistrationFormProps = Omit<RegistrationEntryDto, 'gradeLevel' | 'childDateOfBirth' | 'registrationPeriodId'> & {
    gradeLevel: string,
    childDateOfBirth: string,
}

type Context = {
    form: Omit<UseFormReturn<RegistrationFormProps>, "handleSubmit">,
    currentPeriod?: RegistrationPeriod
}

type Props = {
    onSubmit?: () => void
} & PropsWithChildren

const [RegistrationFormContext, hook] = createGenericContext<Context>("useRegistrationFormData must be used in a RegistrationFormProvider!")

const CreateEntry = () =>
    useAuthorizedSWRMutation<RegistrationEntryDto, RegistrationEntry>('/registration/entries', $post<RegistrationEntryDto, RegistrationEntry>)

const RegistrationFormProvider: FC<Props> = ({children, onSubmit}) => {
    const {periods: {currentPeriod}} = useRegistrationPeriods()
    const {entries: {optimisticData: {addOptimisticData: addOptimisticEntry}}} = useRegistrationEntries()
    const {trigger: create} = CreateEntry()
    const {handleSubmit, ...form} = useForm<RegistrationFormProps>()

    const submitHandler: SubmitHandler<RegistrationFormProps> = useCallback(async (dto) => {
        if (!currentPeriod)
            return

        const {childDateOfBirth, gradeLevel, ...restDto} = dto

        const dob = transformInputDate(childDateOfBirth) ?? new Date()
        let gradeLevelInt: number = 1
        switch (gradeLevel) {
            case "second": {
                gradeLevelInt = 2;
                break;
            }
            case "third": {
                gradeLevelInt = 3;
                break;
            }
        }

        const createEntry = () => create({
            body: {
                ...restDto,
                gradeLevel: gradeLevelInt,
                registrationPeriodId: currentPeriod.id,
                childDateOfBirth: dob
            }
        })
            .then(entry => {
                if (entry) {
                    toast.success(`Successfully created a new registration entry for ${dto.childFirstName} ${dto.childLastName}!`)
                    if (onSubmit)
                        onSubmit()
                }
                return entry
            })

        if (addOptimisticEntry)
            await addOptimisticEntry(createEntry, {
                id: "",
                registrationPeriodId: currentPeriod.id,
                approved: null,
                ...restDto,
                gradeLevel: gradeLevelInt,
                childDateOfBirth: dob.toString(),
                createdAt: new Date().toString(),
                updatedAt: new Date().toString()
            })

    }, [addOptimisticEntry, create, currentPeriod, onSubmit])

    return (
        <RegistrationFormContext.Provider value={{form, currentPeriod}}>
            <form onSubmit={handleSubmit(submitHandler)}>
                {children}
            </form>
        </RegistrationFormContext.Provider>
    )
}

export default RegistrationFormProvider

export const useRegistrationFormData = hook;