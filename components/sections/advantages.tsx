"use client"

import { useLanguage } from "@/lib/language-context"
import { CheckCircle2, Zap, Shield } from "lucide-react"

export function Advantages() {
  const { t } = useLanguage()

  return (
    <section id="advantages" className="min-h-screen bg-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            {t.advantages.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t.advantages.subtitle}</p>
        </div>

        {/* Advantages grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-100">{t.advantages.items.lossless.title}</h3>
            <p className="text-slate-400 leading-relaxed">{t.advantages.items.lossless.description}</p>
          </div>

          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-100">{t.advantages.items.optimal.title}</h3>
            <p className="text-slate-400 leading-relaxed">{t.advantages.items.optimal.description}</p>
          </div>

          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-100">{t.advantages.items.efficient.title}</h3>
            <p className="text-slate-400 leading-relaxed">{t.advantages.items.efficient.description}</p>
          </div>
        </div>

        {/* Applications */}
        <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center text-slate-100">{t.advantages.applications.title}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {t.advantages.applications.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-green-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-slate-100 font-medium">{item}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            {t.footer.credit}
          </p>
        </div>
      </div>
    </section>
  )
}
