export class HuffmanNode {
  char: string
  freq: number
  left: HuffmanNode | null
  right: HuffmanNode | null
  code: string
  x: number
  y: number
  id: string

  constructor(char: string, freq: number, left: HuffmanNode | null = null, right: HuffmanNode | null = null) {
    this.char = char
    this.freq = freq
    this.left = left
    this.right = right
    this.code = ""
    this.x = 0
    this.y = 0
    this.id = Math.random().toString(36).substr(2, 9)
  }

  isLeaf(): boolean {
    return this.left === null && this.right === null
  }
}

export interface FrequencyData {
  char: string
  freq: number
  code: string
  percentage: number
}

export interface EncodingResult {
  original: string
  encoded: string
  tree: HuffmanNode | null
  frequencies: FrequencyData[]
  codes: Map<string, string>
  compressionRatio: number
  originalBits: number
  encodedBits: number
}

export interface AlgorithmStep {
  type: "frequency" | "queue" | "merge" | "assign" | "complete"
  description: string
  nodes: HuffmanNode[]
  currentNode?: HuffmanNode
  highlightNodes?: string[]
}

export class HuffmanCoding {
  private text: string
  private root: HuffmanNode | null = null
  private codes: Map<string, string> = new Map()
  private frequencies: Map<string, number> = new Map()
  private steps: AlgorithmStep[] = []

  constructor(text: string) {
    this.text = text
  }

  // Calculate character frequencies
  private calculateFrequencies(): Map<string, number> {
    const freqMap = new Map<string, number>()
    for (const char of this.text) {
      freqMap.set(char, (freqMap.get(char) || 0) + 1)
    }
    this.frequencies = freqMap

    // Add step
    const nodes = Array.from(freqMap.entries()).map(([char, freq]) => new HuffmanNode(char, freq))
    this.steps.push({
      type: "frequency",
      description: "Calculate character frequencies from input text",
      nodes: nodes,
    })

    return freqMap
  }

  // Build priority queue (min-heap)
  private buildPriorityQueue(freqMap: Map<string, number>): HuffmanNode[] {
    const queue: HuffmanNode[] = []
    for (const [char, freq] of freqMap.entries()) {
      queue.push(new HuffmanNode(char, freq))
    }
    queue.sort((a, b) => a.freq - b.freq)

    this.steps.push({
      type: "queue",
      description: "Build priority queue sorted by frequency (ascending)",
      nodes: [...queue],
    })

    return queue
  }

  // Build Huffman tree
  private buildTree(queue: HuffmanNode[]): HuffmanNode | null {
    if (queue.length === 0) return null
    if (queue.length === 1) return queue[0]

    while (queue.length > 1) {
      // Remove two nodes with minimum frequency
      const left = queue.shift()!
      const right = queue.shift()!

      // Create internal node with combined frequency
      const parent = new HuffmanNode("", left.freq + right.freq, left, right)

      // Add step for merge
      this.steps.push({
        type: "merge",
        description: `Merge nodes '${left.char || "internal"}' (${left.freq}) and '${right.char || "internal"}' (${right.freq})`,
        nodes: [...queue, parent],
        currentNode: parent,
        highlightNodes: [left.id, right.id],
      })

      // Insert back into queue maintaining sorted order
      let inserted = false
      for (let i = 0; i < queue.length; i++) {
        if (parent.freq < queue[i].freq) {
          queue.splice(i, 0, parent)
          inserted = true
          break
        }
      }
      if (!inserted) {
        queue.push(parent)
      }
    }

    return queue[0]
  }

  // Assign binary codes to characters
  private assignCodes(node: HuffmanNode | null, code = ""): void {
    if (!node) return

    if (node.isLeaf()) {
      node.code = code || "0" // Handle single character case
      this.codes.set(node.char, node.code)
    }

    if (node.left) {
      this.assignCodes(node.left, code + "0")
    }
    if (node.right) {
      this.assignCodes(node.right, code + "1")
    }
  }

