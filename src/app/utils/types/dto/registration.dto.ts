export type CreateRegistrationDto = {
    gradeLevel: number,
    childFirstName: string,
    childLastName: string,
    childDateOfBirth: Date,
    streetName: string,
    city: string,
    parish: string,
    emergencyContactNumber: string,
    secondaryEmergencyContactNumber: string,
}

export type UpdateRegistrationEntryDto = Partial<CreateRegistrationDto>

export type CreateRegistrationPeriodDto = {
    name: string,
    starts: Date,
    ends: Date,
}

export type UpdateRegistrationPeriodDto = Partial<CreateRegistrationPeriodDto>

export type ReviewRegistrationDto = {
    approved: boolean,
}