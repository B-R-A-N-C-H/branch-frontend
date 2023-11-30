"use client"

import {FC, useCallback, useState} from "react";
import {RegistrationEntry} from "@/app/utils/types/models/registration";
import {KeyedMutator} from "swr";
import Title from "@/app/(site)/components/Title";
import {Divider} from "@nextui-org/divider";
import Input from "@/app/(site)/components/inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {RegistrationFormProps} from "@/app/(site)/(internal)/registration/components/RegistrationFormProvider";
import {formatDate, transformInputDate} from "@/app/utils/client/client-utils";
import Select from "@/app/(site)/components/inputs/Select";
import {Button, SelectItem} from "@nextui-org/react";
import {EditIcon} from "@nextui-org/shared-icons";
import {$patch, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {UpdateRegistrationEntryDto} from "@/app/utils/types/dto/registration.dto";
import {useRegistrationEntries} from "@/app/(site)/(internal)/registration/components/RegistrationEntriesProvider";
import toast from "react-hot-toast";

type Props = {
    entry: RegistrationEntry,
    onEdit?: () => void,
}

type FormProps = Partial<RegistrationFormProps>

const parseGradeLevel = (level: number) => {
    switch (level) {
        case 1:
            return "first"
        case 2:
            return "second"
        case 3:
            return "third"
    }
}

const gradeLevelToNum = (level: string) => {
    switch (level) {
        case "first":
            return 1
        case "second":
            return 2
        case "third":
            return 3
    }
}

const UpdateEntry = (entryId: string) =>
    useAuthorizedSWRMutation<UpdateRegistrationEntryDto, RegistrationEntry>(
        `/registration/entries/${entryId}`,
        $patch<UpdateRegistrationEntryDto, RegistrationEntry>
    )

const EditRegistrationForm: FC<Props> = ({entry, onEdit}) => {
    const {entries: {optimisticData: {editOptimisticData: editOptimisticEntry}}} = useRegistrationEntries()
    const {trigger: edit} = UpdateEntry(entry.id)
    const [formState, setFormState] = useState<FormProps>({})
    const {register, handleSubmit} = useForm<FormProps>()

    const onSubmit: SubmitHandler<FormProps> = useCallback((data) => {
        (Object.keys(data) as (keyof FormProps)[])
            .forEach(key => {
                if (!data[key])
                    data[key] = undefined
            })

        const {childDateOfBirth, gradeLevel, ...validData} = data
        const validDOB = childDateOfBirth ? transformInputDate(childDateOfBirth) : undefined
        const validGradeLevel = gradeLevel ? gradeLevelToNum(gradeLevel) : undefined

        const doEdit = () => edit({
            body: {
                ...validData,
                childDateOfBirth: validDOB,
                gradeLevel: validGradeLevel
            }
        }).then(entry => {
            if (entry)
                toast.success(`Successfully edit ${entry.childFirstName} ${entry.childLastName}`)
            return entry
        })

        if (editOptimisticEntry) {
            editOptimisticEntry(doEdit, {
                ...entry,
                childFirstName: validData.childFirstName ?? entry.childFirstName,
                childLastName: validData.childLastName ?? entry.childLastName,
                childDateOfBirth: validDOB?.toString() ?? entry.childDateOfBirth,
                gradeLevel: validGradeLevel ?? entry.gradeLevel,
                streetName: validData.streetName ?? entry.streetName,
                city: validData.childFirstName ?? entry.childFirstName,
                parish: validData.childFirstName ?? entry.childFirstName,
                secondaryEmergencyContactNumber: validData.childFirstName ?? entry.childFirstName,
                emergencyContactNumber: validData.childFirstName ?? entry.childFirstName,

            })

            if (onEdit)
                onEdit()
        }
    }, [edit, editOptimisticEntry, entry, onEdit])

    const updateFormState = useCallback((key: keyof FormProps, val: unknown) => {
        setFormState(prev => ({
            ...prev,
            [key]: val
        }))
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <Title>General Information</Title>
            <div className="flex gap-x-6 phone:flex-col">
                <Input
                    id="childFirstName"
                    register={register}
                    value={formState.childFirstName ?? entry.childFirstName}
                    onValueChange={val => updateFormState('childFirstName', val)}
                    label="Child First Name"
                    aria-label="Child First Name"
                    isClearable
                />
                <Input
                    id="childLastName"
                    register={register}
                    value={formState.childLastName ?? entry.childLastName}
                    onValueChange={val => updateFormState('childLastName', val)}
                    aria-label="Child Last Name"
                    label="Child Last Name"
                    isClearable
                />
            </div>
            <Input
                id="childDateOfBirth"
                register={register}
                value={formState.childDateOfBirth ?? formatDate(new Date(entry.childDateOfBirth), "-")}
                onValueChange={val => updateFormState('childDateOfBirth', val)}
                type='date'
                label="Date Of Birth"
                placeholder="Enter a DOB"
                max={formatDate(new Date(), "-")}
            />
            <Select
                id="gradeLevel"
                register={register}
                label="Grade Level"
                //@ts-ignore
                selectedKeys={[formState.gradeLevel ?? parseGradeLevel(entry.gradeLevel)]}
                onSelectionChange={selection => {
                    const selectedKey = (Array.from(selection) as string[])[0]
                    updateFormState('gradeLevel', selectedKey)
                }}
            >
                <SelectItem key="first" value={1}>Level 1</SelectItem>
                <SelectItem key="second" value={2}>Level 2</SelectItem>
                <SelectItem key="third" value={3}>Level 3</SelectItem>
            </Select>
            <Divider/>
            <Title>Communication Information</Title>
            <Input
                id="streetName"
                register={register}
                label="Lot #, Street Name"
                aria-label="Street"
                isClearable
                value={formState.streetName ?? entry.streetName}
                onValueChange={val => updateFormState('streetName', val)}
            />
            <div className="flex gap-6 phone:flex-col">
                <Input
                    id="city"
                    register={register}
                    label="City"
                    aria-label="City"
                    value={formState.city ?? entry.city}
                    onValueChange={val => updateFormState('city', val)}
                    isClearable
                />
                <Input
                    id="parish"
                    register={register}
                    label="Parish"
                    aria-label="Parish"
                    value={formState.parish ?? entry.parish}
                    onValueChange={val => updateFormState('parish', val)}
                    isClearable
                />
            </div>
            <Input
                id="emergencyContactNumber"
                type="tel"
                pattern={"876-[0-9]{3}-[0-9]{4}"}
                register={register}
                value={formState.emergencyContactNumber ?? entry.emergencyContactNumber}
                onValueChange={val => updateFormState('emergencyContactNumber', val)}
                label="Emergency Contact"
                aria-label="Street"
                isClearable
            />
            <Input
                id="secondaryEmergencyContactNumber"
                type="tel"
                pattern={"876-[0-9]{3}-[0-9]{4}"}
                register={register}
                value={formState.secondaryEmergencyContactNumber ?? entry.secondaryEmergencyContactNumber}
                onValueChange={val => updateFormState('secondaryEmergencyContactNumber', val)}
                label="Secondary Emergency Contact"
                aria-label="Street"
                isClearable
            />
            <Divider/>
            <div className="flex justify-end">
                <Button
                    color="primary"
                    variant="shadow"
                    startContent={<EditIcon/>}
                    type="submit"
                >
                    Edit Entry
                </Button>
            </div>
        </form>
    )
}

export default EditRegistrationForm