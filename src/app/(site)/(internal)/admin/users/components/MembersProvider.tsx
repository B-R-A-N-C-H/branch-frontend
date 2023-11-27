"use client"

import {
    createDataContext,
    DataContextProps,
    DataContextState,
    useOptimisticArrayAdd, useOptimisticArrayEdit, useOptimisticArrayRemove
} from "@/app/utils/client/context-utils";
import Member from "@/app/utils/types/models/member";
import {FC, PropsWithChildren, useCallback} from "react";
import {$fetch, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {KeyedMutator} from "swr";

interface MembersContextProps extends DataContextProps {
    members: DataContextState<Member[], Member>
}

const [Context, hook] = createDataContext<MembersContextProps>("useMembers must be used in a MembersProvider!")

const MembersProvider: FC<PropsWithChildren> = ({children}) => {
    const {
        data: members,
        isLoading: membersLoading,
        mutate: mutateMembers
    } = useAuthorizedSWR('/members', $fetch<Member[]>)

    const addOptimisticMember = useOptimisticArrayAdd<Member>(members, mutateMembers)

    const removeOptimisticMember = useOptimisticArrayRemove<Member>(members, mutateMembers, (arr, removed) => (
        arr.filter(arrMember => arrMember.id !== removed.id)
    ))

    const editOptimisticMember = useOptimisticArrayEdit<Member>(members, mutateMembers, (arr, removed) => (
        arr.filter(arrMember => arrMember.id !== removed.id)
    ))

    return (
        <Context.Provider value={{
            members: {
                data: members ?? [],
                loading: membersLoading,
                mutateData: members ? (mutateMembers as KeyedMutator<Member[]>) : undefined,
                optimisticData: {
                    addOptimisticData: addOptimisticMember,
                    removeOptimisticData: removeOptimisticMember,
                    editOptimisticData: editOptimisticMember
                }
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default MembersProvider

export const useMembers = hook