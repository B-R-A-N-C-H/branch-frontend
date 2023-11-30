"use client"

import {
    ArrayDataContextState,
    createDataContext,
    DataContextProps, useOptimisticArrayEdit,
    useOptimisticArrayRemove
} from "@/app/utils/client/context-utils";
import {Student} from "@/app/utils/types/models/student";
import {FC, PropsWithChildren} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {KeyedMutator} from "swr";

interface ContextProps extends DataContextProps {
    contents: ArrayDataContextState<Student>
}

const [Context, hook] = createDataContext<ContextProps>("useStudents must be used in a StudentsProvider!")

const StudentsProvider: FC<PropsWithChildren> = ({children}) => {
    const {
        data: students,
        isLoading: studentsLoading,
        mutate: mutateStudents
    } = useAuthorizedSWR<Student[]>('/students', $get<Student[]>)

    const removeOptimisticStudent = useOptimisticArrayRemove<Student>(students, mutateStudents, (arr, removed) => (
        arr.filter(student => student.id !== removed.id)
    ))

    const editOptimisticStudent = useOptimisticArrayEdit<Student>(students, mutateStudents, (arr, removed) => (
        arr.filter(student => student.id !== removed.id)
    ))

    return (
        <Context.Provider value={{
            contents: {
                data: students ?? [],
                loading: studentsLoading,
                mutateData: students && (mutateStudents as KeyedMutator<Student[]>),
                optimisticData: {
                    removeOptimisticData: removeOptimisticStudent,
                    editOptimisticData: editOptimisticStudent
                }
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default StudentsProvider

export const useStudents = hook