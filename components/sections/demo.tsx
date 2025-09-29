"use client"

import { useLanguage } from "@/lib/language-context"
import { useHuffman } from "@/hooks/use-huffman"
import { formatBinary } from "@/lib/huffman"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function Demo() {
  const { t } = useLanguage()
  const { result, encode } = useHuffman("HELLO WORLD")
  const [inputText, setInputText] = useState("HELLO WORLD")
  const [copied, setCopied] = useState(false)

  const handleEncode = () => {
    if (inputText.trim()) {
      encode(inputText.trim())
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Calculate ASCII representation
  const asciiEncoded = inputText
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ")

  return (
    <section id="demo" className="min-h-screen bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-500 bg-clip-text text-transparent">
            {t.demo.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t.demo.subtitle}</p>
        </div>

        {/* Input controls */}
        <div className="glass-card p-6 rounded-2xl mb-8 max-w-4xl mx-auto">
          <label className="block text-sm font-medium text-slate-300 mb-2">Input Text</label>
          <div className="flex gap-3">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value.toUpperCase())}
              placeholder="Enter text to encode..."
              className="flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
            <Button onClick={handleEncode} className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold">
              Encode
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Original text */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-100">{t.demo.original}</h3>
                <div className="text-sm text-slate-400">{result.original.length} {t.demo.characters}</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-lg font-mono text-slate-100 break-all">{result.original}</div>
              </div>
            </div>

            {/* ASCII encoding (for comparison) */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-100">{t.demo.ascii}</h3>
                <div className="text-sm text-slate-400">
                  {result.originalBits} {t.demo.bits}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg relative">
                <div className="text-sm font-mono text-slate-400 break-all leading-relaxed">{asciiEncoded}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(asciiEncoded)}
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-100"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Huffman encoding */}
            <div className="glass-card p-6 rounded-2xl border-2 border-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">{t.demo.encoded}</h3>
                <div className="text-sm text-cyan-400">
                  {result.encodedBits} {t.demo.bits}
                </div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg relative">
                <div className="text-sm font-mono text-cyan-400 break-all leading-relaxed">
                  {formatBinary(result.encoded, 8)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(result.encoded)}
                  className="absolute top-2 right-2 text-cyan-400 hover:text-cyan-300"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Character-by-character encoding visualization */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Character-by-Character Encoding</h3>
              <div className="space-y-3">
                {result.original.split("").map((char, index) => {
                  const code = result.codes.get(char) || ""
                  const asciiCode = char.charCodeAt(0).toString(2).padStart(8, "0")
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xl font-bold">
                        {char === " " ? "␣" : char}
                      </div>
                      <div className="flex-1 grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 mb-1">ASCII (8 {t.demo.bits})</div>
                          <div className="font-mono text-sm text-slate-400">{asciiCode}</div>
                        </div>
                        <div>
                          <div className="text-xs text-cyan-400 mb-1">{t.demo.huffman} ({code.length} {t.demo.bits})</div>
                          <div className="font-mono text-sm text-cyan-400 font-bold">{code}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-400">Saved</div>
                        <div className="text-lg font-bold text-green-400">{8 - code.length} {t.demo.saved}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Compression statistics */}
            <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-green-500/10 border-2 border-cyan-500/30">
              <h3 className="text-2xl font-bold text-slate-100 mb-6 text-center">{t.demo.compression}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Original Size</div>
                  <div className="text-4xl font-bold text-slate-100">{result.originalBits}</div>
                  <div className="text-sm text-slate-400 mt-1">{t.demo.bits}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-cyan-400 mb-2">Compressed Size</div>
                  <div className="text-4xl font-bold text-cyan-400">{result.encodedBits}</div>
                  <div className="text-sm text-cyan-400 mt-1">{t.demo.bits}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-green-400 mb-2">Compression Ratio</div>
                  <div className="text-4xl font-bold text-green-400">{result.compressionRatio.toFixed(1)}%</div>
                  <div className="text-sm text-green-400 mt-1">space saved</div>
                </div>
              </div>

              {/* Visual bar comparison */}
              <div className="mt-8 space-y-4">
                <div>
                  <div className="text-sm text-slate-400 mb-2">ASCII Encoding</div>
                  <div className="h-8 bg-slate-800 rounded-lg overflow-hidden">
                    <div className="h-full bg-slate-500 w-full" />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-cyan-400 mb-2">Huffman Encoding</div>
                  <div className="h-8 bg-slate-800 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
                      style={{ width: `${100 - result.compressionRatio}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
