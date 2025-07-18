import React from 'react';
import { MovieProvider } from './context/MovieContext';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Results from './components/UI/Results';
import SearchHistory from './components/Search/SearchHistory';
import ErrorBoundary from './components/UI/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MovieProvider>
        <GlobalStyles />
        <div className="container">
          <Header />
          <Search />
          <SearchHistory onSelectHistory={(query) => {}} />
          <Results />
        </div>
      </MovieProvider>
    </ErrorBoundary>
  );
};

export default App;
