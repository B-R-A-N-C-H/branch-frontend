import Member from "@/app/utils/types/models/member";

export type RegistrationPeriod = {
    id: string,
    name: string,

    starts: string,
    ends: string,

    entries?: RegistrationEntry[],

    createdAt: string,
    updatedAt: string,
}

export type RegistrationEntry = {
    id: string,
    approved: boolean | null,

    memberId: string,
    by?: Member | null,

    gradeLevel: number,
    childFirstName: string,
    childLastName: string,
    childDateOfBirth: string,

    streetName: string,
    city: string,
    parish: string,

    emergencyContactNumber: string,
    secondaryEmergencyContactNumber: string

    registrationPeriodId: string,
    for?: RegistrationPeriod | null,

    createdAt: string,
    updatedAt: string,
}

export type RegistrationDocument = {
    id: string,
    name: string,

    createdAt: string,
    updatedAt: string,
}