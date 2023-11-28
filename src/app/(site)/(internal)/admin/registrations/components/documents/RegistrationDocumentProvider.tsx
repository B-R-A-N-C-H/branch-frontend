import {
    createDataContext,
    DataContextProps,
    DataContextState,
    useOptimisticArrayAdd, useOptimisticArrayRemove
} from "@/app/utils/client/context-utils";
import {RegistrationDocument} from "@/app/utils/types/models/registration";
import {FC, PropsWithChildren} from "react";
import {$get, useAuthorizedSWR} from "@/app/utils/swr-utils";
import {KeyedMutator} from "swr";

interface Context extends DataContextProps {
    documents: DataContextState<RegistrationDocument[], RegistrationDocument>
}

const [Context, hook] = createDataContext<Context>("useRegistrationDocuments must be used in a RegistrationDocumentProvider!")

const RegistrationDocumentProvider: FC<PropsWithChildren> = ({children}) => {
    const {
        data: documents,
        isLoading: documentsLoading,
        mutate: mutateDocuments
    } = useAuthorizedSWR('/registration/documents', $get<RegistrationDocument[]>)

    const addOptimisticDocument = useOptimisticArrayAdd<RegistrationDocument>(documents, mutateDocuments)

    const removeOptimisticDocument = useOptimisticArrayRemove<RegistrationDocument>(documents, mutateDocuments,
        (arr, removed) => arr.filter(doc => doc.id !== removed.id)
    )

    return (
        <Context.Provider value={{
            documents: {
                data: documents ?? [],
                loading: documentsLoading,
                mutateData: documents ? (mutateDocuments as KeyedMutator<RegistrationDocument[]>) : undefined,
                optimisticData: {
                    addOptimisticData: addOptimisticDocument,
                    removeOptimisticData: removeOptimisticDocument
                }
            }
        }}>
            {children}
        </Context.Provider>
    )
}

export default RegistrationDocumentProvider

export const useRegistrationDocuments = hook