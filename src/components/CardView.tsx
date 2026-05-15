import React from 'react';
import { AgeChartEntry, Division } from '../types';
import { getBirthYear } from '../utils/ageCalculator';
import { DIVISION_COLORS } from '../config';
import './CardView.css';

interface CardViewProps {
  data: AgeChartEntry[];
  seasons: string[];
  selectedDivision: Division | 'all';
}

const CardView: React.FC<CardViewProps> = ({ data, seasons, selectedDivision }) => {
  // Group data by division for each season, tracking birth year ranges
  const seasonDivisionMap = new Map<string, Map<Division, {years: Set<number>, hasAugustBirths: boolean}>>();
  
  seasons.forEach(season => {
    const divisionMap = new Map<Division, {years: Set<number>, hasAugustBirths: boolean}>();
    
    data.forEach(entry => {
      const division = entry.divisions.get(season);
      if (division && division !== 'Not Eligible') {
        const birthYear = getBirthYear(entry.birthDate);
        const birthMonth = entry.birthDate.getMonth();
        const isAugustOrLater = birthMonth >= 7; // August is month 7
        
        if (!divisionMap.has(division)) {
          divisionMap.set(division, { years: new Set(), hasAugustBirths: false });
        }
        
        const divData = divisionMap.get(division)!;
        divData.years.add(birthYear);
        if (isAugustOrLater) {
          divData.hasAugustBirths = true;
        }
      }
    });
    
    seasonDivisionMap.set(season, divisionMap);
  });
  
  // Filter divisions based on selection
  const divisionsToShow = selectedDivision === 'all'
    ? ['Playground', '5U', '6U', '7U', '8U', '9U', '10U', '12U', '15U', '19U'] as Division[]
    : [selectedDivision];

  return (
    <div className="card-view-container">
      {seasons.map(season => (
        <div key={season} className="season-section">
          <h2 className="season-title">{season} Season</h2>
          <div className="division-cards">
            {divisionsToShow.map(division => {
              const divData = seasonDivisionMap.get(season)?.get(division);
              const birthYears = divData ? Array.from(divData.years).sort((a, b) => a - b) : [];
              const hasAugustBirths = divData?.hasAugustBirths || false;
              
              if (birthYears.length === 0 && selectedDivision !== 'all') {
                return null;
              }
              
              return (
                <div 
                  key={division} 
                  className={`division-card ${hasAugustBirths ? 'has-august-births' : ''}`}
                  style={{ 
                    backgroundColor: DIVISION_COLORS[division],
                    opacity: birthYears.length === 0 ? 0.5 : 1
                  }}
                >
                  <h3 className="division-name">
                    {division}
                    {hasAugustBirths && <span className="august-indicator" title="Includes Aug-Dec births">⚠️</span>}
                  </h3>
                  {birthYears.length > 0 ? (
                    <>
                      <div className="birth-years">
                        <span className="years-label">Birth Years:</span>
                        <span className="years-range">
                          {birthYears[0]} - {birthYears[birthYears.length - 1]}
                        </span>
                      </div>
                      <div className="date-ranges">
                        <span className="range-note">Includes Jan-Jul & Aug-Dec births</span>
                      </div>
                      <div className="player-count">
                        {birthYears.length} year{birthYears.length !== 1 ? 's' : ''} eligible
                      </div>
                    </>
                  ) : (
                    <div className="no-players">No eligible players</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {selectedDivision !== 'all' && (
        <div className="filter-note">
          Showing only {selectedDivision} division across all seasons
        </div>
      )}
    </div>
  );
};

export default CardView;
