import React, { useEffect, useState } from 'react';
import { FilterOptions } from '../types';
import './Controls.css';

interface ControlsProps {
  filterOptions: FilterOptions;
  onFilterChange: (options: FilterOptions) => void;
  availableBirthYears: number[];
}

const Controls: React.FC<ControlsProps> = ({ 
  filterOptions, 
  onFilterChange, 
  availableBirthYears
}) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    setSelectedYear(filterOptions.selectedYear || '');
    setSelectedMonth(filterOptions.selectedMonth || '');
  }, [filterOptions.selectedYear, filterOptions.selectedMonth]);

  const monthOptions = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' }
  ];
  
  const updateSelection = (year: string, month: string) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    onFilterChange({ ...filterOptions, selectedYear: year, selectedMonth: month });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    const month = year ? selectedMonth : '';
    updateSelection(year, month);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;
    updateSelection(selectedYear, month);
  };

  const clearSelection = () => {
    setSelectedYear('');
    setSelectedMonth('');
    onFilterChange({ ...filterOptions, selectedYear: '', selectedMonth: '' });
  };

  return (
    <div className="controls">
      <div className="controls-row controls-row-secondary">
        <div className="control-group date-match-group">
          <label>Birth Year/Month:</label>
          <select aria-label="Birth year" value={selectedYear} onChange={handleYearChange}>
            <option value="">Year</option>
            {availableBirthYears.map(year => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
          <select
            aria-label="Birth month"
            value={selectedMonth}
            onChange={handleMonthChange}
            disabled={!selectedYear}
          >
            <option value="">Month</option>
            {monthOptions.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          {selectedYear && (
            <button
              type="button"
              className="clear-date-btn"
              onClick={clearSelection}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
