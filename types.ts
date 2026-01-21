
export interface Award {
  year: number;
  title: string;
  institution: string;
}

export interface MetricTrend {
  year: number;
  value: number;
}

export interface Scholar {
  id: string;
  name: string;
  nameCN: string;
  avatar: string;
  affiliations: string[];
  fields: string[];
  heat: number;
  citations: number;
  email: string;
  awards: Award[];
  recentAward: string;
  heatTrend: MetricTrend[];
  citationTrend: MetricTrend[];
  relatedPaperIds: string[];
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  fields: string[];
  heat: number;
  citations: number;
  abstract: string;
  heatTrend: MetricTrend[];
  citationTrend: MetricTrend[];
}

export type SortOption = 'relevance' | 'heat' | 'citations' | 'date';

export interface FilterItem {
  id: string;
  label: string;
  children?: FilterItem[];
}

export interface FilterState {
  activeIds: string[];
}
