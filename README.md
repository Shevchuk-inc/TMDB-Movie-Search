# TMDB Movie Search Application

A modern React application for searching and exploring movies using the TMDB (The Movie Database) API. This project showcases a fully functional movie search interface with advanced features like autocomplete suggestions, filters, pagination, and more.

![TMDB Movie Search App](https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png)

## Features

- **Movie Search**: Search for movies by title with real-time results
- **Autocomplete Suggestions**: Get instant movie suggestions as you type
- **Advanced Filters**: Filter movies by language, year, region, page, and adult content
- **Responsive Design**: Fully responsive layout that works on all devices
- **Loading States**: Visual feedback with progress bar, skeleton loading, and spinner
- **Error Handling**: Graceful error handling with user-friendly messages
- **Movie Details**: View detailed information about each movie
- **Search History**: Track and revisit your previous searches
- **Pagination**: Navigate through multiple pages of search results

## Technical Implementation

- Built with **React** and **TypeScript**
- State management with **React Context API**
- Styling with **Styled Components**
- API integration with **Axios**
- Error boundaries for graceful error handling
- Unit testing with **Jest** and **React Testing Library**

## Project Structure

```
src/
├── api/
│   └── tmdbApi.ts        # API service for TMDB endpoints
├── components/
│   ├── Filters/          # Advanced filters components
│   ├── Header/           # App header components
│   ├── MovieCard/        # Movie card and detail components
│   ├── Search/           # Search input and history components
│   └── UI/               # Shared UI components (Results, ErrorBoundary)
├── context/
│   └── MovieContext.tsx  # Global state management
├── styles/
│   ├── GlobalStyles.ts   # Global styles
│   └── StyledComponents.ts # Reusable styled components
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Main application component
└── index.tsx             # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/tmdb-movie-app.git
   cd tmdb-movie-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your TMDB API key:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   REACT_APP_TMDB_ACCESS_TOKEN=your_access_token_here
   ```

4. Start the development server:
   ```
   npm start
   ```

### Running Tests

```
npm test
```

## Architecture Decisions

- **Styled Components**: Used for component-scoped styling and theme consistency
- **Context API**: Implemented for global state management instead of Redux for simplicity
- **TypeScript**: Added for type safety and better developer experience
- **Modular Components**: Built with reusability and maintainability in mind
- **Error Boundaries**: Implemented to prevent the entire app from crashing
- **Debounced Search**: Optimized API calls during user typing
- **Local Storage**: Used for persisting search history

## Future Enhancements

- Add user authentication for personalized experiences
- Implement watchlist functionality
- Add more detailed movie information and reviews
- Implement movie recommendations
- Add dark/light theme toggle

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing the movie data
- [Create React App](https://github.com/facebook/create-react-app) for the project setup
