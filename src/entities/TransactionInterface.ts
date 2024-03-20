// import { AttachmentInterface } from "./AttachmentInterface";

export interface TransactionInterface {
    _id: string
    accoundId: string,
    type: string,
    title: string,
    category: string,
    amount: string,
    date: string,
    payee: string,
    currency: string,
    description: string,
    // attachments: AttachmentInterface
}