import {Role} from "@/app/utils/types/models/member";

export type CreateMemberDto = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export type EditMemberDto = Partial<CreateMemberDto> & {
    role?: Role | null
}