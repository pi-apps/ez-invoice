

export interface ItemsPreview {
    senderEmail: string,
    billFrom:string,
    billTo:string,
    shipTo:string,
    issueDate: any,
    dueDate: any,
    paymentTerms:string,
    poNumber:string,
    items: any,
    notes:string,
    terms:string,
    tax: number,
    taxType:number,
    discount: number,
    shipping: number,
    amountPaid: number,
    discountType:number,
    invoiceId:string|null,
    logoUrl:string|null
}

export interface PreviewType {
    dataPreview: ItemsPreview
}

export interface Images {
    images: any
}