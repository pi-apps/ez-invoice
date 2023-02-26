import axios from "axios";
import { createInvoice_text } from "./languages/createInvoice_text";
import { download_text } from "./languages/download_text";
import { footerMenu_text } from "./languages/footerMenu_text";
import { history_text } from "./languages/history_text";
import { home_new } from "./languages/home_text";
import { invoice_text } from "./languages/invoice_text";
import { payment_text } from "./languages/payment_text";
import { previewInvoice_text } from "./languages/previewInvoice";
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
    "text_are_your_sure_logout": langArr[5] || useMenu_text["text_are_your_sure_logout"],
    "text_cancel": langArr[6] || useMenu_text["text_cancel"],
    "text_confirm": langArr[7] || useMenu_text["text_confirm"],
    "text_error": langArr[8] || useMenu_text["text_error"],
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
    "text_amount_paid": langArr[25] || invoice_text["text_amount_paid"],
    "text_notes": langArr[26] || invoice_text["text_notes"],
    "text_terms": langArr[27] || invoice_text["text_terms"],
    "text_tips": langArr[28] || invoice_text["text_tips"],
    "text_total_incl_tips": langArr[29] || invoice_text["text_total_incl_tips"],
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
    "text_copied": langArr[4] || download_text["text_coppied"],
    "text_recipientEmail": langArr[5] || download_text["text_recipientEmail"],
    "text_send_invoice": langArr[6] || download_text["text_send_invoice"],
    "text_send_invoice_recipient": langArr[7] || download_text["text_send_invoice_recipient"],
    "text_send": langArr[8] || download_text["text_send"],
    "text_sent_invoice_success": langArr[9] || download_text["text_sent_invoice_success"],
    "text_done": langArr[10] || download_text["text_done"],
    "text_back":langArr[11] || download_text["text_back"],
    "text_error":langArr[12] || download_text["text_error"],
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
    "text_send_mail": langArr[49] || createInvoice_text["text_send_mail"],
    "text_create_invoice": langArr[50] || createInvoice_text["text_create_invoice"],
    "text_create_success": langArr[51] || createInvoice_text["text_create_success"],
    "text_create_failed": langArr[52] || createInvoice_text["text_create_failed"],
    "text_less_than_total": langArr[53] || createInvoice_text["text_less_than_total"],
    "text_less_than_subtotal_and_tax": langArr[54] || createInvoice_text["text_less_than_subtotal_and_tax"],
    "text_terms_and_conditions": langArr[55] || createInvoice_text["text_terms_and_conditions"],
    "text_error": langArr[56] || createInvoice_text["text_error"],
    "text_payment_term": langArr[57] || createInvoice_text["text_payment_term"],
    "text_pl_payment_term": langArr[58] || createInvoice_text["text_pl_payment_term"],
    "text_previous": langArr[59] || createInvoice_text["text_previous"],
    "text_next": langArr[60] || createInvoice_text["text_next"],
    "text_discount_before_tax": langArr[61] || createInvoice_text["text_discount_before_tax"],
    "text_only_png": langArr[62] || createInvoice_text["text_only_png"],
    "text_the_date_must_be_greater_than": langArr[63] || createInvoice_text["text_the_date_must_be_greater_than"],
    "text_due_date_must_be_greater_than": langArr[64] || createInvoice_text["text_due_date_must_be_greater_than"],
    "text_max_length_is_500_characters": langArr[65] || createInvoice_text["text_max_length_is_500_characters"],
  }
  return data;
}

