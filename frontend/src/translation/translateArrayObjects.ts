import axios from "axios";
import { download_text } from "./languages/download_text";
import { footerMenu_text } from "./languages/footerMenu_text";
import { home_new } from "./languages/home_text";
import { invoice_text } from "./languages/invoice/invoice_text";
import { useMenu_text } from "./languages/useMenu_text";

const translateText = async (text: string, sourceLanguage: string, targetLanguage: string) => {
    try {
      const response = await axios.get(
        `https://translation.googleapis.com/language/translate/v2?q=${text}&source=${sourceLanguage}&target=${targetLanguage}&key=AIzaSyAMjXwmyrFo2Y_OVU_JXbXyIrTCZPiFWUs`
      );
  
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      return text;
    }
  };

export async function HomeText(language: any) {
    let lang = "";
    for (const key in home_new) {
      lang += home_new[key] + ":";
    }
    lang = lang.slice(0, -1);
    if (language !== "en") {
      lang = await translateText(lang, "en", language);
    }
    const langArr = lang.split(":");
    const data = {
      "text_start_now": langArr[0] || home_new["text_start_now"],
    }
    return data;
  }

export async function FooterMenuTranslate(language: any) {
  let lang = "";
  for (const key in footerMenu_text) {
    lang += footerMenu_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_home": langArr[0] || footerMenu_text["text_home"],
    "text_invoice": langArr[1] || footerMenu_text["text_invoice"],
  }
  return data;
}

export async function useMenuTranslate(language: any) {
  let lang = "";
  for (const key in useMenu_text) {
    lang += useMenu_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_login": langArr[0] || useMenu_text["text_login"],
    "text_logout": langArr[1] || useMenu_text["text_logout"],
    "text_login_success": langArr[2] || useMenu_text["text_login_success"],
    "text_login_failed": langArr[3] || useMenu_text["text_login_failed"],
    "text_logout_success": langArr[4] || useMenu_text["text_logout_success"],
  }
  return data;
}

export async function invoiceTranslate(language: any) {
  let lang = "";
  for (const key in invoice_text) {
    lang += invoice_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_invoice": langArr[0] || invoice_text["text_invoice"],
    "text_new_invoice": langArr[1] || invoice_text["text_new_invoice"],
    "text_sent": langArr[2] || invoice_text["text_sent"],
    "text_received": langArr[3] || invoice_text["text_received"],
    "text_no_data": langArr[4] || invoice_text["text_no_data"],
    "text_paid": langArr[5] || invoice_text["text_paid"],
    "text_unpaid": langArr[6] || invoice_text["text_unpaid"],

    "text_bill_from": langArr[7] || invoice_text["text_bill_from"],
    "text_bill_to": langArr[8] || invoice_text["text_bill_to"],
    "text_issue_date": langArr[9] || invoice_text["text_issue_date"],
    "text_due_date": langArr[10] || invoice_text["text_due_date"],
    "text_payment_terms": langArr[11] || invoice_text["text_payment_terms"],
    "text_po_number": langArr[12] || invoice_text["text_po_number"],
    "text_item": langArr[13] || invoice_text["text_item"],
    "text_quanlity": langArr[14] || invoice_text["text_quanlity"],
    "text_unit_price": langArr[15] || invoice_text["text_unit_price"],
    "text_total": langArr[16] || invoice_text["text_total"],
    "text_subtotal": langArr[17] || invoice_text["text_subtotal"],
    "text_allowances": langArr[18] || invoice_text["text_allowances"],
    "text_tax": langArr[19] || invoice_text["text_tax"],
    "text_shipping": langArr[20] || invoice_text["text_shipping"],
    "text_discount": langArr[21] || invoice_text["text_discount"],
    "text_amount_due": langArr[22] || invoice_text["text_amount_due"],
    "text_back": langArr[23] || invoice_text["text_back"],
    "text_pay_now": langArr[24] || invoice_text["text_pay_now"],
  }
  return data;
}
  

export async function downloadTranslate(language: any) {
  let lang = "";
  for (const key in download_text) {
    lang += download_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_download_invoice": langArr[0] || download_text["text_download_invoice"],
    "text_choose_file": langArr[1] || download_text["text_choose_file"],
    "text_hard_disk": langArr[2] || download_text["text_hard_disk"],
    "text_copy": langArr[3] || download_text["text_copy"],
    "text_coppied": langArr[4] || download_text["text_coppied"],
    "text_recipientEmail": langArr[5] || download_text["text_recipientEmail"],
    "text_send_invoice": langArr[6] || download_text["text_send_invoice"],
    "text_send_invoice_recipient": langArr[7] || download_text["text_send_invoice_recipient"],
    "text_send": langArr[8] || download_text["text_send"],
    "text_sent_invoice_success": langArr[9] || download_text["text_sent_invoice_success"],
    "text_done": langArr[10] || download_text["text_done"],
  }
  return data;
}