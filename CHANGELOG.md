# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed
- Fixed "[object Object]" in Key Learning Points on completion screen
  - Root cause: `learning_points` were objects, not strings
  - Now properly formatted as markdown with topic, details, and references
- Fixed "Finish & Return Home" button not working
  - `handleNext()` required `selectedChoice` which doesn't exist on completion screen
  - Now handles completion screen separately
- Fixed fire-001, fire-002, depress-001 end node content
- All 5 scenarios now work end-to-end

## [0.1.0] - 2026-03-20

### Added
- Initial release with 5 training scenarios
- Phone-first responsive design
- Interactive decision-based gameplay
- Immediate feedback on choices (correct/incorrect with explanation)
- Progress tracking stored in localStorage
- Scenario categories: Fire, Depressurisation, Evacuation

### Scenarios
- **fire-001**: Galley Oven Fire (A330, 7 decisions)
- **fire-002**: Lavatory Waste Bin Fire (A330, 8 decisions)
- **depress-001**: Sudden Depressurisation (A330, 7 decisions)
- **evac-001**: Unplanned Land Evacuation (A330, 9 decisions)
- **evac-002**: Ditching/Water Evacuation (A330-200, 11 decisions)

### Technical
- React 18 + Vite build
- Static JSON scenario files (no runtime backend)
- GitHub Pages deployment