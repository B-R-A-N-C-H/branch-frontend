export type CreateEventDto = {
    name: string,
    starts: Date,
    ends: Date
}

export type UpdateEventDto = Partial<CreateEventDto>