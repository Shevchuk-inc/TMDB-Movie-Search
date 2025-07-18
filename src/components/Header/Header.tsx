import React from 'react';
import { HeaderContainer, HeaderTitle, HeaderSubtitle } from '../../styles/StyledComponents';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>TMDB Movie Search</HeaderTitle>
      <HeaderSubtitle>Find your favorite movies with powerful search and autocomplete</HeaderSubtitle>
    </HeaderContainer>
  );
};

export default Header;
