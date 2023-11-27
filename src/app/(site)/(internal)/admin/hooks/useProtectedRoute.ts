"use client"

import useMemberData from "@/app/hooks/useMemberData";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Role} from "@/app/utils/types/models/member";

const useProtectedRoute = (...allowedRoles: Role[]) => {
    const {data, isLoading} = useMemberData()
    const router = useRouter()

    useEffect(() => {
        if ((!data && !isLoading)
            || (data && !isLoading && !allowedRoles.some(role => data.role === role))
        )
            return router.push("/")
    }, [allowedRoles, data, isLoading, router])
}

export default useProtectedRoute