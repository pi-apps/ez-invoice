import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const schemaOptions = {
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' },
};
const schema = new Schema({
    invoiceId: { type: String, required: true },
    invoiceNumber: { type: Number, required: true },
    uid: { type: String, required: true },
    receiverId: { type: String, default: "" },
    senderEmail: { type: String, required: true },
    billFrom: { type: Object, required: true },
    billTo: { type: Object, required: true },
    shipTo: { type: Object, default: "" },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    paymentTerms: { type: String, default: "" },
    poNumber: { type: String, rdefault: ""},
    items: { type: Array, required: true },
    notes: { type: String, default: "" },
    terms: { type: String, default: "" },
    subTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    taxType: { type: Number, default: 1 }, // 0: no tax, 1: percentage, 2: fixed
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    amountDue: { type: Number, required: true },
    status: { type: String, default: "draft" },
    paid: { type: Boolean, default: false },
    downloadUrl: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    pi_payment_id: { type: String, default: "" },
    signature: { type: String, default: "" },
}, schemaOptions);

schema.set('toJSON', { virtuals: true });

const InvoicesModel = mongoose.model('invoices', schema);
export default InvoicesModel;
