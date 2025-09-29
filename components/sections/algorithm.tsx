"use client"

import { useLanguage } from "@/lib/language-context"
import { useHuffman } from "@/hooks/use-huffman"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export function Algorithm() {
  const { t } = useLanguage()
  const {
    text,
    result,
    steps,
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    encode,
    nextStep,
    prevStep,
    reset,
    play,
    pause,
  } = useHuffman("HELLO")
  const [inputText, setInputText] = useState("HELLO")

  const handleEncode = () => {
    if (inputText.trim()) {
      encode(inputText.trim())
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <section id="algorithm" className="min-h-screen bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            {t.algorithm.title}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t.algorithm.subtitle}</p>
        </div>

        {/* Input controls */}
        <div className="glass-card p-6 rounded-2xl mb-8 max-w-3xl mx-auto">
          <label className="block text-sm font-medium text-slate-300 mb-2">{t.algorithm.controls.input}</label>
          <div className="flex gap-3">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value.toUpperCase())}
              placeholder={t.algorithm.controls.inputPlaceholder}
              className="flex-1 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
            <Button onClick={handleEncode} className="bg-green-500 hover:bg-green-600 text-slate-950 font-semibold">
              Encode
            </Button>
          </div>
        </div>

        {/* Algorithm steps visualization */}
        {result && steps.length > 0 && (
          <div className="space-y-8">
            {/* Step indicator */}
            <div className="glass-card p-6 rounded-2xl max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-slate-400">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? "w-8 bg-green-400"
                          : index < currentStep
                            ? "w-2 bg-green-600"
                            : "w-2 bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="text-lg text-slate-100 mb-6">{currentStepData?.description}</div>

              {/* Nodes visualization */}
              <div className="flex flex-wrap gap-3 mb-6">
                {currentStepData?.nodes.map((node, index) => (
                  <div
                    key={node.id}
                    className={`glass-card p-4 rounded-xl transition-all duration-300 ${
                      currentStepData.highlightNodes?.includes(node.id)
                        ? "ring-2 ring-green-400 scale-110"
                        : currentStepData.currentNode?.id === node.id
                          ? "ring-2 ring-cyan-400 scale-110"
                          : ""
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-mono font-bold text-slate-100 mb-1">
                        {node.char || <span className="text-slate-500">•</span>}
                      </div>
                      <div className="text-sm text-slate-400">freq: {node.freq}</div>
                      {node.code && <div className="text-xs text-cyan-400 font-mono mt-1">{node.code}</div>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Playback controls */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={isPlaying ? pause : play}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={reset}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                <div className="flex-1 ml-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400 whitespace-nowrap">{t.algorithm.controls.speed}</span>
                    <Slider
                      value={[speed]}
                      onValueChange={(value) => setSpeed(value[0])}
                      min={200}
                      max={2000}
                      step={200}
                      className="flex-1"
                    />
                    <span className="text-sm text-slate-400 w-12 text-right">{(speed / 1000).toFixed(1)}s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Algorithm steps list */}
            <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div
                className={`glass-card p-6 rounded-xl transition-all duration-300 ${
                  currentStepData?.type === "frequency" ? "ring-2 ring-blue-400" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                  <span className="text-blue-400 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-slate-100 mb-2">{t.algorithm.steps.frequency}</h4>
                <p className="text-sm text-slate-400">{t.algorithm.stepDescriptions.frequency}</p>
              </div>

              <div
                className={`glass-card p-6 rounded-xl transition-all duration-300 ${
                  currentStepData?.type === "queue" ? "ring-2 ring-green-400" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                  <span className="text-green-400 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-slate-100 mb-2">{t.algorithm.steps.queue}</h4>
                <p className="text-sm text-slate-400">{t.algorithm.stepDescriptions.queue}</p>
              </div>

              <div
                className={`glass-card p-6 rounded-xl transition-all duration-300 ${
                  currentStepData?.type === "merge" ? "ring-2 ring-purple-400" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-slate-100 mb-2">{t.algorithm.steps.tree}</h4>
                <p className="text-sm text-slate-400">{t.algorithm.stepDescriptions.tree}</p>
              </div>

              <div
                className={`glass-card p-6 rounded-xl transition-all duration-300 ${
                  currentStepData?.type === "assign" || currentStepData?.type === "complete"
                    ? "ring-2 ring-orange-400"
                    : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
                  <span className="text-orange-400 font-bold">4</span>
                </div>
                <h4 className="font-semibold text-slate-100 mb-2">{t.algorithm.steps.codes}</h4>
                <p className="text-sm text-slate-400">{t.algorithm.stepDescriptions.codes}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
