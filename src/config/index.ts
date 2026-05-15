import { Division, DivisionRule, Season } from '../types';

// Division age rules (age as of cutoff date)
export const DIVISION_RULES: DivisionRule[] = [
  { division: '19U', minAge: 15, maxAge: 18 },
  { division: '15U', minAge: 13, maxAge: 14 },
  { division: '12U', minAge: 10, maxAge: 12 },
  { division: '10U', minAge: 8, maxAge: 9 },
  { division: '9U', minAge: 7, maxAge: 8 },
  { division: '8U', minAge: 6, maxAge: 7 },
  { division: '7U', minAge: 5, maxAge: 6 },
  { division: '6U', minAge: 4, maxAge: 5 },
  { division: '5U', minAge: 3, maxAge: 4 },
  { division: 'Playground', minAge: 0, maxAge: 3 },
];

export const DIVISIONS: Division[] = [
  'Playground',
  '5U',
  '6U',
  '7U',
  '8U',
  '9U',
  '10U',
  '12U',
  '15U',
  '19U'
];

// Generate seasons dynamically
export function generateSeasons(startYear: number, count: number): Season[] {
  const seasons: Season[] = [];
  
  for (let i = 0; i < count; i++) {
    const year = startYear + i;
    const seasonYear = `${year}-${(year + 1).toString().slice(-2)}`;
    
    // Special case: 2025-26 uses Dec 31 cutoff
    if (year === 2025) {
      seasons.push({
        year: seasonYear,
        startDate: new Date(year, 7, 1), // Aug 1
        cutoffDate: new Date(year, 11, 31), // Dec 31, 2025 for 2025-26
      });
    } else {
      // "Before Aug 1" means a Jul 31 cutoff for age calculation.
      seasons.push({
        year: seasonYear,
        startDate: new Date(year, 7, 1), // Aug 1
        cutoffDate: new Date(year, 6, 31), // Jul 31 for other seasons
      });
    }
  }
  
  return seasons;
}

// Current season starts in 2025
export const CURRENT_SEASON_START_YEAR = 2025;
export const MAX_SEASONS = 10;
export const DEFAULT_SEASONS_TO_SHOW = 5;

// Division colors for visual representation
export const DIVISION_COLORS: Record<Division | 'Not Eligible', string> = {
  'Playground': '#e3f2fd',
  '5U': '#f3e5f5',
  '6U': '#fff3e0',
  '7U': '#e8f5e9',
  '8U': '#fce4ec',
  '9U': '#fff9c4',
  '10U': '#e0f2f1',
  '12U': '#f1f8e9',
  '15U': '#fbe9e7',
  '19U': '#ede7f6',
  'Not Eligible': '#f5f5f5'
};
