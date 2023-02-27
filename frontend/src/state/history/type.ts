
export interface Items {
    name: string,
    quantity: number,
    price: number
}

export interface ItemsDetails {
    discountType: number,
    _id: string,
    invoiceId: string,
    invoiceNumber: string,
    uid: string,
    receiverId: string,
    senderEmail: string,
    billFrom: string,
    billTo: string,
    shipTo: string,
    issueDate: string,
    dueDate: string,
    paymentTerms: string,
    poNumber: string,
    items:Items[]
    notes: string,
    terms: string,
    subTotal: number,
    tax: number,
    taxType: number,
    discount: number,
    shipping: number,
    total: number,
    amountPaid: number,
    amountDue: number,
    status: string,
    paid: boolean,
    downloadUrl: string | null,
    logoUrl: string, 
    piPaymentId: string,
    signature: string,
    createAt: string,
    updateAt: string,
    __v: number,
    id: string
}

export interface ListHistory {
    listItems: ItemsDetails[]
}

