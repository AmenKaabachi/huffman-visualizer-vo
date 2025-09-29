"use client"

import { useLanguage } from "@/lib/language-context"
import { useHuffman } from "@/hooks/use-huffman"
import { HuffmanTree } from "@/components/visualizations/huffman-tree"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function TreeVisualization() {
  const { t } = useLanguage()
  const { result, encode } = useHuffman("HELLO")
  const [inputText, setInputText] = useState("HELLO")

  const handleEncode = () => {
    if (inputText.trim()) {
      encode(inputText.trim())
    }
  }

  return (
    <section id="tree" className="min-h-screen bg-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {t.tree.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t.tree.subtitle}</p>
        </div>

        {/* Input controls */}
        <div className="glass-card p-6 rounded-2xl mb-8 max-w-3xl mx-auto">
          <label className="block text-sm font-medium text-slate-300 mb-2">Input Text</label>
          <div className="flex gap-3">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value.toUpperCase())}
              placeholder="Enter text to visualize..."
              className="flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
            <Button onClick={handleEncode} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold">
              Visualize
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="glass-card p-6 rounded-2xl mb-8 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">{t.tree.legend.internal}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500 border-2 border-slate-400" />
              <div>
                <div className="text-sm font-medium text-slate-100">{t.tree.legend.internal}</div>
                <div className="text-xs text-slate-400">Combined frequency nodes</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-slate-400 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <div className="text-sm font-medium text-slate-100">{t.tree.legend.leaf}</div>
                <div className="text-xs text-slate-400">Character nodes with codes</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-slate-400 font-mono">f:5</div>
              <div>
                <div className="text-sm font-medium text-slate-100">{t.tree.legend.frequency}</div>
                <div className="text-xs text-slate-400">Character occurrence count</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-cyan-400 font-mono font-bold">101</div>
              <div>
                <div className="text-sm font-medium text-slate-100">{t.tree.legend.code}</div>
                <div className="text-xs text-slate-400">Huffman binary code</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tree visualization */}
        <div className="glass-card p-8 rounded-2xl">
          <HuffmanTree tree={result?.tree || null} width={1000} height={500} />
        </div>

        {/* Codes table */}
        {result && result.frequencies.length > 0 && (
          <div className="glass-card p-8 rounded-2xl mt-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-slate-100">Character Codes</h3>
            <div className="space-y-3">
              {result.frequencies.map((item) => (
                <div key={item.char} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xl font-bold">
                      {item.char === " " ? "␣" : item.char}
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">Frequency</div>
                      <div className="text-lg font-semibold text-slate-100">
                        {item.freq} ({item.percentage.toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Binary Code</div>
                    <div className="text-xl font-mono font-bold text-cyan-400">{item.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
