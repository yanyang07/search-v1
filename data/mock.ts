
import { Scholar, Paper, FilterItem } from '../types';

const generateTrend = (base: number, years: number = 5) => 
  Array.from({ length: years }).map((_, i) => ({
    year: 2020 + i,
    value: Math.floor(base * (0.8 + Math.random() * 0.4))
  }));

export const MOCK_PAPERS: Paper[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `p-${i}`,
  title: [
    "Attention is All You Need: A Deep Dive into Transformer Architectures",
    "Generative Adversarial Networks for High-Resolution Image Synthesis",
    "Deep Residual Learning for Image Recognition",
    "Scaling Laws for Neural Language Models",
    "Large Language Models as Tool Users in Complex Reasoning Tasks"
  ][i % 5] + (i > 4 ? ` (Volume ${Math.floor(i/5) + 1})` : ''),
  authors: ["A. Thorne", "E. Vance", "M. Chen", "J. Doe"].slice(0, (i % 3) + 1),
  venue: ["NeurIPS", "CVPR", "ICML", "ICLR", "Nature AI"][i % 5],
  year: 2020 + (i % 5),
  fields: ["Deep Learning", "Generative AI", "Scalability"].slice(0, (i % 2) + 2),
  heat: 920 + (i * 20),
  citations: 45000 - (i * 1200),
  abstract: "This paper introduces a novel architecture that achieves state-of-the-art results across multiple benchmarks while reducing computational overhead...",
  heatTrend: generateTrend(900, 6),
  citationTrend: generateTrend(40000, 6)
}));

export const MOCK_SCHOLARS: Scholar[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `s-${i}`,
  name: ["Aris Thorne", "Elena Vance", "Marcus Chen", "Sarah Jenkins", "Li Wei", "James Wilson"][i % 6],
  nameCN: ["索恩", "万斯", "陈码", "詹金斯", "李伟", "威尔逊"][i % 6],
  avatar: `https://picsum.photos/seed/scholar${i}/200/200`,
  affiliations: ["Stanford University", "MIT", "Tsinghua University", "Google DeepMind", "Oxford University"].slice(0, (i % 3) + 1),
  fields: ["Computer Vision", "Reinforcement Learning", "NLP", "Robotics"].slice(0, (i % 2) + 2),
  heat: 850 + (i * 15),
  citations: 12400 + (i * 450),
  email: `scholar${i}@university.edu`,
  recentAward: i % 2 === 0 ? "2024 CVPR Best Paper" : "2023 Turing Award Nominee",
  awards: [
    { year: 2024, title: "Best Paper Award", institution: "CVPR" },
    { year: 2022, title: "Rising Star in AI", institution: "IEEE" },
    { year: 2019, title: "Ph.D. Fellowship", institution: "Google" },
    { year: 2015, title: "Outstanding Graduate", institution: "Stanford" }
  ],
  heatTrend: generateTrend(850 + i * 15),
  citationTrend: generateTrend(12400 + i * 450),
  relatedPaperIds: [`p-${(i) % 20}`, `p-${(i + 1) % 20}`, `p-${(i + 2) % 20}`]
}));

export const NESTED_FILTERS: FilterItem[] = [
  {
    id: 'cs',
    label: 'Computer Science',
    children: [
      {
        id: 'ai',
        label: 'Artificial Intelligence',
        children: [
          { id: 'cv', label: 'Computer Vision' },
          { id: 'nlp', label: 'NLP' },
          { id: 'rl', label: 'Reinforcement Learning' }
        ]
      },
      {
        id: 'systems',
        label: 'Systems & Networking',
        children: [
          { id: 'cloud', label: 'Cloud Computing' },
          { id: 'dist', label: 'Distributed Systems' }
        ]
      }
    ]
  },
  {
    id: 'bio',
    label: 'Bio-Engineering',
    children: [
      {
        id: 'genetics',
        label: 'Genetics',
        children: [
          { id: 'crispr', label: 'CRISPR Technology' }
        ]
      }
    ]
  }
];
