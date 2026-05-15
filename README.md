# AYSO Age Division Chart

A modern, responsive web application for displaying AYSO (American Youth Soccer Organization) age divisions across multiple seasons. This tool helps league administrators, coaches, and parents quickly determine which division players belong to based on their birth dates.

## Features

- **Dynamic Season Display**: View 1-10 seasons at once, starting with the current 2025-26 season
- **Birth Date Ranges**: Displays two ranges per year:
  - **Jan 1 - Jul 31**: Players born before the typical August cutoff
  - **Aug 1 - Dec 31**: Players born after the cutoff (marked with ⚠️ indicator)
- **Dual View Modes**: 
  - **Table View**: Traditional spreadsheet-like display showing birth date ranges and their corresponding divisions
  - **Card View**: Modern card-based layout organized by season
- **Division Filtering**: View all divisions at once or filter to see a specific division
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Special Season Handling**: 
  - 2025-26 season uses January 1 cutoff date
  - Future seasons use standard August 1 cutoff date

## Divisions

The application supports all standard AYSO divisions:
- **Playground** (ages 3-4)
- **5U** through **19U** age groups
- Automatically calculates eligibility including "aging in" and "aging out" scenarios

## Technology Stack

- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development and optimized builds
- **date-fns** for reliable date calculations
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Responsive Design** with mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Git (optional, for cloning)

### Installation

1. Navigate to the project directory:
```bash
cd E:\Claude\ayso-age-chart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Usage

1. **Select Number of Seasons**: Use the dropdown to choose how many seasons to display (1-10)

2. **Filter by Division**: 
   - Select "All Divisions" to see the complete chart
   - Choose a specific division to see only relevant birth years

3. **Switch Views**:
   - **Table View**: Best for seeing trends across years
   - **Card View**: Best for focusing on specific seasons

4. **Understanding the Display**:
   - Birth dates are shown in two ranges per year:
     - **Jan 1 - Jul 31**: Players who typically stay in the same division year-to-year
     - **Aug 1 - Dec 31** (⚠️): Players born after the cutoff who may play in different divisions
   - Each cell/card shows the division assignment
   - Color coding helps quickly identify divisions
   - "Not Eligible" appears for players too old or too young
   - The ⚠️ indicator highlights Aug-Dec birth ranges that cross the AYSO cutoff date

## Project Structure

```
ayso-age-chart/
├── src/
│   ├── components/        # React components
│   │   ├── Controls.tsx   # Filter and view controls
│   │   ├── TableView.tsx  # Table display component
│   │   └── CardView.tsx   # Card display component
│   ├── config/            # Configuration and constants
│   │   └── index.ts       # Division rules and settings
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Shared types
│   ├── utils/             # Utility functions
│   │   └── ageCalculator.ts # Age and division calculations
│   ├── App.tsx            # Main application component
│   ├── App.css            # Application styles
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## Future Enhancements

The application is structured to easily support future features:

1. **Historical Data Analysis**: Import past season data to forecast coach requirements
2. **Player Management**: Add/edit/remove individual players
3. **Export Functionality**: Download charts as PDF or Excel
4. **Team Formation Tools**: Assist with balanced team creation
5. **Registration Integration**: Connect with AYSO registration systems
6. **Multi-Region Support**: Handle different regional rules and cutoff dates

## Development

### Adding New Features

The modular architecture makes it easy to extend:

1. **New Divisions**: Update `DIVISION_RULES` in `src/config/index.ts`
2. **Different Cutoff Dates**: Modify `generateSeasons()` in `src/config/index.ts`
3. **New Views**: Create components in `src/components/` and add to `App.tsx`
4. **Data Persistence**: Add a backend API and update data fetching in `App.tsx`

### Code Style

- TypeScript with strict mode enabled
- Functional React components with hooks
- CSS modules for component styles
- Clear naming conventions and documentation

## Deployment

The application can be deployed to any static hosting service:

- **GitHub Pages**: Free hosting for public repositories
- **Netlify/Vercel**: Automatic deployments from Git
- **AWS S3 + CloudFront**: Scalable enterprise solution
- **Traditional Web Server**: Copy `dist` folder contents after build

## Support

For questions or issues:
1. Check the existing code documentation
2. Review the TypeScript types for API details
3. Test in development mode with React DevTools

## License

This project is created for AYSO age division management. Please ensure compliance with your local AYSO region's policies and procedures.

---

**Note**: This application uses the standard AYSO age determination rules. Always verify with your regional AYSO administration for any local variations or special circumstances.
