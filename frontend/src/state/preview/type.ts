

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
    taxType:string,
    discount: number,
    shipping: number,
    amountPaid: number,
    discountType:number
}

export interface PreviewType {
    dataPreview: ItemsPreview
}

export interface Images {
    images: any
}