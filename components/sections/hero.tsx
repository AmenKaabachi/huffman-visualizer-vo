"use client"

import { useLanguage } from "@/lib/language-context"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const { t } = useLanguage()
  const [binaryStreams, setBinaryStreams] = useState<Array<{ id: number; delay: number; left: string }>>([])

  useEffect(() => {
    // Generate random binary streams
    const streams = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
    }))
    setBinaryStreams(streams)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated binary background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {binaryStreams.map((stream) => (
          <div
            key={stream.id}
            className="absolute text-cyan-400 font-mono text-sm animate-binary-stream"
            style={{
              left: stream.left,
              animationDelay: `${stream.delay}s`,
            }}
          >
            {Array.from({ length: 30 }, () => (Math.random() > 0.5 ? "1" : "0")).join("")}
          </div>
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Language toggle - top right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageToggle />
      </div>

      {/* Navigation - top center */}
      <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <div className="glass-card px-6 py-3 rounded-full">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <button
                onClick={() => scrollToSection("principles")}
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {t.nav.principles}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("algorithm")}
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {t.nav.algorithm}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("tree")}
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {t.nav.visualization}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("demo")}
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {t.nav.demo}
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("advantages")}
                className="text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {t.nav.advantages}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 text-balance">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 mb-4 font-light">{t.hero.subtitle}</p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 text-pretty">{t.hero.description}</p>

          {/* Binary representation example */}
          <div className="glass-card p-6 rounded-2xl mb-12 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  Fixed-Length (ASCII)
                </div>
                <div className="font-mono text-sm text-slate-300 break-all">
                  01001000 01000101 01001100 01001100 01001111
                </div>
                <div className="text-xs text-slate-500 mt-2">40 bits</div>
              </div>
              <div>
                <div className="text-xs text-cyan-400 uppercase tracking-wider mb-2 font-mono">Huffman Coding</div>
                <div className="font-mono text-sm text-cyan-400 break-all">110 10 0 0 111</div>
                <div className="text-xs text-cyan-400 mt-2">11 bits (72.5% compression)</div>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            onClick={() => scrollToSection("principles")}
            className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold px-8 py-6 text-lg rounded-full animate-pulse-glow"
          >
            Explore the Algorithm
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("principles")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-400 hover:text-cyan-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  )
}
