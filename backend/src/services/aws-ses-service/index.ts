const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mailcomposer = require('mailcomposer');

const sesConfig = {
  accessKeyId: process.env.AWS_SES_ID,
  secretAccessKey: process.env.AWS_SES_SECRET,
  region: process.env.AWS_REGION,
  apiVersion: '2023-01-01', // version của api
}


let sesAws: any;

async function init() {
  sesAws = new AWS.SES(sesConfig);
}

async function sendEmailByTemplate(type: number, receivers: any, templatePath: string, params: { title: any; username: any, invoiceId: any; invoiceNumber: any; amountDue: any; paymentUrl: any;}) {
  const fullTemplatePath = path.join(__dirname, './templates/' + templatePath);
  const content = await getContent(fullTemplatePath, params);
  const senderEmail = `EZ Invoice Admin <ezinvoice@email.pibridge.org>`;
  const attachments = type === 1 ? [
    {
      filename: `Invoice #${params.invoiceNumber}.pdf`,
      path: `./downloads/${params.invoiceId}.pdf`,
    },
  ] : [];
  const mail = mailcomposer({
    from: senderEmail,
    to: receivers,
    subject: params.title,
    html: content,
    attachments: attachments,
  });
  mail.build((err: any, message: any) => {
    if (err) {
      console.log(err);
      return;
    }
    const sendPromise = sesAws.sendRawEmail({RawMessage: {Data: message}}).promise();
    return sendPromise;
  });
}

async function getContent(templatePath: any, params: any) {
  const content = eval("`" + fs.readFileSync(templatePath, "utf8") + "`");
  return content;
}

export default { init, sendEmailByTemplate };