  // Encode text using Huffman codes
  public encode(): EncodingResult {
    if (!this.text || this.text.length === 0) {
      return {
        original: "",
        encoded: "",
        tree: null,
        frequencies: [],
        codes: new Map(),
        compressionRatio: 0,
        originalBits: 0,
        encodedBits: 0,
      }
    }

    // Step 1: Calculate frequencies
    const freqMap = this.calculateFrequencies()

    // Step 2: Build priority queue
    const queue = this.buildPriorityQueue(freqMap)

    // Step 3: Build Huffman tree
    this.root = this.buildTree(queue)

    // Step 4: Assign codes
    this.assignCodes(this.root)

    this.steps.push({
      type: "assign",
      description: "Assign binary codes: left=0, right=1",
      nodes: this.root ? [this.root] : [],
    })

    // Step 5: Encode text
    let encoded = ""
    for (const char of this.text) {
      encoded += this.codes.get(char) || ""
    }

    this.steps.push({
      type: "complete",
      description: "Encoding complete!",
      nodes: this.root ? [this.root] : [],
    })

    // Calculate compression metrics
    const originalBits = this.text.length * 8 // ASCII uses 8 bits per character
    const encodedBits = encoded.length
    const compressionRatio = originalBits > 0 ? ((originalBits - encodedBits) / originalBits) * 100 : 0

    // Prepare frequency data
    const totalChars = this.text.length
    const frequencies: FrequencyData[] = Array.from(freqMap.entries()).map(([char, freq]) => ({
      char,
      freq,
      code: this.codes.get(char) || "",
      percentage: (freq / totalChars) * 100,
    }))
    frequencies.sort((a, b) => b.freq - a.freq)

    return {
      original: this.text,
      encoded,
      tree: this.root,
      frequencies,
      codes: this.codes,
      compressionRatio,
      originalBits,
      encodedBits,
    }
  }

  // Decode binary string using Huffman tree
  public decode(encoded: string, tree: HuffmanNode | null): string {
    if (!tree || !encoded) return ""

    let decoded = ""
    let current = tree

    for (const bit of encoded) {
      if (bit === "0") {
        current = current.left!
      } else {
        current = current.right!
      }

      if (current.isLeaf()) {
        decoded += current.char
        current = tree
      }
    }

    return decoded
  }

  // Get algorithm steps for visualization
  public getSteps(): AlgorithmStep[] {
    return this.steps
  }

  // Get tree root
  public getTree(): HuffmanNode | null {
    return this.root
  }

  // Get codes map
  public getCodes(): Map<string, string> {
    return this.codes
  }

  // Calculate tree positions for visualization
  public static calculateTreePositions(node: HuffmanNode | null, x = 0, y = 0, horizontalSpacing = 100): void {
    if (!node) return

    node.x = x
    node.y = y

    const childY = y + 80

    if (node.left) {
      this.calculateTreePositions(node.left, x - horizontalSpacing, childY, horizontalSpacing * 0.6)
    }

    if (node.right) {
      this.calculateTreePositions(node.right, x + horizontalSpacing, childY, horizontalSpacing * 0.6)
    }
  }

  // Convert tree to array for easier rendering
  public static treeToArray(node: HuffmanNode | null): HuffmanNode[] {
    if (!node) return []

    const result: HuffmanNode[] = [node]

    if (node.left) {
      result.push(...this.treeToArray(node.left))
    }

    if (node.right) {
      result.push(...this.treeToArray(node.right))
    }

    return result
  }
}

// Utility function to format binary string with spaces
export function formatBinary(binary: string, groupSize = 8): string {
  const groups: string[] = []
  for (let i = 0; i < binary.length; i += groupSize) {
    groups.push(binary.slice(i, i + groupSize))
  }
  return groups.join(" ")
}

// Utility function to get color for character (for visualization)
export function getCharColor(index: number): string {
  const colors = [
    "rgb(59 130 246)", // blue
    "rgb(34 197 94)", // green
    "rgb(168 85 247)", // purple
    "rgb(251 146 60)", // orange
    "rgb(236 72 153)", // pink
    "rgb(14 165 233)", // cyan
    "rgb(234 179 8)", // yellow
    "rgb(239 68 68)", // red
  ]
  return colors[index % colors.length]
}
