"use client"

import {FC} from "react";
import {
    useRegistrationFormData
} from "@/app/(site)/(internal)/registration/components/RegistrationFormProvider";
import Input from "@/app/(site)/components/inputs/Input";

const RegistrationContactInfoForm: FC = () => {
    const {form: {register}} = useRegistrationFormData()

    return (
        <form className="space-y-6">
            <Input
                id="streetName"
                register={register}
                label="Lot #, Street Name"
                aria-label="Street"
                isRequired
                isClearable
            />
            <div className="flex gap-6 phone:flex-col">
                <Input
                    id="city"
                    register={register}
                    label="City"
                    aria-label="City"
                    isRequired
                    isClearable
                />
                <Input
                    id="parish"
                    register={register}
                    label="Parish"
                    aria-label="Parish"
                    isRequired
                    isClearable
                />
            </div>
            <Input
                id="emergencyContactNumber"
                type="tel"
                pattern={"876-[0-9]{3}-[0-9]{4}"}
                register={register}
                label="Emergency Contact"
                aria-label="Street"
                isRequired
                isClearable
            />
            <Input
                id="secondaryEmergencyContactNumber"
                type="tel"
                pattern={"876-[0-9]{3}-[0-9]{4}"}
                register={register}
                label="Secondary Emergency Contact"
                aria-label="Street"
                isRequired
                isClearable
            />
        </form>
    )
}

export default RegistrationContactInfoForm