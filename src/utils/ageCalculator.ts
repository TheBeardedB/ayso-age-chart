import { Division, Season } from '../types';
import { DIVISION_RULES } from '../config';
import { differenceInYears, addYears } from 'date-fns';

/**
 * Calculate the age of a person on a specific date
 */
export function calculateAge(birthDate: Date, onDate: Date): number {
  return differenceInYears(onDate, birthDate);
}

/**
 * Determine which division a player belongs to for a given season
 */
export function getDivisionForSeason(birthDate: Date, season: Season): Division {
  const age = calculateAge(birthDate, season.cutoffDate);
  
  // Check if too old (19 or older)
  if (age >= 19) {
    return 'Not Eligible';
  }
  
  // Check if too young (under 3)
  if (age < 3) {
    // But if they'll turn 3 during the season year, they can play Playground
    const seasonEndDate = addYears(season.startDate, 1);
    const ageAtSeasonEnd = calculateAge(birthDate, seasonEndDate);
    if (ageAtSeasonEnd >= 3) {
      return 'Playground';
    }
    return 'Not Eligible';
  }
  
  // Find the appropriate division based on age
  // Work from oldest to youngest divisions
  for (const rule of DIVISION_RULES) {
    if (age >= rule.minAge && age <= rule.maxAge) {
      return rule.division;
    }
  }
  
  // Fallback (shouldn't happen with proper rules)
  return 'Not Eligible';
}

/**
 * Generate birth date range that covers all eligible players for given seasons
 */
export function generateBirthDateRange(seasons: Season[]): Date[] {
  if (seasons.length === 0) return [];
  
  const firstSeason = seasons[0];
  const lastSeason = seasons[seasons.length - 1];
  
  // Oldest possible player: Will be 18 (last year of 19U) in the first season
  // So they were born 18 years before the first season's cutoff
  const oldestBirthDate = addYears(firstSeason.cutoffDate, -18);
  
  // Youngest possible player: Will turn 3 (eligible for Playground) in the last season
  // So they were born 3 years before the end of the last season
  const lastSeasonEnd = addYears(lastSeason.startDate, 1);
  const youngestBirthDate = addYears(lastSeasonEnd, -3);
  
  // Generate dates with two ranges per year: Jan 1-Jul 31 and Aug 1-Dec 31
  const dates: Date[] = [];
  const startYear = oldestBirthDate.getFullYear();
  const endYear = youngestBirthDate.getFullYear();
  
  for (let year = startYear; year <= endYear; year++) {
    // Add January 1st date
    const jan1 = new Date(year, 0, 1);
    if (jan1 >= oldestBirthDate && jan1 <= youngestBirthDate) {
      dates.push(jan1);
    }
    
    // Add July 31st date
    const jul31 = new Date(year, 6, 31);
    if (jul31 >= oldestBirthDate && jul31 <= youngestBirthDate) {
      dates.push(jul31);
    }
    
    // Add August 1st date
    const aug1 = new Date(year, 7, 1);
    if (aug1 >= oldestBirthDate && aug1 <= youngestBirthDate) {
      dates.push(aug1);
    }
    
    // Add December 31st date
    const dec31 = new Date(year, 11, 31);
    if (dec31 >= oldestBirthDate && dec31 <= youngestBirthDate) {
      dates.push(dec31);
    }
  }
  
  return dates;
}

/**
 * Format a date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get birth year from date
 */
export function getBirthYear(date: Date): number {
  return date.getFullYear();
}
