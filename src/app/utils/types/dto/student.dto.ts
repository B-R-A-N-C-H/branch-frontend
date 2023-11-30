export type UpdateStudentDto = Partial<{
    firstName: string,
    lastName: string,
    gradeLevel: number,
    streetName: string,
    city: string,
    parish: string,
    childDateOfBirth: Date,
    emergencyContactNumber: string,
    secondaryEmergencyContactNumber: string,
}>