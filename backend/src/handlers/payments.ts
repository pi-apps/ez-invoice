import axios from "axios";
import { Router } from "express";
import platformAPIClient from "../services/platformAPIClient";
import "../types/session";
import { AuthenUser } from "../services/authen";
import InvoicesModel from "../models/invoices";
import utils from "../services/utils";

export default function mountPaymentsEndpoints(router: Router) {
    // payment deep link in email
    router.get('/deep-payment/:signature', async (req, res) => {
        try {
            const signature = req.params.signature;
            // Check if the signature is valid in database
            const invoice = await InvoicesModel.findOne({ signature: signature });
            if (!invoice) {
                return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
            }
            const url = `${process.env.PAYMENT_URL}/${signature}`;
            res.redirect(url);
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });
    // get invoice id from signature
    router.get('/get-invoice-id/:signature', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            // find by uid or receiverId
            const invoice = await InvoicesModel.findOne({ signature: req.params.signature });
            if (!invoice) {
                return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
            }
            return res.status(200).json(invoice.invoiceId);
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });
    // update receiver id
    router.post('/update-receiver', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            const receiverId = currentUser.uid;
            const invoiceId = req.body.invoiceId;
            const signature = req.body.signature;
            const invoice = await InvoicesModel.findOne({ invoiceId: invoiceId, signature: signature });
            if (!invoice) {
                return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
            }
            if (invoice.paid == true) {
                return res.status(400).json({ error: 'bad_request', message: "Invoice already paid" });
            }
            // update the invoice with the receiver id
            await InvoicesModel.updateOne({ invoiceId: invoiceId, signature: signature }, { receiverId: receiverId });
            return res.status(200).json({ message: "Receiver id updated" });
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // handle the incomplete payment
    router.post('/incomplete', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const payment: any = req.body.payment;
            const paymentId: any = payment?.identifier;
            const txid = payment?.transaction && payment?.transaction.txid;
            const txURL = payment?.transaction && payment?.transaction._link;

            // find the incomplete order
            const order = await InvoicesModel.findOne({ pi_payment_id: paymentId });

            // order doesn't exist 
            if (!order) {
                return res.status(400).json({ message: "Order not found" });
            }

            // check the transaction on the Pi blockchain
            const horizonResponse = await axios.create({ timeout: 20000 }).get(txURL);
            const paymentIdOnBlock = horizonResponse.data.memo;

            // and check other data as well e.g. amount
            if (paymentIdOnBlock !== order.pi_payment_id) {
                return res.status(400).json({ message: "Payment id doesn't match." });
            }

            // mark the order as paid
            await InvoicesModel.updateOne({ pi_payment_id: paymentId }, { $set: { txid, paid: true } });

            // let Pi Servers know that the payment is completed
            await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid });
            return res.status(200).json({ message: `Handled the incomplete payment ${paymentId}` });
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // approve the current payment
    router.post('/approve', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const invoiceId = req.body.invoiceId;
            const paymentId = req.body.paymentId;
            // update paymentId
            await InvoicesModel.updateOne({ invoiceId: invoiceId }, { $set: { paymentId: paymentId } })
            // let Pi Servers know that you're ready
            await platformAPIClient.post(`/v2/payments/${paymentId}/approve`);
            return res.status(200).json({ message: `Approved the payment ${paymentId}` });
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // complete the current payment
    router.post('/complete', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const currentUser = userInfo;
            const language = req.body.language;
            const paymentId = req.body.paymentId;
            const txid = req.body.txid;
            const invoice = await InvoicesModel.findOneAndUpdate({ pi_payment_id: paymentId }, { $set: { txid: txid, paid: true } });
            if (!invoice) {
                return res.status(404).json({ error: 'not_found', message: "Invoice not found" });
            }
            // let Pi server know that the payment is completed
            await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid });
            // send mail if the payment is completed
            const senderEmail = invoice.senderEmail;
            await utils.sendEmailPaymentSuccess(invoice, senderEmail, currentUser.username, language);
            return res.status(200).json({ message: `Completed the payment ${paymentId}` });
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });

    // handle the cancelled payment
    router.post('/cancelled_payment', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const paymentId = req.body.paymentId;
            await InvoicesModel.updateOne({ pi_payment_id: paymentId }, { $set: { cancelled: true } });
            return res.status(200).json({ message: `Cancelled the payment ${paymentId}` });
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    })

    // get detail a payment
    router.get('/detail/:paymentId', async (req, res) => {
        try {
            const userInfo = await AuthenUser(req.headers.authorization);
            if (!userInfo) {
                return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
            }
            const paymentId = req.params.paymentId;
            // Check exist in database
            const invoice = await InvoicesModel.findOne({ pi_payment_id: paymentId });
            if (!invoice) {
                return res.status(400).json({ message: "Invoice not found" });
            }
            const payment = await platformAPIClient.get(`/v2/payments/${paymentId}`);
            return res.status(200).json({ payment });
        } catch (error: any) {
            return res.status(500).json({ error: 'internal_server_error', message: error.message });
        }
    });
}
