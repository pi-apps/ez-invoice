require('dotenv').config()
const Moralis = require("moralis").default;
const pdf = require("pdf-creator-node");
const puppeteer = require('puppeteer');
const ejs = require('ejs');
import fs from "fs";
import sesService from "./aws-ses-service";

const template = fs.readFileSync("./src/services/templatePDF.ejs", "utf8");

async function uploadToIpfs(file: any) {
  const uploadArray = [
      {
          path: file.filename,
          content: fs.readFileSync(file.path, {encoding: 'base64'})
      }
  ];
  const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
  });
  return response.result[0].path;
}

async function generatePdf(invoice: any) {
  let items = invoice.items;
  for (let i = 0; i < items.length; i++) {
    items[i].total = Number(items[i].price) * Number(items[i].quantity);
  }
  const data = {
    invoiceNumber: invoice.invoiceNumber,
    logoUrl: invoice.logoUrl,
    billFrom: invoice.billFrom,
    billTo: invoice.billTo,
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
    discount: invoice.discount,
    shipping: invoice.shipping,
    total: invoice.total,
    amountPaid: invoice.amountPaid,
    amountDue: invoice.amountDue,
  }
  const html = ejs.render(template, data);
  const browser = await puppeteer.launch();
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

async function sendEmail(invoice: any, email: string) {
  const templatePath = "send-invoice.html";
  const params = {
      "title": `[PiBridge] Invoice #${invoice.invoiceNumber}`,
      "invoiceId": invoice.invoiceId,
      "invoiceNumber": invoice.invoiceNumber,
      "amountDue": invoice.amountDue,
      "paymentUrl": `${process.env.PAYMENT_GATEWAY_URL}/${invoice.invoiceId}`,   
  }
  // Send otp via email
  await sesService.sendEmailByTemplate([email], templatePath, params);
}
export default { uploadToIpfs, generatePdf, sendEmail };