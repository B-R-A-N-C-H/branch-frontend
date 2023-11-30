"use client"

import {FC, useCallback, useState} from "react";
import {Student} from "@/app/utils/types/models/student";
import {KeyedMutator} from "swr";
import {$patch, useAuthorizedSWRMutation} from "@/app/utils/swr-utils";
import {UpdateStudentDto} from "@/app/utils/types/dto/student.dto";
import {
    EditRegistrationFormProps,
    gradeLevelToNum, parseGradeLevel
} from "@/app/(site)/(internal)/registration/components/edit/EditRegistrationForm";
import {SubmitHandler, useForm} from "react-hook-form";
import {formatDate, transformInputDate} from "@/app/utils/client/client-utils";
import toast from "react-hot-toast";
import Title from "@/app/(site)/components/Title";
import Input from "@/app/(site)/components/inputs/Input";
import Select from "@/app/(site)/components/inputs/Select";
import {Button, SelectItem} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {EditIcon} from "@nextui-org/shared-icons";
import {useStudents} from "@/app/(site)/(internal)/admin/students/components/StudentsProvider";

type Props = {
    student: Student,
    mutateStudent: KeyedMutator<Student | undefined>,
    onEdit?: () => void
}

type FormProps = EditRegistrationFormProps

const EditStudent = (studentId: string) =>
    useAuthorizedSWRMutation<UpdateStudentDto, Student>(
        `students/${studentId}`,
        $patch<UpdateStudentDto, Student>
    )

const EditStudentForm: FC<Props> = ({student, mutateStudent, onEdit}) => {
    const {contents: {optimisticData: {editOptimisticData: editOptimisticStudent}}} = useStudents()
    const {trigger: edit, isMutating: isEditing} = EditStudent(student.id)
    const [formState, setFormState] = useState<FormProps>({})
    const {register, handleSubmit} = useForm<FormProps>()

    const onSubmit: SubmitHandler<FormProps> = useCallback(async (data) => {
        (Object.keys(data) as (keyof FormProps)[])
            .forEach(key => {
                if (!data[key])
                    data[key] = undefined
            })

        const {childDateOfBirth, gradeLevel, childFirstName, childLastName, ...validData} = data
        const validDOB = childDateOfBirth ? transformInputDate(childDateOfBirth) : undefined
        const validGradeLevel = gradeLevel ? gradeLevelToNum(gradeLevel) : undefined

        const optimisticData: Student = {
            ...student,
            firstName: childFirstName ?? student.firstName,
            lastName: childLastName ?? student.lastName,
            childDateOfBirth: validDOB?.toString() ?? student.childDateOfBirth,
            gradeLevel: validGradeLevel ?? student.gradeLevel,
            streetName: validData.streetName ?? student.streetName,
            city: validData.city ?? student.city,
            parish: validData.parish ?? student.parish,
            secondaryEmergencyContactNumber: validData.secondaryEmergencyContactNumber ?? student.secondaryEmergencyContactNumber,
            emergencyContactNumber: validData.emergencyContactNumber ?? student.emergencyContactNumber,
        }

        const doEdit = () => edit({
            body: {
                ...validData,
                firstName: childFirstName,
                lastName: childLastName,
                childDateOfBirth: validDOB,
                gradeLevel: validGradeLevel
            }
        }).then(async (student) => {
            if (student) {
                toast.success(`Successfully edited ${student.firstName} ${student.lastName}`)
                await mutateStudent(optimisticData)
                if (onEdit)
                    onEdit()
            }
            return student
        })

        if (editOptimisticStudent)
            await editOptimisticStudent(doEdit, optimisticData)
    }, [student, editOptimisticStudent, edit, mutateStudent, onEdit])

    const updateFormState = useCallback((key: keyof EditRegistrationFormProps, val: unknown) => {
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
                    isDisabled={isEditing}
                    id="childFirstName"
                    register={register}
                    value={formState.childFirstName ?? student.firstName}
                    onValueChange={val => updateFormState('childFirstName', val)}
                    label="Child First Name"
                    aria-label="Child First Name"
                    isClearable
                />
                <Input
                    id="childLastName"
                    isDisabled={isEditing}
                    register={register}
                    value={formState.childLastName ?? student.lastName}
                    onValueChange={val => updateFormState('childLastName', val)}
                    aria-label="Child Last Name"
                    label="Child Last Name"
                    isClearable
                />
            </div>
            <Input
                id="childDateOfBirth"
                register={register}
                isDisabled={isEditing}
                value={formState.childDateOfBirth ?? formatDate(new Date(student.childDateOfBirth), "-")}
                onValueChange={val => updateFormState('childDateOfBirth', val)}
                type='date'
                label="Date Of Birth"
                placeholder="Enter a DOB"
                max={formatDate(new Date(), "-")}
            />
            <Select
                id="gradeLevel"
                register={register}
                isDisabled={isEditing}
                label="Grade Level"
                //@ts-ignore
                selectedKeys={[formState.gradeLevel ?? parseGradeLevel(student.gradeLevel)]}
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
                isDisabled={isEditing}
                id="streetName"
                register={register}
                label="Lot #, Street Name"
                aria-label="Street"
                isClearable
                value={formState.streetName ?? student.streetName}
                onValueChange={val => updateFormState('streetName', val)}
            />
            <div className="flex gap-6 phone:flex-col">
                <Input
                    isDisabled={isEditing}
                    id="city"
                    register={register}
                    label="City"
                    aria-label="City"
                    value={formState.city ?? student.city}
                    onValueChange={val => updateFormState('city', val)}
                    isClearable
                />
                <Input
                    id="parish"
                    register={register}
                    label="Parish"
                    aria-label="Parish"
                    isDisabled={isEditing}
                    value={formState.parish ?? student.parish}
                    onValueChange={val => updateFormState('parish', val)}
                    isClearable
                />
            </div>
            <Input
                id="emergencyContactNumber"
                type="tel"
                pattern={"876-[0-9]{3}-[0-9]{4}"}
                register={register}
                value={formState.emergencyContactNumber ?? student.emergencyContactNumber}
                isDisabled={isEditing}
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
                value={formState.secondaryEmergencyContactNumber ?? student.secondaryEmergencyContactNumber}
                onValueChange={val => updateFormState('secondaryEmergencyContactNumber', val)}
                isDisabled={isEditing}
                label="Secondary Emergency Contact"
                aria-label="Street"
                isClearable
            />
            <Divider/>
            <div className="flex justify-end">
                <Button
                    isDisabled={isEditing}
                    isLoading={isEditing}
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

export default EditStudentForm