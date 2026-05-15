export type Division = 
  | 'Playground'
  | '5U'
  | '6U'
  | '7U'
  | '8U'
  | '9U'
  | '10U'
  | '12U'
  | '15U'
  | '19U'
  | 'Not Eligible';

export interface Season {
  year: string; // e.g., "2025-26"
  startDate: Date;
  cutoffDate: Date; // Aug 1 for most seasons, Jan 1 for 2025-26
}

export interface AgeChartEntry {
  birthDate: Date;
  divisions: Map<string, Division>; // season year -> division
}

export interface DivisionRule {
  division: Division;
  minAge: number; // minimum age on cutoff date
  maxAge: number; // maximum age on cutoff date
}

export type ViewMode = 'table' | 'card';

export interface FilterOptions {
  selectedDivision: Division | 'all';
  numberOfSeasons: number;
  viewMode: ViewMode;
  selectedYear: string;
  selectedMonth: string;
}
