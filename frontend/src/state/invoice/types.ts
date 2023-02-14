
export interface tabActiveType {
    isSent:boolean
}
export interface tabActiveNewInvoiceType {
    isActive:number
}
export interface allInvoiceType {
    invoice_all:{
        senderEmail: string,
        billFrom:string,
        billTo:string,
        shipTo: string,
        issueDate: string,
        dueDate: string,
        paymentTerms:string,
        poNumber:string,
        items: string,
        notes:string,
        terms:string,
        tax:string,
        taxType:string,
        discount:string,
        shipping:string,
        amountPaid:string,
        logo: any,
    }
}
