const fs = require("fs");
const PDFDocument = require("pdfkit");
const axios = require('axios');

async function createInvoice(invoice: any, path: any) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

//   generateHeader(doc);
  await generateCustomerInformation(doc, invoice);
  await generateInvoiceTable(doc, invoice);
//   generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
  await sleep(1000);
}

function generateHeader(doc: any) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("ACME Inc.", 110, 57)
    .fontSize(10)
    .text("ACME Inc.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

async function generateCustomerInformation(doc: any, invoice: any) {
    const imageBuffer = invoice.logoUrl ? await axios.get(invoice.logoUrl, { responseType: 'arraybuffer' }) : null;
    imageBuffer ?
    doc
    .image(imageBuffer.data, 50, 30, {width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("EZ Invoice", 350, 60)
    :
    doc
    .fillColor("#444444")
    .fontSize(20)
    .text("EZ Invoice", 350, 60)
    
  generateHr(doc, 85);

  const customerInformationTop = 100;

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Bill From", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.billFrom, 50, customerInformationTop + 15)
    .font("Helvetica")
    .text("Bill To", 50, customerInformationTop + 30)
    .font("Helvetica-Bold")
    .text(invoice.billTo, 50, customerInformationTop + 45)

    .text("Invoice Number:", 350, customerInformationTop)
    .text(invoice.invoiceNumber, 450, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 350, customerInformationTop + 15)
    .text(formatDate(invoice.issueDate), 450, customerInformationTop + 15)
    .text("Payment Terms:", 350, customerInformationTop + 30)
    .text(invoice.paymentTerms, 450, customerInformationTop + 30)
    .text("PO Number:", 350, customerInformationTop + 45)
    .text(invoice.poNumber, 450, customerInformationTop + 45)
    .text("Balance Due:", 350, customerInformationTop + 60)
    .font("Helvetica-Bold")
    .text(
      formatCurrency(invoice.amountDue),
      450,
      customerInformationTop + 60
    )
    .font("Helvetica-Bold")
    .moveDown();

  generateHr(doc, 182);
}

async function generateInvoiceTable(doc: any, invoice: any) {
  let i;
  const invoiceTableTop = 230;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "#",
    "Item",
    "Price",
    "Quantity",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      i+1,
      item.name,
      item.price,
      item.quantity,
      formatCurrency(item.price * item.quantity)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subTotal)
  );

  const taxPosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    taxPosition,
    "",
    "",
    "Tax",
    "",
    invoice.taxType == 1 ? formatCurrency(invoice.subTotal * invoice.tax / 100) : formatCurrency(invoice.tax)
  );

  const discountPosition = taxPosition + 20;
  generateTableRow(
    doc,
    discountPosition,
    "",
    "",
    "Discount",
    "",
    invoice.discountType == 1 ? formatCurrency(invoice.subTotal + (invoice.subTotal * invoice.tax / 100) * invoice.discount / 100) : formatCurrency(invoice.discount)
  );

  const shippingPosition = discountPosition + 20;
  generateTableRow(
    doc,
    shippingPosition,
    "",
    "",
    "Shipping",
    "",
    formatCurrency(invoice.shipping)
  );

  const paidToDatePosition = shippingPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Amount Paid",
    "",
    formatCurrency(invoice.amountPaid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Amount Due",
    "",
    formatCurrency(invoice.amountDue)
  );
  doc.font("Helvetica");
}

function generateFooter(doc: any) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc: any,
  y: any,
  item: any,
  description: any,
  unitCost: any,
  quantity: any,
  lineTotal: any
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc: any, y: any) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents: any) {
  return cents.toFixed(2) + " Pi";
}

function formatDate(date: any) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

// sleep
function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default createInvoice;