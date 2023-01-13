import { EN } from '../../config/localization/languages'



const publicUrl = process.env.PUBLIC_URL

export const LS_KEY = 'livetrade_language'

export const fetchLocale = async (locale: any) => {
  const response = await fetch(`${publicUrl}/locales/${locale}.json`)
  const data = await response.json()
  return data
}

export const getLanguageCodeFromLS = () => {
  try {
    const codeFromStorage = localStorage.getItem(LS_KEY)

    return codeFromStorage || EN.locale
  } catch {
    return EN.locale
  }
}
