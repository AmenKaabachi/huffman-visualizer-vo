"use client"

import { Hero } from "@/components/sections/hero"
import { Principles } from "@/components/sections/principles"
import { Algorithm } from "@/components/sections/algorithm"
import { TreeVisualization } from "@/components/sections/tree-visualization"
import { Demo } from "@/components/sections/demo"
import { Advantages } from "@/components/sections/advantages"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Principles />
      <Algorithm />
      <TreeVisualization />
      <Demo />
      <Advantages />
    </main>
  )
}
