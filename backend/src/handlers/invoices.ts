import { Router } from "express";

import platformAPIClient from "../services/platformAPIClient";
import InvoicesModel from "../models/invoices";

export default function mountInvoiceEndpoints(router: Router) {
    // Create an invoice
    router.post('/create', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const currentUser = req.session.currentUser;
        const numOfInvoices = await InvoicesModel.countDocuments({ uid: currentUser.uid });
        const invoice = {
            invoiceId: `EZ_${Date.now()}`,
            invoiceNumber: numOfInvoices + 1,
            uid: currentUser.uid,
            billFrom: req.body.billFrom,
            billTo: req.body.billTo,
            shipTo: req.body.shipTo,
            issueDate: new Date(),
            dueDate: req.body.dueDate,
            paymentTerms: req.body.paymentTerms,
            poNumber: req.body.poNumber,
            items: req.body.items,
            notes: req.body.notes,
            terms: req.body.terms,
            subTotal: req.body.subTotal,
            tax: req.body.tax,
            discount: req.body.discount,
            shipping: req.body.shipping,
            total: req.body.total,
            amountPaid: req.body.amountPaid,
            amountDue: req.body.amountDue,
            status: "unpaid",
            paid: false
        };

        const newInvoice = new InvoicesModel(invoice);
        await newInvoice.save();

        return res.status(200).json(newInvoice);
    });

    // Get all invoices
    router.get('/all', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const currentUser = req.session.currentUser
        const invoices = await InvoicesModel.find({ uid: currentUser.uid });
        return res.status(200).json(invoices);
    });

    // Get an invoice
    router.get('/:invoiceId', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const currentUser = req.session.currentUser
        const invoice = await InvoicesModel.findOne({ uid: currentUser.uid, invoiceId: req.params.invoiceId });
        if (!invoice) {
            return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
        }
        return res.status(200).json(invoice);
    });
}