"use client"

import useSWR from "swr";
import {$fetch} from "@/app/utils/swr-utils";
import Member from "@/app/utils/types/models/member";
import {useSession} from "next-auth/react";

const useMemberData = () => {
    const {data: session} = useSession()
    return useSWR(session?.user && '/members/@me', $fetch<Member>(session?.backendTokens.accessToken))
}

export default useMemberData