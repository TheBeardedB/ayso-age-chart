import React from 'react';
import { AgeChartEntry, Division } from '../types';
import { getBirthYear } from '../utils/ageCalculator';
import { DIVISION_COLORS } from '../config';
import './TableView.css';

interface TableViewProps {
  data: AgeChartEntry[];
  seasons: string[];
  selectedDivision: Division | 'all';
  selectedYear: string;
  selectedMonth: string;
}

interface DateRangeGroup {
  year: number;
  range: string;
  rangeKey: 'H1' | 'H2';
  entries: AgeChartEntry[];
  isAugustCutoff: boolean;
}

const TableView: React.FC<TableViewProps> = ({ data, seasons, selectedDivision, selectedYear, selectedMonth }) => {
  // Filter data based on selected division
  const filteredData = selectedDivision === 'all' 
    ? data 
    : data.filter(entry => 
        Array.from(entry.divisions.values()).some(div => div === selectedDivision)
      );

  // Group data by birth year and date range (Jan-Jul vs Aug-Dec)
  const groupedData: DateRangeGroup[] = [];
  
  // Process data to create date range groups
  for (let i = 0; i < filteredData.length; i += 2) {
    const firstEntry = filteredData[i];
    const secondEntry = filteredData[i + 1];
    
    if (!firstEntry) continue;
    
    const year = getBirthYear(firstEntry.birthDate);
    const month = firstEntry.birthDate.getMonth();
    
    // Determine if this is Jan-Jul or Aug-Dec range
    if (month === 0 && secondEntry && secondEntry.birthDate.getMonth() === 6) {
      // Jan 1 - Jul 31 range
      groupedData.push({
        year,
        range: 'Jan 1 - Jul 31',
        rangeKey: 'H1',
        entries: [firstEntry, secondEntry],
        isAugustCutoff: false
      });
    } else if (month === 7 && secondEntry && secondEntry.birthDate.getMonth() === 11) {
      // Aug 1 - Dec 31 range
      groupedData.push({
        year,
        range: 'Aug 1 - Dec 31',
        rangeKey: 'H2',
        entries: [firstEntry, secondEntry],
        isAugustCutoff: true
      });
    } else {
      // Handle edge cases (single dates at boundaries)
      const rangeStr = month < 7 ? 'Jan 1 - Jul 31' : 'Aug 1 - Dec 31';
      groupedData.push({
        year,
        range: rangeStr,
        rangeKey: month < 7 ? 'H1' : 'H2',
        entries: secondEntry ? [firstEntry, secondEntry] : [firstEntry],
        isAugustCutoff: month >= 7
      });
      if (secondEntry && i + 1 < filteredData.length - 1) {
        i--; // Process the second entry in the next iteration
      }
    }
  }

  let selectedYearNumber: number | null = null;
  let selectedRangeKey: 'H1' | 'H2' | null = null;

  if (selectedYear) {
    const year = Number(selectedYear);
    if (!Number.isNaN(year)) {
      selectedYearNumber = year;
    }
  }

  if (selectedMonth) {
    const month = Number(selectedMonth);
    if (!Number.isNaN(month)) {
      selectedRangeKey = month <= 7 ? 'H1' : 'H2';
    }
  }

  const availableYears = Array.from(new Set(groupedData.map(group => group.year))).sort((a, b) => a - b);

  const visibleGroups = groupedData.filter(group => {
    if (selectedYearNumber === null) {
      return true;
    }

    const adjacentYears = [selectedYearNumber - 1, selectedYearNumber, selectedYearNumber + 1]
      .filter(year => availableYears.includes(year));

    return adjacentYears.includes(group.year);
  });

  const groupsByYear = visibleGroups.reduce<Record<number, DateRangeGroup[]>>((acc, group) => {
    if (!acc[group.year]) {
      acc[group.year] = [];
    }
    acc[group.year].push(group);
    return acc;
  }, {});

  const orderedYears = Object.keys(groupsByYear)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="table-container" style={{ ['--season-count' as string]: seasons.length }}>
      <div className="year-grid-header">
        <div className="header-cell year-col">Birth Year</div>
        <div className="header-cell range-col">Birth Date Range</div>
        {seasons.map(season => (
          <div key={season} className="header-cell season-col">{season}</div>
        ))}
      </div>

      <div className="year-cards">
        {orderedYears.map((year) => {
          const yearGroups = groupsByYear[year].sort((a, b) => a.rangeKey.localeCompare(b.rangeKey));
          return (
            <div key={year} className="year-card">
              <div className="year-cell">{year}</div>
              <div className="year-rows">
                {yearGroups.map((group) => {
                  const isSelectedMatch = selectedYearNumber === year && selectedRangeKey === group.rangeKey;
                  return (
                    <div
                      key={`${year}-${group.rangeKey}`}
                      className={`year-row ${group.isAugustCutoff ? 'august-cutoff' : ''} ${isSelectedMatch && selectedMonth ? 'selected-date-row' : ''}`}
                    >
                      <div className="range-cell">
                        <span className={`range-badge ${group.rangeKey === 'H1' ? 'range-h1' : 'range-h2'}`}>
                          {group.range}
                        </span>
                      </div>
                      {seasons.map(season => {
                        const division = group.entries[0]?.divisions.get(season);
                        const backgroundColor = division && division !== 'Not Eligible'
                          ? DIVISION_COLORS[division]
                          : DIVISION_COLORS['Not Eligible'];
                        return (
                          <div
                            key={season}
                            className="division-cell"
                            style={{ backgroundColor }}
                          >
                            {division || 'N/A'}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {visibleGroups.length === 0 && (
          <div className="no-results-cell">
            No rows match the selected year and current filters.
          </div>
        )}
      </div>
      
      <div className="table-legend">
        <div className="legend-item">
          <span className="legend-color august-indicator"></span>
          <span>Aug 1 - Dec 31: Birth dates after the typical AYSO cutoff</span>
        </div>
        <div className="legend-item">
          <span className="legend-note">Note: 2025-26 season uses Dec 31 cutoff instead of Aug 1</span>
        </div>
      </div>
      
      {selectedDivision !== 'all' && (
        <div className="filter-note">
          Showing only birth date ranges with players eligible for {selectedDivision}
        </div>
      )}
    </div>
  );
};

export default TableView;
