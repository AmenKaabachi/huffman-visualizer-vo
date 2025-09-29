"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-full">
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="rounded-full h-8 px-3 text-xs font-medium"
      >
        EN
      </Button>
      <Button
        variant={language === "fr" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("fr")}
        className="rounded-full h-8 px-3 text-xs font-medium"
      >
        FR
      </Button>
    </div>
  )
}
