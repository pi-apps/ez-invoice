import axios from "axios";
import { createInvoice_text } from "./languages/createInvoice_text";
import { download_text } from "./languages/download_text";
import { footerMenu_text } from "./languages/footerMenu_text";
import { home_new } from "./languages/home_text";
import { invoice_text } from "./languages/invoice_text";
import { useMenu_text } from "./languages/useMenu_text";

interface WindowWithEnv extends Window {
  __ENV?: {
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
    googleApi: string, // REACT_APP_GOOGLE_API environment variable
  }
}

const translateText = async (text: string, sourceLanguage: string, targetLanguage: string) => {
  const _window: WindowWithEnv = window;
  const googleApi = _window.__ENV && _window.__ENV.googleApi;
    try {
      const response = await axios.get(
        `https://translation.googleapis.com/language/translate/v2?q=${text}&source=${sourceLanguage}&target=${targetLanguage}&key=${googleApi}`
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

export async function createInvoiceTranslate(language: any) {
  let lang = "";
  for (const key in createInvoice_text) {
    lang += createInvoice_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_invoice_number": langArr[0] || createInvoice_text["text_invoice_number"],
    "text_sender_email": langArr[1] || createInvoice_text["text_sender_email"],
    "text_bill_from": langArr[2] || createInvoice_text["text_bill_from"],
    "text_bill_to": langArr[3] || createInvoice_text["text_bill_to"],
    "text_ship_to": langArr[4] || createInvoice_text["text_ship_to"],
    "text_date": langArr[5] || createInvoice_text["text_date"],
    "text_payment": langArr[6] || createInvoice_text["text_payment"],
    "text_due_date": langArr[7] || createInvoice_text["text_due_date"],
    "text_po_number": langArr[8] || createInvoice_text["text_po_number"],
    "text_amount_due": langArr[9] || createInvoice_text["text_amount_due"],
    "text_line_item": langArr[10] || createInvoice_text["text_line_item"],
    "text_pl_sender_email": langArr[11] || createInvoice_text["text_pl_sender_email"],
    "text_pl_bill_from": langArr[12] || createInvoice_text["text_pl_bill_from"],
    "text_pl_bill_to": langArr[13] || createInvoice_text["text_pl_bill_to"],
    "text_pl_ship_to": langArr[14] || createInvoice_text["text_pl_ship_to"],
    "text_pl_payment": langArr[15] || createInvoice_text["text_pl_payment"],
    "text_pl_po_number": langArr[16] || createInvoice_text["text_pl_po_number"],
    "text_pl_option": langArr[17] || createInvoice_text["text_pl_option"],
    "text_pl_name": langArr[18] || createInvoice_text["text_pl_name"],
    "text_item": langArr[19] || createInvoice_text["text_item"],
    "text_please_input_alphabet": langArr[20] || createInvoice_text["text_please_input_alphabet"],
    "text_max_character_100": langArr[21] || createInvoice_text["text_max_character_100"],
    "text_please_input_number": langArr[22] || createInvoice_text["text_please_input_number"],
    "text_description_requeried": langArr[23] || createInvoice_text["text_description_requeried"],
    "text_greater_than_0": langArr[24] || createInvoice_text["text_greater_than_0"],
    "text_amount": langArr[25] || createInvoice_text["text_amount"],
    "text_add_your_logo": langArr[26] || createInvoice_text["text_add_your_logo"],
    "text_update": langArr[27] || createInvoice_text["text_update"],
    "text_notes": langArr[28] || createInvoice_text["text_notes"],
    "text_terms": langArr[29] || createInvoice_text["text_terms"],
    "text_subtotal": langArr[30] || createInvoice_text["text_subtotal"],
    "text_tax": langArr[31] || createInvoice_text["text_tax"],
    "text_total": langArr[32] || createInvoice_text["text_total"],
    "text_discount": langArr[33] || createInvoice_text["text_discount"],
    "text_shipping": langArr[34] || createInvoice_text["text_shipping"],
    "text_amount_paid": langArr[35] || createInvoice_text["text_amount_paid"],
    "text_balance_due": langArr[36] || createInvoice_text["text_balance_due"],
    "text_preview": langArr[37] || createInvoice_text["text_preview"],
    "text_pl_notes": langArr[38] || createInvoice_text["text_pl_notes"],
    "text_histoty": langArr[39] || createInvoice_text["text_histoty"],
    "text_download": langArr[40] || createInvoice_text["text_download"],
    "text_send": langArr[41] || createInvoice_text["text_send"],
    "text_issue_date": langArr[42] || createInvoice_text["text_issue_date"],
    "text_payment_terms": langArr[43] || createInvoice_text["text_payment_terms"],
    "text_quanlity": langArr[44] || createInvoice_text["text_quanlity"],
    "text_unit_price": langArr[45] || createInvoice_text["text_unit_price"],
    "text_allowances": langArr[46] || createInvoice_text["text_allowances"],
    "text_back": langArr[47] || createInvoice_text["text_back"],
    "text_invoice": langArr[48] || createInvoice_text["text_invoice"],
  }
  return data;
}