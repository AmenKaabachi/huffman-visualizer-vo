export type Language = "en" | "fr"

export interface Translations {
  hero: {
    title: string
    subtitle: string
    description: string
    fixedLength: string
    huffmanCoding: string
    bits: string
  }
  footer: {
    credit: string
  }
  nav: {
    principles: string
    algorithm: string
    visualization: string
    demo: string
    advantages: string
  }
  principles: {
    title: string
    subtitle: string
    frequency: {
      title: string
      description: string
    }
    variableLength: {
      title: string
      description: string
    }
    prefixCode: {
      title: string
      description: string
    }
    example: {
      title: string
      fixedLength: string
      huffmanCoding: string
      compression: string
      characters: string
      bits: string
    }
  }
  algorithm: {
    title: string
    subtitle: string
    steps: {
      frequency: string
      queue: string
      tree: string
      codes: string
    }
    stepDescriptions: {
      frequency: string
      queue: string
      tree: string
      codes: string
    }
    controls: {
      play: string
      pause: string
      reset: string
      speed: string
      input: string
      inputPlaceholder: string
    }
  }
  tree: {
    title: string
    subtitle: string
    legend: {
      internal: string
      leaf: string
      frequency: string
      code: string
    }
  }
  demo: {
    title: string
    subtitle: string
    original: string
    encoded: string
    compression: string
    bits: string
    characters: string
    ascii: string
    huffman: string
    saved: string
  }
  advantages: {
    title: string
    subtitle: string
    items: {
      lossless: {
        title: string
        description: string
      }
      optimal: {
        title: string
        description: string
      }
      efficient: {
        title: string
        description: string
      }
    }
    applications: {
      title: string
      items: string[]
    }
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: "Huffman Coding",
      subtitle: "Interactive Algorithm Visualizer",
      description:
        "Understand lossless data compression through interactive visualizations and step-by-step algorithm exploration.",
      fixedLength: "Fixed-Length (ASCII)",
      huffmanCoding: "Huffman Coding",
      bits: "bits",
    },
    nav: {
      principles: "Principles",
      algorithm: "Algorithm",
      visualization: "Tree",
      demo: "Demo",
      advantages: "Applications",
    },
    principles: {
      title: "Core Principles",
      subtitle: "Understanding the foundation of Huffman Coding",
      frequency: {
        title: "Character Frequency",
        description:
          "Huffman coding analyzes how often each character appears in the data. More frequent characters get shorter codes.",
      },
      variableLength: {
        title: "Variable-Length Codes",
        description:
          "Unlike fixed-length encoding (like ASCII), Huffman uses variable-length codes to optimize compression.",
      },
      prefixCode: {
        title: "Prefix-Free Property",
        description: "No code is a prefix of another, ensuring unambiguous decoding without delimiters.",
      },
      example: {
        title: "Example: \"HELLO\" Frequency Analysis",
        fixedLength: "Fixed-Length (3 bits/char)",
        huffmanCoding: "Huffman Coding",
        compression: "26.7% compression",
        characters: "5 characters × 3 bits",
        bits: "bits",
      },
    },
    algorithm: {
      title: "Algorithm Visualization",
      subtitle: "Watch the Huffman algorithm build the encoding tree step by step",
      steps: {
        frequency: "Calculate character frequencies",
        queue: "Build priority queue",
        tree: "Construct Huffman tree",
        codes: "Assign binary codes",
      },
      stepDescriptions: {
        frequency: "Count character occurrences",
        queue: "Sort by frequency", 
        tree: "Merge lowest frequencies",
        codes: "Traverse tree: left=0, right=1",
      },
      controls: {
        play: "Play",
        pause: "Pause",
        reset: "Reset",
        speed: "Speed",
        input: "Input Text",
        inputPlaceholder: "Enter text to encode...",
      },
    },
    tree: {
      title: "Tree Visualization",
      subtitle: "Interactive binary tree showing the encoding structure",
      legend: {
        internal: "Internal Node",
        leaf: "Leaf Node (Character)",
        frequency: "Frequency",
        code: "Binary Code",
      },
    },
    demo: {
      title: "Encoding Demo",
      subtitle: "See how text is compressed into binary",
      original: "Original Text",
      encoded: "Encoded Binary",
      compression: "Compression Ratio",
      bits: "bits",
      characters: "characters",
      ascii: "ASCII Encoding (8 bits/char)",
      huffman: "Huffman",
      saved: "bits",
    },
    advantages: {
      title: "Advantages & Applications",
      subtitle: "Why Huffman coding matters in modern computing",
      items: {
        lossless: {
          title: "Lossless Compression",
          description: "Perfect reconstruction of original data with no information loss.",
        },
        optimal: {
          title: "Optimal Prefix Codes",
          description: "Produces the shortest possible prefix-free code for given frequencies.",
        },
        efficient: {
          title: "Efficient Implementation",
          description: "Fast encoding and decoding with simple tree traversal.",
        },
      },
      applications: {
        title: "Real-World Applications",
        items: [
          "JPEG image compression",
          "MP3 audio compression",
          "ZIP file compression",
          "Network data transmission",
          "Database compression",
        ],
      },
    },
    footer: {
      credit: "Developed by ISAMM Engineering Students • Computer Networks Course Project",
    },
  },
  fr: {
    hero: {
      title: "Codage Huffman",
      subtitle: "Visualiseur d'Algorithme Interactif",
      description:
        "Le codage de Huffman est une méthode de compression sans perte, utilisée dans la couche application , qui permet de réduire la taille des données tout en conservant toutes les informations originales",
      fixedLength: "Longueur fixe (ASCII)",
      huffmanCoding: "Codage Huffman",
      bits: "bits",
    },
    nav: {
      principles: "Principes",
      algorithm: "Algorithme",
      visualization: "Arbre",
      demo: "Démo",
      advantages: "Applications",
    },
    principles: {
      title: "Principes Fondamentaux",
      subtitle: "Comprendre les bases du codage Huffman",
      frequency: {
        title: "Fréquence des Caractères",
        description:
          "Le codage Huffman analyse la fréquence d'apparition de chaque caractère. Les caractères plus fréquents reçoivent des codes plus courts.",
      },
      variableLength: {
        title: "Codes de Longueur Variable",
        description:
          "Contrairement au codage à longueur fixe (comme ASCII), Huffman utilise des codes de longueur variable pour optimiser la compression.",
      },
      prefixCode: {
        title: "Propriété Sans Préfixe",
        description:
          "Aucun code n'est le préfixe d'un autre, garantissant un décodage sans ambiguïté sans délimiteurs.",
      },
      example: {
        title: "Exemple : Analyse de fréquence \"HELLO\"",
        fixedLength: "Longueur fixe (3 bits/char)",
        huffmanCoding: "Codage Huffman",
        compression: "26,7% de compression",
        characters: "5 caractères × 3 bits",
        bits: "bits",
      },
    },
    algorithm: {
      title: "Les étapes de construction de l'algorithme de Huffman",
      subtitle: "Observez l'algorithme Huffman construire l'arbre de codage étape par étape",
      steps: {
        frequency: "Calculer les fréquences des caractères",
        queue: "Construire la file de priorité",
        tree: "Construire l'arbre Huffman",
        codes: "Attribuer les codes binaires",
      },
      stepDescriptions: {
        frequency: "compter les occurrences de chaque caractère dans le texte",
        queue: "trier les symboles par fréquence croissante",
        tree: "fusionner les deux nœuds de plus faible fréquence jusqu'à obtenir la racine",
        codes: "parcourir l'arbre : gauche = 0, droite = 1 → obtenir les codes préfixes",
      },
      controls: {
        play: "Jouer",
        pause: "Pause",
        reset: "Réinitialiser",
        speed: "Vitesse",
        input: "Texte d'Entrée",
        inputPlaceholder: "Entrez le texte à encoder...",
      },
    },
    tree: {
      title: "Visualisation de l'Arbre",
      subtitle: "Arbre binaire interactif montrant la structure de codage",
      legend: {
        internal: "Nœud Interne",
        leaf: "Nœud Feuille (Caractère)",
        frequency: "Fréquence",
        code: "Code Binaire",
      },
    },
    demo: {
      title: "Démonstration d'Encodage",
      subtitle: "Voyez comment le texte est compressé en binaire",
      original: "Texte Original",
      encoded: "Binaire Encodé",
      compression: "Taux de Compression",
      bits: "bits",
      characters: "caractères",
      ascii: "Encodage ASCII (8 bits/car)",
      huffman: "Huffman",
      saved: "bits",
    },
    advantages: {
      title: "Avantages & Applications",
      subtitle: "Pourquoi le codage Huffman est important dans l'informatique moderne",
      items: {
        lossless: {
          title: "Compression Sans Perte",
          description: "Reconstruction parfaite des données originales sans perte d'information.",
        },
        optimal: {
          title: "Codes Préfixes Optimaux",
          description: "Produit le code sans préfixe le plus court possible pour des fréquences données.",
        },
        efficient: {
          title: "Implémentation Efficace",
          description: "Encodage et décodage rapides avec un simple parcours d'arbre.",
        },
      },
      applications: {
        title: "Applications Réelles",
        items: [
          "Compression d'images JPEG",
          "Compression audio MP3",
          "Compression de fichiers ZIP",
          "Transmission de données réseau",
          "Compression de bases de données",
        ],
      },
    },
    footer: {
      credit: "Développé par les étudiants ingénieurs ISAMM • Projet du cours Réseaux Informatiques",
    },
  },
}

export function getTranslations(lang: Language): Translations {
  return translations[lang]
}
