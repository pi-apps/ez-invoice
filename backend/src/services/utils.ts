require('dotenv').config()
const Moralis = require("moralis").default;
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const axios = require('axios');
import fs from "fs";
import sesService from "./aws-ses-service";
import { lang_pdf} from "./languages/lang_pdf";
import { lang_email} from "./languages/lang_email";
import { lang_email_success } from "./languages/lang_email_success";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const template = fs.readFileSync("./src/services/templatePDF.ejs", "utf8");

const translateText = async (text: string, sourceLanguage: string, targetLanguage: string) => {
  try {
    const response = await axios.get(
      `https://translation.googleapis.com/language/translate/v2?q=${text}&source=${sourceLanguage}&target=${targetLanguage}&key=${GOOGLE_API_KEY}`
    );

    return response.data.data.translations[0].translatedText;
  } catch (error) {
    return text;
  }
};

async function uploadToIpfs(file: any) {
  const uploadArray = [
      {
          path: file?.filename,
          content: fs.readFileSync(file.path, {encoding: 'base64'})
      }
  ];
  const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
  });
  if (!file.filename.includes(".pdf")) {
    // delete file after upload
    fs.unlinkSync(file.path);
  }
  return response.result[0].path;
}

async function generatePdf(invoice: any, language: any) {
  let items = invoice.items;
  for (let i = 0; i < items.length; i++) {
    items[i].total = Number(items[i].price) * Number(items[i].quantity);
  }
  let lang = "";
  for (const key in lang_pdf) {
    lang += lang_pdf[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang  = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_title": langArr[0] || lang_pdf["text_title"],
    "text_bill_from": langArr[1] || lang_pdf["text_bill_from"],
    "text_bill_to": langArr[2] || lang_pdf["text_bill_to"],
    "text_issue_date": langArr[3] || lang_pdf["text_issue_date"],
    "text_due_date": langArr[4] || lang_pdf["text_due_date"],
    "text_payment_terms": langArr[5] || lang_pdf["text_payment_terms"],
    "text_po_number": langArr[6] || lang_pdf["text_po_number"],
    "text_balance_due": langArr[7] || lang_pdf["text_balance_due"],
    "text_item": langArr[8] || lang_pdf["text_item"],
    "text_quantity": langArr[9] || lang_pdf["text_quantity"],
    "text_price": langArr[10] || lang_pdf["text_price"],
    "text_total": langArr[11] || lang_pdf["text_total"],
    "text_subtotal": langArr[12] || lang_pdf["text_subtotal"],
    "text_tax": langArr[13] || lang_pdf["text_tax"],
    "text_discount": langArr[14] || lang_pdf["text_discount"],
    "text_shipping": langArr[15] || lang_pdf["text_shipping"],
    "text_amount_paid": langArr[16] || lang_pdf["text_amount_paid"],
    "text_amount_due": langArr[17] || lang_pdf["text_amount_due"],
    invoiceNumber: invoice.invoiceNumber,
    logoUrl: invoice.logoUrl,
    billFrom: invoice.billFrom.split("\n")[0],
    billTo: invoice.billTo.split("\n")[0],
    shipTo: invoice.shipTo,
    issueDate: new Date(invoice.issueDate).toLocaleDateString("en-US"),
    dueDate: new Date(invoice.dueDate).toLocaleDateString("en-US"),
    paymentTerms: invoice.paymentTerms,
    poNumber: invoice.poNumber,
    items: items,
    notes: invoice.notes,
    terms: invoice.terms,
    subTotal: invoice.subTotal,
    tax: invoice.tax,
    taxType: invoice.taxType,
    discount: invoice.discount,
    discountType: invoice.discountType,
    shipping: invoice.shipping,
    total: invoice.total,
    amountPaid: invoice.amountPaid,
    amountDue: invoice.amountDue,
  }
  const html = ejs.render(template, data);
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const buffer = await page.pdf({ format: 'A4' });
  await browser.close();
  fs.writeFileSync(`./downloads/${invoice.invoiceId}.pdf`, buffer);
  const download = {
    filename: `${invoice.invoiceId}.pdf`,
    path: `./downloads/${invoice.invoiceId}.pdf`,
  }
  const downloadUrl = uploadToIpfs(download);
  return downloadUrl;
}

async function sendEmail(invoice: any, email: string, username: string, signature: string, language: string) {
  let lang = "";
  for (const key in lang_email) {
    lang += lang_email[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang  = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const templatePath = "send-invoice.html";
  const params = {
      "text_new_invoice": langArr[0] || lang_email["text_new_invoice"],
      "text_sent_invoice": langArr[1] || lang_email["text_sent_invoice"],
      "text_invoice_no": langArr[2] || lang_email["text_invoice_no"],
      "text_invoice_total": langArr[3] || lang_email["text_invoice_total"],
      "text_pay": langArr[4] || lang_email["text_pay"],
      "title": `[EZ Invoice] Invoice #${invoice.invoiceNumber}`,
      "username": username,
      "invoiceId": invoice.invoiceId,
      "invoiceNumber": invoice.invoiceNumber,
      "amountDue": invoice.amountDue,
      "paymentUrl": `${process.env.PAYMENT_GATEWAY_URL}/${signature}`,   
  }
  // Send otp via email
  await sesService.sendEmailByTemplate(1, [email], templatePath, params);
}

async function sendEmailPaymentSuccess(invoice: any, email: string, username: string, language: string) {
  let lang = "";
  for (const key in lang_email_success) {
    lang += lang_email_success[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang  = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const templatePath = "send-invoice.html";
  const params = {
      "text_new_invoice": langArr[0] || lang_email_success["text_new_invoice"],
      "text_sent_invoice": langArr[1] || lang_email_success["text_sent_invoice"],
      "text_invoice_no": langArr[2] || lang_email_success["text_invoice_no"],
      "text_invoice_total": langArr[3] || lang_email_success["text_invoice_total"],
      "text_pay": langArr[4] || lang_email_success["text_pay"],
      "title": `[EZ Invoice] Invoice #${invoice.invoiceNumber}`,
      "username": username,
      "invoiceId": invoice.invoiceId,
      "invoiceNumber": invoice.invoiceNumber,
      "amountDue": invoice.amountDue,
      "paymentUrl": `${process.env.PAYMENT_GATEWAY_URL}`,   
  }
  // Send otp via email
  await sesService.sendEmailByTemplate(2, [email], templatePath, params);
}

function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default { uploadToIpfs, generatePdf, sendEmail, sendEmailPaymentSuccess, generateRandomString };