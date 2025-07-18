import React from 'react';
import { useMovieContext } from '../../context/MovieContext';
import {
  SearchHistoryContainer,
  SearchHistoryTitle,
  SearchHistoryList,
  SearchHistoryItem,
  ClearHistoryButton
} from '../../styles/StyledComponents';

interface SearchHistoryProps {
  onSelectHistory: (query: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelectHistory }) => {
  const { searchHistory, clearSearchHistory } = useMovieContext();

  if (searchHistory.length === 0) {
    return null;
  }

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SearchHistoryContainer>
      <SearchHistoryTitle>Recent Searches</SearchHistoryTitle>
      <SearchHistoryList>
        {searchHistory.map((item) => (
          <SearchHistoryItem
            key={item.id}
            onClick={() => onSelectHistory(item.query)}
            title={`Searched on ${formatDate(item.timestamp)}`}
          >
            {item.query}
          </SearchHistoryItem>
        ))}
      </SearchHistoryList>
      <ClearHistoryButton onClick={clearSearchHistory}>
        Clear search history
      </ClearHistoryButton>
    </SearchHistoryContainer>
  );
};

export default SearchHistory;
