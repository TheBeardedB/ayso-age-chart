import { useState, useMemo } from 'react';
import { FilterOptions, AgeChartEntry } from './types';
import { 
  generateSeasons, 
  CURRENT_SEASON_START_YEAR, 
  DEFAULT_SEASONS_TO_SHOW 
} from './config';
import { generateBirthDateRange, getBirthYear, getDivisionForSeason } from './utils/ageCalculator';
import Controls from './components/Controls';
import TableView from './components/TableView';
import './App.css';

function App() {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    selectedDivision: 'all',
    numberOfSeasons: DEFAULT_SEASONS_TO_SHOW,
    viewMode: 'table',
    selectedYear: '',
    selectedMonth: ''
  });

  // Generate seasons based on filter
  const seasons = useMemo(() => 
    generateSeasons(CURRENT_SEASON_START_YEAR, filterOptions.numberOfSeasons),
    [filterOptions.numberOfSeasons]
  );

  // Generate chart data
  const chartData = useMemo(() => {
    const birthDates = generateBirthDateRange(seasons);
    const data: AgeChartEntry[] = [];

    birthDates.forEach(birthDate => {
      const entry: AgeChartEntry = {
        birthDate,
        divisions: new Map()
      };

      seasons.forEach(season => {
        const division = getDivisionForSeason(birthDate, season);
        entry.divisions.set(season.year, division);
      });

      data.push(entry);
    });

    return data;
  }, [seasons]);

  const seasonYears = seasons.map(s => s.year);

  const availableBirthYears = useMemo(() => {
    const filteredData = filterOptions.selectedDivision === 'all'
      ? chartData
      : chartData.filter(entry =>
          Array.from(entry.divisions.values()).some(div => div === filterOptions.selectedDivision)
        );

    return Array.from(new Set(filteredData.map(entry => getBirthYear(entry.birthDate))))
      .sort((a, b) => a - b);
  }, [chartData, filterOptions.selectedDivision]);

  return (
    <div className="app">
      <div className="container">
        <Controls 
          filterOptions={filterOptions}
          onFilterChange={setFilterOptions}
          availableBirthYears={availableBirthYears}
        />

        <div className="chart-container">
          <TableView 
            data={chartData}
            seasons={seasonYears}
            selectedDivision={filterOptions.selectedDivision}
            selectedYear={filterOptions.selectedYear}
            selectedMonth={filterOptions.selectedMonth}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
