"use client"

import { useState, useCallback, useEffect } from "react"
import { HuffmanCoding, type EncodingResult, type AlgorithmStep } from "@/lib/huffman"

export function useHuffman(initialText = "HELLO WORLD") {
  const [text, setText] = useState(initialText)
  const [result, setResult] = useState<EncodingResult | null>(null)
  const [steps, setSteps] = useState<AlgorithmStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1000) // milliseconds per step

  const encode = useCallback((inputText: string) => {
    if (!inputText || inputText.length === 0) {
      setResult(null)
      setSteps([])
      setCurrentStep(0)
      return
    }

    const huffman = new HuffmanCoding(inputText)
    const encodingResult = huffman.encode()
    const algorithmSteps = huffman.getSteps()

    // Calculate tree positions
    if (encodingResult.tree) {
      HuffmanCoding.calculateTreePositions(encodingResult.tree, 0, 0, 150)
    }

    setResult(encodingResult)
    setSteps(algorithmSteps)
    setCurrentStep(0)
    setText(inputText)
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  const play = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(interval)
  }, [isPlaying, speed, steps.length])

  // Initial encoding
  useEffect(() => {
    encode(initialText)
  }, []) // Only run once on mount

  return {
    text,
    setText,
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
  }
}
