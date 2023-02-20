import { Router } from "express";
import multer from 'multer';
import { AuthenUser } from "../services/authen";
import InvoicesModel from "../models/invoices";
import utils from "../services/utils";

const upload = multer({ dest: "uploads/" });

export default function mountInvoiceEndpoints(router: Router) {
    // Create an invoice
    router.post('/create', upload.single("logo"), async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            const numOfInvoices = await InvoicesModel.countDocuments({ uid: currentUser.uid });
            const file = req.file;
            let logoUrl = "";
            if (file) {
                logoUrl = await utils.uploadToIpfs(file);
            }

            const items = JSON.parse(req.body.items);
            let subTotal = 0;
            for (let i = 0; i < items.length; i++) {
                subTotal += items[i].price * items[i].quantity;
            }
            const tax = req.body.tax;
            const taxType = req.body.taxType;
            const discount = req.body.discount;
            const discountType = req.body.discountType;
            const shipping = req.body.shipping;
            const amountTax = taxType == 1 ? subTotal * Number(tax) / 100 : Number(tax);
            const amountDiscount = discountType == 1 ? subTotal * Number(discount) / 100 : Number(discount);
            const total = subTotal + amountTax - amountDiscount + Number(shipping);
            const amountPaid = req.body.amountPaid;
            const amountDue = total - Number(amountPaid);
            const invoice: any = {
                invoiceId: `EZ_${Date.now()}`,
                invoiceNumber: numOfInvoices + 1,
                uid: currentUser.uid,
                senderEmail: req.body.senderEmail,
                billFrom: req.body.billFrom,
                billTo: req.body.billTo,
                shipTo: req.body.shipTo,
                issueDate: req.body.issueDate ? req.body.issueDate : Date(),
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
                discountType: discountType,
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
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // Get all invoices sent
    router.get('/all-sent', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            const invoices = await InvoicesModel.find({ uid: currentUser.uid });
            return res.status(200).json(invoices);
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // Get all invoices received
    router.get('/all-received', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            const invoices = await InvoicesModel.find({ receiverId: currentUser.uid });
            return res.status(200).json(invoices);
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // Get an invoice
    router.get('/detail/:invoiceId', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            // find by uid or receiverId
            const invoice = await InvoicesModel.findOne({ $or: [{ uid: currentUser.uid }, { receiverId: currentUser.uid }], invoiceId: req.params.invoiceId });
            if (!invoice) {
                return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
            }
            return res.status(200).json(invoice);
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // Download an invoice
    router.get('/download', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            const invoice = await InvoicesModel.findOne({ uid: currentUser.uid, invoiceId: req.query.invoiceId });
            if (!invoice) {
                return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
            }
            // if (invoice.downloadUrl) {
            //     return res.status(200).json(invoice.downloadUrl);
            // }
            const language = req.query.language || "en";
            const downloadUrl = await utils.generatePdf(invoice, language);
            // update the invoice with the download url
            await InvoicesModel.updateOne({ uid: currentUser.uid, invoiceId: req.query.invoiceId }, { downloadUrl: downloadUrl });
            return res.status(200).json(downloadUrl);
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // send email an invoice
    router.post('/send', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            const language = req.body.language || "en";
            const invoice = await InvoicesModel.findOne({ uid: currentUser.uid, invoiceId: req.body.invoiceId });
            if (!invoice) {
                return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
            }
            const downloadUrl = await utils.generatePdf(invoice, language);
            // update the invoice with the download url
            await InvoicesModel.updateOne({ uid: currentUser.uid, invoiceId: req.body.invoiceId }, { downloadUrl: downloadUrl });
            // generate signature
            const signature = utils.generateRandomString(64);
            // update the invoice with the signature
            await InvoicesModel.updateOne({ uid: currentUser.uid, invoiceId: req.body.invoiceId }, { signature: signature });
            // send email
            await utils.sendEmail(invoice, req.body.email, currentUser.username, signature, language);
            return res.status(200).json({ message: "Email sent" });
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });
}