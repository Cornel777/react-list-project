import { describe, expect, it, vi } from "vitest";
import { render} from "@testing-library/react";
import { fireEvent } from '@testing-library/react';
import Pagination from "./Pagination";

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 3,
    hasNextPage: true,
    isLoading: false,
    isPlaceholderData: false,
    onPageChange: vi.fn(),
  };


  it('should render the pagination component', () => {
      const { container } = render(<Pagination {...defaultProps} />);
      expect(container).toMatchSnapshot();
  });

  it('should render the pagination component with the current page', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    expect(getByText('Current Page: 1/3')).toBeInTheDocument();
  });

  it('should render the pagination component with both buttons', () => {
    const { getByText } = render(<Pagination {...defaultProps} />);
    expect(getByText('Previous Page')).toBeInTheDocument();
    expect(getByText('Next Page')).toBeInTheDocument();
  });

  it('disables the previous page button when currentPage is 1', () => {
    const { getByText } = render(<Pagination {...defaultProps} currentPage={1} />);
    expect(getByText('Previous Page')).toBeDisabled();
  });

  it('disables the next page button when isPlaceholderData is true and hasNextPage is false', () => {
    const { getByText } = render(<Pagination {...defaultProps} isPlaceholderData={true} hasNextPage={false} />);
    expect(getByText('Next Page')).toBeDisabled();
  });

  it('calls onPageChange with the previous page number when the previous page button is clicked', () => {
    const {getByText} = render(<Pagination {...defaultProps} currentPage={2} />);
    fireEvent.click(getByText('Previous Page'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });
});