"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, getTranslations, type Translations } from "./i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [t, setT] = useState<Translations>(getTranslations("en"))

  useEffect(() => {
    // Load language preference from localStorage
    const savedLang = localStorage.getItem("huffman-lang") as Language
    if (savedLang && (savedLang === "en" || savedLang === "fr")) {
      setLanguageState(savedLang)
      setT(getTranslations(savedLang))
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    setT(getTranslations(lang))
    localStorage.setItem("huffman-lang", lang)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
