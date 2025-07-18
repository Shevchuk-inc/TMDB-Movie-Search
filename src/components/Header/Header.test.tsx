import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders header with title and subtitle', () => {
    render(<Header />);

    const titleElement = screen.getByText(/TMDB Movie Search/i);
    expect(titleElement).toBeInTheDocument();

    const subtitleElement = screen.getByText(/Find your favorite movies with powerful search and autocomplete/i);
    expect(subtitleElement).toBeInTheDocument();
  });
});
