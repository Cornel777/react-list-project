import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarshipsTable from './StarshipsTable';

vi.mock('./Starship', () => ({
  __esModule: true,
  default: () => <div data-testid="starship">
    X-wing T-65 X-wing
  </div>
}));

const mockStarships = [
  'https://swapi.dev/api/starships/12/',
  'https://swapi.dev/api/starships/2/'
];

const mockData = { data: { starships: mockStarships }};

describe('StarshipsTable component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<StarshipsTable data={mockData.data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with starships', () => {
    render(<StarshipsTable data={{ starships: ['https://swapi.dev/api/starships/12/'] }} />);
    const starship = screen.getByTestId('starship');
    expect(starship).toBeInTheDocument();
    expect(screen.getByText(/Starship name/i)).toBeInTheDocument();
    expect(screen.getByText(/Model/i)).toBeInTheDocument();

    expect(screen.getByText(/X-wing/i)).toBeInTheDocument();
    expect(screen.getByText(/T-65 X-wing/i)).toBeInTheDocument();
  });

  it('renders no starships flown message', () => {
    render(<StarshipsTable data={{ starships: [] }} />);
    expect(screen.queryByText('X-wing')).not.toBeInTheDocument();
    expect(screen.getByText(/No starships flown/i)).toBeInTheDocument();
  });

  it('maintains table accessibility', () => {
    render(<StarshipsTable data={mockData.data} />);
    expect(screen.getByRole('table')).toHaveAttribute(
      'aria-label',
      'Starships table'
    );
  });
});