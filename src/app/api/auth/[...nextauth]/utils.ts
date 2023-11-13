import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {JwtPayload, NestResponse} from "@/app/utils/types/nest";
import Member from "@/app/utils/types/models/member";
import {api} from "@/app/utils/api-utils";

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

                const response = await api.post<NestResponse<Member>>('/auth/login', {
                    email: credentials.email,
                    password: credentials.password
                })

                if (response.status !== 201) {
                    console.error(response)
                    throw new Error("Something went wrong!")
                }

                const data = response.data as Member
                const payload: JwtPayload = {
                    username: data.email,
                    sub: {
                        name: data.firstName,
                        lastName: data.lastName
                    }
                }

                return payload
            }
        })
    ]
}

export default authOptions