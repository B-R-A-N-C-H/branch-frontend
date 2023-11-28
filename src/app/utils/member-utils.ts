import Member, {Role} from "@/app/utils/types/models/member";
import {Session, User} from "next-auth";

/**
 * This function checks if a member has permission to access the permissions of a specific role.
 * The function works in a hierarchical manner, meaning if the user has {@link Role.ADMIN} or
 * {@link Role.PRINCIPAL} they will automatically have permissions to do anything {@link Role.HEAD_TEACHER}
 * or {@link Role.TEACHER} can do. If the member has a permission of {@link Role.HEAD_TEACHER} they will be
 * able to do anything {@link Role.TEACHER} can do.
 *
 * @param member The member to check
 * @param role The minimum role to check permission for
 */
export const memberHasRole = (member?: Member, role: Role = Role.TEACHER): boolean => {
    if (!member)
        return false
    if (member.role === Role.ADMIN || member.role === Role.PRINCIPAL)
        return true;
    if (member.role === Role.HEAD_TEACHER && role === Role.TEACHER)
        return true;
    return member.role === role
}

export const userHasRole = (session?: Session | null, role: Role = Role.TEACHER): boolean => {
    if (!session)
        return false
    if (session.user.role === Role.ADMIN || session.user.role === Role.PRINCIPAL)
        return true;
    if (session.user.role === Role.HEAD_TEACHER && role === Role.TEACHER)
        return true;
    return session.user.role === role
}