"use client"

import {FC, useCallback} from "react";
import {
    RegistrationEntryDto,
    useRegistrationFormData
} from "@/app/(site)/(internal)/registration/components/RegistrationFormProvider";
import Input from "@/app/(site)/components/inputs/Input";
import {formatDate} from "@/app/utils/client/client-utils";
import Select from "@/app/(site)/components/inputs/Select";
import {SelectItem} from "@nextui-org/react";

const RegistrationGeneralInfoForm: FC = () => {
    const {form: {register}} = useRegistrationFormData()

    return (
        <div className="space-y-6">
            <div className="flex gap-x-6 phone:flex-col">
                <Input
                    id="childFirstName"
                    register={register}
                    label="Child First Name"
                    aria-label="Child First Name"
                    isRequired
                    isClearable
                />
                <Input
                    id="childLastName"
                    register={register}
                    aria-label="Child Last Name"
                    label="Child Last Name"
                    isRequired
                    isClearable
                />
            </div>
            <Input
                id="childDateOfBirth"
                register={register}
                type='date'
                label="Date Of Birth"
                placeholder="Enter a DOB"
                max={formatDate(new Date(), "-")}
            />
            <Select
                id="gradeLevel"
                register={register}
                isRequired
                label="Grade Level"
            >
                <SelectItem key="first" value={1}>Level 1</SelectItem>
                <SelectItem key="second" value={2}>Level 2</SelectItem>
                <SelectItem key="third" value={3}>Level 3</SelectItem>
            </Select>
        </div>
    )
}

export default RegistrationGeneralInfoForm