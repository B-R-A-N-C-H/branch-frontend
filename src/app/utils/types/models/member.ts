export enum Role {
    TEACHER = "TEACHER",
    HEAD_TEACHER = "HEAD_TEACHER",
    PRINCIPAL = "PRINCIPAL",
    ADMIN = "ADMIN"
}

type Member = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    createdAt: string,
    updatedAt: string,
    role: Role | null
}

export default Member