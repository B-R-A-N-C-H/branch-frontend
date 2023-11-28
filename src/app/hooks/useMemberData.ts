"use client"

import useSWR from "swr";
import {$get} from "@/app/utils/swr-utils";
import Member from "@/app/utils/types/models/member";
import {useSession} from "next-auth/react";

const useMemberData = () => {
    const {data: session} = useSession()
    return useSWR(session?.user && '/members/@me', $get<Member>(session?.backendTokens.accessToken))
}

export default useMemberData