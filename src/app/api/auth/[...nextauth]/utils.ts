import {AuthOptions, DefaultSession} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {NestResponse} from "@/app/utils/types/nest";
import Member from "@/app/utils/types/models/member";
import {api} from "@/app/utils/api/api-utils";
import {JWT} from "next-auth/jwt";

const refreshToken = async (token: JWT): Promise<JWT | undefined> => {
    const response = await api.post<NestResponse<RefreshResponse>>('/auth/refresh', undefined, {
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`
        }
    }).then(res => res.data as RefreshResponse)
        .catch(err => {
            console.error(err)
            return undefined
        })

    if (!response)
        return;

    return {...token, ...response}
}

const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: "email", type: "text"},
                password: {label: "password", type: "password"}
            },
            // @ts-ignore
            async authorize(credentials, req) {
                if (!credentials)
                    throw new Error("Missing credentials!");

                const response = await api.post<NestResponse<LoginResponse>>('/auth/login', {
                    email: credentials.email,
                    password: credentials.password
                })

                if (response.status !== 201) {
                    console.error(response)
                    throw new Error("Something went wrong!")
                }
                return response.data
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user)
                return {...token, ...user}

            if (Date.now() < token.backendTokens.expiresIn)
                return token;

            const refreshedToken = await refreshToken(token)
            if (!refreshedToken)
                throw new Error("Refresh token is invalid!")
            return refreshedToken
        },
        async session({token, session}) {
            session.user = token.member
            session.backendTokens = token.backendTokens
            return session
        }
    }
}

export default authOptions

declare module "next-auth" {
    interface Session extends DefaultSession, Omit<LoginResponse, "member"> {
        user: Member
    }


}

declare module "next-auth/jwt" {
    interface JWT extends LoginResponse {
    }
}

type LoginResponse = {
    member: Member,
    backendTokens: {
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
    }
}

export type RefreshResponse = Pick<LoginResponse, "backendTokens">