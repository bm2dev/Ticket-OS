export type TicketType = {
    clientId: string,
    clientName: string,
    createdAt: string,
    updatedAt: string,
    description: string,
    status: number,
    subject: string,
    userId: string,
}

export type CustomerType = {
    email: string,
    name: string,
}