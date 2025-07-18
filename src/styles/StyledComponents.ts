import styled, { keyframes } from 'styled-components';

export const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const HeaderTitle = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeaderSubtitle = styled.p`
  color: rgba(255,255,255,0.9);
  font-size: 1.2rem;
`;

export const SearchSection = styled.section`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  z-index: 10000;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #e1e5e9;
  border-radius: 15px;
  outline: none;
  transition: all 0.3s ease;
  background: white;
  position: relative;
  z-index: 10001;

  &:focus {
    border-color: #764ba2;
    box-shadow: 0 0 0 3px rgba(118, 75, 162, 0.2);
  }
`;

export const AutocompleteDropdown = styled.div<{ visible: boolean; ref?: any }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10002;
  margin-top: 0.5rem;
  display: ${props => props.visible ? 'block' : 'none'};
  border: 1px solid rgba(118, 75, 162, 0.2);
`;

export const AutocompleteItem = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: #f8f9fe;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const AutocompletePoster = styled.div<{ imageUrl?: string }>`
  width: 40px;
  height: 60px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl}) no-repeat center/cover` : '#e1e5e9'};
  border-radius: 5px;
  flex-shrink: 0;
`;

export const AutocompleteInfo = styled.div`
  h4 {
    color: #333;
    margin-bottom: 0.25rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

export const AdvancedFilters = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e5e9;
`;

export const FiltersToggle = styled.button`
  background: none;
  border: none;
  color: #764ba2;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #5a3a7a;
  }
`;

export const FiltersContent = styled.div<{ visible: boolean }>`
  display: ${props => props.visible ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterLabel = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

export const FilterInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #764ba2;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #764ba2;
  }
`;

export const CheckboxField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #764ba2;
  }

  label {
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
  }
`;

export const ResultsSection = styled.section`
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  z-index: 50;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const ResultsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
`;

export const ResultsCount = styled.span`
  color: #764ba2;
  font-weight: 500;
`;

export const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

export const MovieCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(118, 75, 162, 0.2);
  }
`;

export const MoviePoster = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 400px;
  background: ${props => props.imageUrl 
    ? `url(${props.imageUrl}) no-repeat center/cover` 
    : 'linear-gradient(135deg, #e1e5e9, #f0f0f0)'};
  position: relative;
  overflow: hidden;

  &::before {
    content: ${props => props.imageUrl ? '""' : '"🎬"'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    opacity: 0.3;
    display: ${props => props.imageUrl ? 'none' : 'block'};
  }
`;

export const MovieRating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(118, 75, 162, 0.9);
  color: white;
  padding: 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
`;

export const MovieInfo = styled.div`
  padding: 1.5rem;
`;

export const MovieTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

export const MovieYear = styled.div`
  color: #764ba2;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export const MovieOverview = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const MovieGenres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const GenreTag = styled.span`
  background: rgba(118, 75, 162, 0.1);
  color: #764ba2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const progressMove = keyframes`
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
`;

export const ProgressBar = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
  display: ${props => props.visible ? 'block' : 'none'};
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  animation: ${progressMove} 2s ease-in-out infinite;
  width: 0%;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Loading = styled.div<{ visible: boolean }>`
  text-align: center;
  padding: 3rem;
  color: #666;
  display: ${props => props.visible ? 'block' : 'none'};
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #764ba2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 1rem;
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const SkeletonGrid = styled.div<{ visible: boolean }>`
  display: ${props => props.visible ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

export const SkeletonCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

export const SkeletonPoster = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

export const SkeletonInfo = styled.div`
  padding: 1.5rem;
`;

export const SkeletonLine = styled.div<{ width?: string; height?: string }>`
  height: ${props => props.height || '20px'};
  width: ${props => props.width || '100%'};
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

export const EmptyState = styled.div<{ visible: boolean }>`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  display: ${props => props.visible ? 'block' : 'none'};

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

export const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? '#764ba2' : '#e1e5e9'};
  background: ${props => props.active ? '#764ba2' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? '#764ba2' : '#f8f9fe'};
    border-color: #764ba2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #e1e5e9;
    background: #f0f0f0;
  }
`;

export const ModalOverlay = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${props => props.visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 20000;
  padding: 1rem;
  overflow-y: auto;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  margin: auto;
  transform: translateY(0);
  animation: modalFadeIn 0.3s ease;

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: white;
  }
`;

export const MovieDetailBackdrop = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 300px;
  background: ${props => props.imageUrl 
    ? `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${props.imageUrl}) no-repeat center/cover` 
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  position: relative;
`;

export const MovieDetailContent = styled.div`
  padding: 2rem;
  position: relative;
  margin-top: -80px;
`;

export const MovieDetailPoster = styled.div<{ imageUrl?: string }>`
  width: 160px;
  height: 240px;
  border-radius: 10px;
  background: ${props => props.imageUrl 
    ? `url(${props.imageUrl}) no-repeat center/cover` 
    : 'linear-gradient(135deg, #e1e5e9, #f0f0f0)'};
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  float: left;
  margin-right: 2rem;
  margin-bottom: 1rem;
`;

export const MovieDetailTitle = styled.h2`
  color: rgba(118, 75, 162);
  font-size: 2rem;
  margin-bottom: 0.5rem;
    box-shadow: #282c34;
`;

export const MovieDetailMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #666;
`;

export const MovieDetailDescription = styled.p`
  line-height: 1.7;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 2rem;
`;

export const SearchHistoryContainer = styled.div`
  margin-top: 2rem;
`;

export const SearchHistoryTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
`;

export const SearchHistoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SearchHistoryItem = styled.button`
  background: rgba(118, 75, 162, 0.2);
  color: #fff;
  border: 1px solid rgba(118, 75, 162, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
      color: #eee;
    background: rgba(118, 75, 162, 0.3);
    border-color: rgba(118, 75, 162, 0.5);
  }
`;

export const ClearHistoryButton = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 0.9rem;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
    margin-bottom: 1rem;

  &:hover {
    color: #333;
  }
`;
