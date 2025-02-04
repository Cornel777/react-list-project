import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditableCell from './EditableCell';
import { Character } from '../../types/Character';


describe('EditableCell', () => {
  const defaultProps = {
    value: '172',
    field: 'height' as const,
    favorite: {
      name: 'Luke',
      height: '172',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '',
      edited: '',
      birth_year: '',
      eye_color: '',
      hair_color: '',
      skin_color: '',
      mass: ''
    } as Character,
    isFocused: false,
    onSave: vi.fn()
  };

  it('matches the snapshot', () => {
    const { container } = render(<EditableCell {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders the initial value', () => {
    render(<EditableCell {...defaultProps} />);
    expect(screen.getByText('172')).toBeInTheDocument();
  });

  it('renders the edit button', () => {
    render(<EditableCell {...defaultProps} isFocused/>);
    expect(screen.getByLabelText('edit height')).toBeInTheDocument();
  });

  it('enters edit mode when the edit button is clicked', () => {
    render(<EditableCell {...defaultProps} isFocused/>);
    fireEvent.click(screen.getByLabelText('edit height'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('saves the edits when the enter key is pressed', () => {
    render(<EditableCell {...defaultProps} isFocused/>);
    fireEvent.click(screen.getByLabelText('edit height'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '180' } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

    expect(defaultProps.onSave).toHaveBeenCalledWith(defaultProps.favorite, '180', 'height');
  });

  it('cancels the edits when the escape key is pressed', () => {
    render(<EditableCell {...defaultProps} isFocused/>);
    fireEvent.click(screen.getByLabelText('edit height'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '180' } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

    expect(screen.getByText('172')).toBeInTheDocument();
  });

});