import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FilmsTable from './FilmsTable';

vi.mock('./Film', () => ({
  __esModule: true,
  default: () => <div data-testid="film">A New Hope Episode 4</div>
}));

const mockData = { data : { films: [ 'https://swapi.dev/api/films/1/' ] } };

describe('FilmsTable component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<FilmsTable data={mockData.data} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders table with films', () => {
    render(<FilmsTable data={mockData.data} />);
    const film = screen.getByTestId('film');
    expect(film).toBeInTheDocument();
    expect(screen.getByText(/Film name/i)).toBeInTheDocument();
    expect(screen.getByText(/Episode no./i)).toBeInTheDocument();

    expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
    expect(screen.getByText(/Episode 4/i)).toBeInTheDocument();
  });

  it('renders correct number of films', () => {
    render(<FilmsTable data={mockData.data} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });

  it('renders empty table when there are no films', () => {
    render(<FilmsTable data={{ films: [] }} />);
    expect(screen.queryByText(/A New Hope/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Episode 4/i)).not.toBeInTheDocument();
  });

  it('maintains table accessibility', () => {
    render(<FilmsTable data={mockData.data} />);
    expect(screen.getByRole('table')).toHaveAttribute(
      'aria-label',
      'Films table'
    );
  });

});