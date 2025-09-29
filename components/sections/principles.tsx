"use client"

import { useLanguage } from "@/lib/language-context"
import { BarChart3, Binary, GitBranch } from "lucide-react"

export function Principles() {
  const { t } = useLanguage()

  const exampleData = [
    { char: "L", freq: 3, code: "0", color: "bg-blue-500" },
    { char: "O", freq: 2, code: "10", color: "bg-green-500" },
    { char: "H", freq: 1, code: "110", color: "bg-purple-500" },
    { char: "E", freq: 1, code: "1110", color: "bg-orange-500" },
    { char: " ", freq: 1, code: "1111", color: "bg-pink-500" },
  ]

  const maxFreq = Math.max(...exampleData.map((d) => d.freq))

  return (
    <section id="principles" className="min-h-screen bg-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t.principles.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t.principles.subtitle}</p>
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Character Frequency */}
          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
              <BarChart3 className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-100">{t.principles.frequency.title}</h3>
            <p className="text-slate-400 leading-relaxed">{t.principles.frequency.description}</p>
          </div>

          {/* Variable-Length Codes */}
          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
              <Binary className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-100">{t.principles.variableLength.title}</h3>
            <p className="text-slate-400 leading-relaxed">{t.principles.variableLength.description}</p>
          </div>

          {/* Prefix-Free Property */}
          <div className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
              <GitBranch className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-slate-100">{t.principles.prefixCode.title}</h3>
            <p className="text-slate-400 leading-relaxed">{t.principles.prefixCode.description}</p>
          </div>
        </div>

        {/* Interactive frequency chart example */}
        <div className="glass-card p-8 rounded-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-slate-100">{t.principles.example.title}</h3>

          <div className="space-y-4 mb-8">
            {exampleData.map((item, index) => (
              <div key={item.char} className="flex items-center gap-4">
                {/* Character */}
                <div className="w-16 text-center">
                  <div className="text-2xl font-mono font-bold text-slate-100">
                    {item.char === " " ? "␣" : item.char}
                  </div>
                </div>

                {/* Frequency bar */}
                <div className="flex-1">
                  <div className="relative h-12 bg-slate-800 rounded-lg overflow-hidden">
                    <div
                      className={`absolute inset-y-0 left-0 ${item.color} transition-all duration-1000 ease-out flex items-center justify-end px-4`}
                      style={{
                        width: `${(item.freq / maxFreq) * 100}%`,
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      <span className="text-white font-bold">{item.freq}</span>
                    </div>
                  </div>
                </div>

                {/* Huffman code */}
                <div className="w-32 text-right">
                  <div className="inline-block px-4 py-2 bg-slate-800 rounded-lg">
                    <span className="font-mono text-cyan-400 font-bold">{item.code}</span>
                  </div>
                </div>

                {/* Code length */}
                <div className="w-24 text-slate-400 text-sm">
                  {item.code.length} {item.code.length === 1 ? t.principles.example.bits.slice(0, -1) : t.principles.example.bits}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-slate-700">
            <div>
              <div className="text-sm text-slate-500 uppercase tracking-wider mb-2">{t.principles.example.fixedLength}</div>
              <div className="text-3xl font-bold text-slate-300">15 {t.principles.example.bits}</div>
              <div className="text-sm text-slate-500 mt-1">{t.principles.example.characters}</div>
            </div>
            <div>
              <div className="text-sm text-cyan-400 uppercase tracking-wider mb-2">{t.principles.example.huffmanCoding}</div>
              <div className="text-3xl font-bold text-cyan-400">11 {t.principles.example.bits}</div>
              <div className="text-sm text-cyan-400 mt-1">{t.principles.example.compression}</div>
            </div>
          </div>
          
          {/* Explanation text */}
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
            <p className="text-slate-300 text-center leading-relaxed">
              Ce graphique montre que Huffman donne des codes courts aux lettres fréquentes et des codes longs aux lettres rares, ce qui permet une compression efficace des données.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
