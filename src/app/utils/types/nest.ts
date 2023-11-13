export type NestErrorResponse = {
    statusCode: number,
    message: string
}

export type NestResponse<T> = T | NestErrorResponse

export type JwtPayload = {
    username: string,
    sub: {
        name: string,
        lastName: string,
    }
}