export async function previewInvoiceTranslate(language: any) {
  let lang = "";
  for (const key in previewInvoice_text) {
    lang += previewInvoice_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_bill_from": langArr[0] || previewInvoice_text["text_bill_from"],
    "text_bill_to": langArr[1] || previewInvoice_text["text_bill_to"],
    "text_ship_to": langArr[2] || previewInvoice_text["text_ship_to"],
    "text_date": langArr[3] || previewInvoice_text["text_date"],
    "text_due_date": langArr[4] || previewInvoice_text["text_due_date"],
    "text_po_number": langArr[5] || previewInvoice_text["text_po_number"],
    "text_subtotal": langArr[6] || previewInvoice_text["text_subtotal"],
    "text_tax": langArr[7] || previewInvoice_text["text_tax"],
    "text_total": langArr[8] || previewInvoice_text["text_total"],
    "text_discount": langArr[9] || previewInvoice_text["text_discount"],
    "text_shipping": langArr[10] || previewInvoice_text["text_shipping"],
    "text_payment_terms": langArr[11] || previewInvoice_text["text_payment_terms"],
    "text_allowances": langArr[12] || previewInvoice_text["text_allowances"],
    "text_back": langArr[13] || previewInvoice_text["text_back"],
    "text_item": langArr[14] || previewInvoice_text["text_item"],
    "text_quanlity": langArr[15] || previewInvoice_text["text_quanlity"],
    "text_unit_price": langArr[16] || previewInvoice_text["text_unit_price"],
    "text_amount_due": langArr[17] || previewInvoice_text["text_amount_due"],
    "text_amount_paid": langArr[18] || previewInvoice_text["text_amount_paid"],
    "text_notes": langArr[19] || previewInvoice_text["text_notes"],
    "text_terms": langArr[20] || previewInvoice_text["text_terms"],
  }
  return data;
}

export async function historyTranslate(language: any) {
  let lang = "";
  for (const key in history_text) {
    lang += history_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_no_data": langArr[0] || history_text["text_no_data"],
    "text_history": langArr[1] || history_text["text_history"],
    "text_let_ezinvoice_account": langArr[2] || history_text["text_let_ezinvoice_account"],
    "text_export": langArr[3] || history_text["text_export"],
    "text_new_invoice": langArr[4] || history_text["text_new_invoice"],
  }
  return data;
}

export async function paymentTranslate(language: any) {
  let lang = "";
  for (const key in payment_text) {
    lang += payment_text[key] + ":";
  }
  lang = lang.slice(0, -1);
  if (language !== "en") {
    lang = await translateText(lang, "en", language);
  }
  const langArr = lang.split(":");
  const data = {
    "text_bill_from": langArr[0] || payment_text["text_bill_from"],
    "text_bill_to": langArr[1] || payment_text["text_bill_to"],
    "text_ship_to": langArr[2] || payment_text["text_ship_to"],
    "text_date": langArr[3] || payment_text["text_date"],
    "text_due_date": langArr[4] || payment_text["text_due_date"],
    "text_po_number": langArr[5] || payment_text["text_po_number"],
    "text_subtotal": langArr[6] || payment_text["text_subtotal"],
    "text_tax": langArr[7] || payment_text["text_tax"],
    "text_total": langArr[8] || payment_text["text_total"],
    "text_discount": langArr[9] || payment_text["text_discount"],
    "text_shipping": langArr[10] || payment_text["text_shipping"],
    "text_payment_terms": langArr[11] || payment_text["text_payment_terms"],
    "text_allowances": langArr[12] || payment_text["text_allowances"],
    "text_back": langArr[13] || payment_text["text_back"],
    "text_item": langArr[14] || payment_text["text_item"],
    "text_quanlity": langArr[15] || payment_text["text_quanlity"],
    "text_unit_price": langArr[16] || payment_text["text_unit_price"],
    "text_invoice": langArr[17] || payment_text["text_invoice"],
    "text_issue_date": langArr[18] || payment_text["text_issue_date"],
    "text_amount_due": langArr[19] || payment_text["text_amount_due"],
    "text_tips": langArr[20] || payment_text["text_tips"],
    "text_pay_now": langArr[21] || payment_text["text_pay_now"],
    "text_amount_paid": langArr[22] || payment_text["text_amount_paid"],
    "text_error": langArr[23] || payment_text["text_error"],
    "text_system_error": langArr[24] || payment_text["text_system_error"],
    "text_payment_success": langArr[25] || payment_text["text_payment_success"],
    "text_total_incl_tips": langArr[26] || payment_text["text_total_incl_tips"],
  }
  return data;
}