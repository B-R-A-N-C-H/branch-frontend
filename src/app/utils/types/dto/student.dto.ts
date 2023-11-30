export type UpdateStudentDto = Partial<{
    firstName: string,
    lastName: string,
    gradeLevel: string,
    streetName: string,
    city: string,
    parish: string,
    childDateOfBirth: string,
    emergencyContactNumber: string,
    secondaryEmergencyContactNumber: string,
}>