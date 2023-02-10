import axios from "axios";
import { Router } from "express";
import platformAPIClient from "../services/platformAPIClient";
import "../types/session";
import InvoicesModel from "../models/invoices";

export default function mountPaymentsEndpoints(router: Router) {
  // handle the incomplete payment
  router.post('/incomplete', async (req, res) => {
    const payment = req.body.payment;
    const paymentId = payment.identifier;
    const txid = payment.transaction && payment.transaction.txid;
    const txURL = payment.transaction && payment.transaction._link;

    /* 
      implement your logic here
      e.g. verifying the payment, delivering the item to the user, etc...

      below is a naive example
    */

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
  });

  // approve the current payment
  router.post('/approve', async (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ error: 'unauthorized', message: "User needs to sign in first" });
    }
    const paymentId = req.body.paymentId;
    // update receiverId
    await InvoicesModel.updateOne({ pi_payment_id: paymentId }, { $set: { receiverId: req.session.currentUser.uid } })
    // let Pi Servers know that you're ready
    await platformAPIClient.post(`/v2/payments/${paymentId}/approve`);
    return res.status(200).json({ message: `Approved the payment ${paymentId}` });
  });

  // complete the current payment
  router.post('/complete', async (req, res) => {
    const paymentId = req.body.paymentId;
    const txid = req.body.txid;
    await InvoicesModel.updateOne({ pi_payment_id: paymentId }, { $set: { txid: txid, paid: true } });
    // let Pi server know that the payment is completed
    await platformAPIClient.post(`/v2/payments/${paymentId}/complete`, { txid });
    return res.status(200).json({ message: `Completed the payment ${paymentId}` });
  });

  // handle the cancelled payment
  router.post('/cancelled_payment', async (req, res) => {
    const paymentId = req.body.paymentId;
    await InvoicesModel.updateOne({ pi_payment_id: paymentId }, { $set: { cancelled: true } });
    return res.status(200).json({ message: `Cancelled the payment ${paymentId}` });
  })
  // get detail a payment
  router.get('/detail/:paymentId', async (req, res) => {
    const paymentId = req.params.paymentId;
    // Check exist in database
    const invoice = await InvoicesModel.findOne({ pi_payment_id: paymentId });
    if (!invoice) {
      return res.status(400).json({ message: "Invoice not found" });
    }
    const payment = await platformAPIClient.get(`/v2/payments/${paymentId}`);
    return res.status(200).json({ payment });
  });
  // payment link
  router.get('/deep-payment/:invoiceId', async (req, res) => {
    const invoiceId = req.params.invoiceId;
    const url = `${process.env.PAYMENT_URL}/${invoiceId}`;
    res.redirect(url);
  });
}
