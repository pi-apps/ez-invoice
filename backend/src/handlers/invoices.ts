import { Router } from "express";
import multer from 'multer';
import platformAPIClient from "../services/platformAPIClient";
import InvoicesModel from "../models/invoices";
import utils from "../services/utils";

const upload = multer({ dest: "uploads/"});

export default function mountInvoiceEndpoints(router: Router) {
    // Create an invoice
    router.post('/create', upload.single("logo"), async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const currentUser = req.session.currentUser;
        const numOfInvoices = await InvoicesModel.countDocuments({ uid: currentUser.uid });
        const file = req.file;
        const logoUrl = await utils.uploadToIpfs(file);
        
        const items = JSON.parse(req.body.items);
        let subTotal = 0;
        for (let i = 0; i < items.length; i++) {
            subTotal += items[i].price * items[i].quantity;
        }
        const tax = req.body.tax;
        const taxType = req.body.taxType;
        const discount = req.body.discount;
        const shipping = req.body.shipping;
        const total = taxType == 1 ? subTotal + subTotal * Number(tax) / 100 - Number(discount) + Number(shipping) : subTotal + Number(tax) - Number(discount) + Number(shipping);
        const amountPaid = req.body.amountPaid;
        const amountDue = total - Number(amountPaid);
        const invoice = {
            invoiceId: `EZ_${Date.now()}`,
            invoiceNumber: numOfInvoices + 1,
            uid: currentUser.uid,
            senderEmail: req.body.senderEmail,
            billFrom: req.body.billFrom,
            billTo: req.body.billTo,
            shipTo: req.body.shipTo,
            issueDate: new Date(),
            dueDate: req.body.dueDate,
            paymentTerms: req.body.paymentTerms,
            poNumber: req.body.poNumber,
            items: items,
            notes: req.body.notes,
            terms: req.body.terms,
            subTotal: subTotal,
            tax: tax,
            taxType: taxType,
            discount: discount,
            shipping: shipping,
            total: total,
            amountPaid: amountPaid,
            amountDue: amountDue,
            status: "unpaid",
            paid: false,
            logoUrl: logoUrl,
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
    router.get('/detail/:invoiceId', async (req, res) => {
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

    // Download an invoice
    router.get('/download/:invoiceId', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const currentUser = req.session.currentUser
        const invoice = await InvoicesModel.findOne({ uid: currentUser.uid, invoiceId: req.params.invoiceId });
        if (!invoice) {
            return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
        }
        if (invoice.downloadUrl) {
            return res.status(200).json(invoice.downloadUrl);
        }
        const downloadUrl = await utils.generatePdf(invoice);
        // update the invoice with the download url
        await InvoicesModel.updateOne({ uid: currentUser.uid, invoiceId: req.params.invoiceId }, { downloadUrl: downloadUrl });
        return res.status(200).json(downloadUrl);
    });

    // send email an invoice
    router.post('/send', async (req, res) => {
        if (!req.session.currentUser) {
            return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
        }
        const currentUser = req.session.currentUser
        const invoice = await InvoicesModel.findOne({ uid: currentUser.uid, invoiceId: req.body.invoiceId });
        if (!invoice) {
            return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
        }
        if (!invoice.downloadUrl) {
            const downloadUrl = await utils.generatePdf(invoice);
            // update the invoice with the download url
            await InvoicesModel.updateOne({ uid: currentUser.uid, invoiceId: req.body.invoiceId }, { downloadUrl: downloadUrl });
        }
        await utils.sendEmail(invoice, req.body.email, currentUser.username);
        return res.status(200).json({ message: "Email sent" });
    });
}