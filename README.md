# weather-widget
Micro frontend to display weather data

## Getting Started

This repo uses pnpm.

Install dependencies with `pnpm i`

Build all projects in repo with `build:all`

The shell app is ultimately the 'hosting' web page that will embed the micro frontend apps.

Start this with `pnpm dev:shell`

The micro frontend projects are:

- **weather-search**: This provides a user the ability to search for a city whose weather they are interested in and save it for the weather display app to display.
  - Start this with `pnpm dev:search`
- **weather-display**: This will display blocks of each city the user has saved that will contain the weather information.
  - Start this with `pnpm dev:display`

**Note** the mirco frontend are managed via federation and they will need to be served via preview, else the shell will not be able to display the apps.
