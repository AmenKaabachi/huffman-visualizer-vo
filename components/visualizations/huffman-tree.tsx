"use client"

import { useEffect, useRef, useState } from "react"
import { type HuffmanNode, HuffmanCoding } from "@/lib/huffman"

interface HuffmanTreeProps {
  tree: HuffmanNode | null
  width?: number
  height?: number
}

export function HuffmanTree({ tree, width = 800, height = 600 }: HuffmanTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  useEffect(() => {
    if (!tree || !svgRef.current) return

    // Calculate positions
    HuffmanCoding.calculateTreePositions(tree, width / 2, 60, width / 6)

    // Get all nodes
    const nodes = HuffmanCoding.treeToArray(tree)

    // Clear previous content
    const svg = svgRef.current
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild)
    }

    // Create defs for gradients and filters
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")

    // Glow filter
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter")
    filter.setAttribute("id", "glow")
    const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur")
    feGaussianBlur.setAttribute("stdDeviation", "3")
    feGaussianBlur.setAttribute("result", "coloredBlur")
    const feMerge = document.createElementNS("http://www.w3.org/2000/svg", "feMerge")
    const feMergeNode1 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
    feMergeNode1.setAttribute("in", "coloredBlur")
    const feMergeNode2 = document.createElementNS("http://www.w3.org/2000/svg", "feMergeNode")
    feMergeNode2.setAttribute("in", "SourceGraphic")
    feMerge.appendChild(feMergeNode1)
    feMerge.appendChild(feMergeNode2)
    filter.appendChild(feGaussianBlur)
    filter.appendChild(feMerge)
    defs.appendChild(filter)
    svg.appendChild(defs)

    // Draw edges first (so they appear behind nodes)
    nodes.forEach((node) => {
      if (node.left) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", node.x.toString())
        line.setAttribute("y1", node.y.toString())
        line.setAttribute("x2", node.left.x.toString())
        line.setAttribute("y2", node.left.y.toString())
        line.setAttribute("stroke", "rgb(71 85 105)")
        line.setAttribute("stroke-width", "2")
        line.setAttribute("opacity", "0.6")
        svg.appendChild(line)

        // Add "0" label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", ((node.x + node.left.x) / 2 - 10).toString())
        text.setAttribute("y", ((node.y + node.left.y) / 2).toString())
        text.setAttribute("fill", "rgb(6 182 212)")
        text.setAttribute("font-size", "14")
        text.setAttribute("font-weight", "bold")
        text.setAttribute("font-family", "monospace")
        text.textContent = "0"
        svg.appendChild(text)
      }

      if (node.right) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", node.x.toString())
        line.setAttribute("y1", node.y.toString())
        line.setAttribute("x2", node.right.x.toString())
        line.setAttribute("y2", node.right.y.toString())
        line.setAttribute("stroke", "rgb(71 85 105)")
        line.setAttribute("stroke-width", "2")
        line.setAttribute("opacity", "0.6")
        svg.appendChild(line)

        // Add "1" label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", ((node.x + node.right.x) / 2 + 10).toString())
        text.setAttribute("y", ((node.y + node.right.y) / 2).toString())
        text.setAttribute("fill", "rgb(6 182 212)")
        text.setAttribute("font-size", "14")
        text.setAttribute("font-weight", "bold")
        text.setAttribute("font-family", "monospace")
        text.textContent = "1"
        svg.appendChild(text)
      }
    })

    // Draw nodes
    nodes.forEach((node) => {
      const isLeaf = node.isLeaf()
      const isHovered = hoveredNode === node.id

      // Node circle
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", node.x.toString())
      circle.setAttribute("cy", node.y.toString())
      circle.setAttribute("r", isHovered ? "32" : "28")
      circle.setAttribute("fill", isLeaf ? "rgb(251 146 60)" : "rgb(139 92 246)")
      circle.setAttribute("stroke", isHovered ? "rgb(6 182 212)" : "rgb(148 163 184)")
      circle.setAttribute("stroke-width", isHovered ? "3" : "2")
      circle.setAttribute("opacity", "0.9")
      circle.setAttribute("filter", isHovered ? "url(#glow)" : "")
      circle.style.cursor = "pointer"
      circle.style.transition = "all 0.3s ease"

      circle.addEventListener("mouseenter", () => setHoveredNode(node.id))
      circle.addEventListener("mouseleave", () => setHoveredNode(null))

      svg.appendChild(circle)

      // Character text (for leaf nodes)
      if (isLeaf) {
        const charText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        charText.setAttribute("x", node.x.toString())
        charText.setAttribute("y", (node.y + 6).toString())
        charText.setAttribute("text-anchor", "middle")
        charText.setAttribute("fill", "white")
        charText.setAttribute("font-size", "18")
        charText.setAttribute("font-weight", "bold")
        charText.setAttribute("font-family", "monospace")
        charText.textContent = node.char === " " ? "␣" : node.char
        charText.style.pointerEvents = "none"
        svg.appendChild(charText)
      }

      // Frequency text (below node)
      const freqText = document.createElementNS("http://www.w3.org/2000/svg", "text")
      freqText.setAttribute("x", node.x.toString())
      freqText.setAttribute("y", (node.y + 45).toString())
      freqText.setAttribute("text-anchor", "middle")
      freqText.setAttribute("fill", "rgb(148 163 184)")
      freqText.setAttribute("font-size", "12")
      freqText.setAttribute("font-family", "monospace")
      freqText.textContent = `f:${node.freq}`
      freqText.style.pointerEvents = "none"
      svg.appendChild(freqText)

      // Code text (for leaf nodes, above)
      if (isLeaf && node.code) {
        const codeText = document.createElementNS("http://www.w3.org/2000/svg", "text")
        codeText.setAttribute("x", node.x.toString())
        codeText.setAttribute("y", (node.y - 35).toString())
        codeText.setAttribute("text-anchor", "middle")
        codeText.setAttribute("fill", "rgb(6 182 212)")
        codeText.setAttribute("font-size", "14")
        codeText.setAttribute("font-weight", "bold")
        codeText.setAttribute("font-family", "monospace")
        codeText.textContent = node.code
        codeText.style.pointerEvents = "none"
        svg.appendChild(codeText)
      }
    })
  }, [tree, width, height, hoveredNode])

  if (!tree) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400">
        <p>No tree to display. Enter text and click Encode.</p>
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg ref={svgRef} width={width} height={height} className="mx-auto" />
    </div>
  )
}
