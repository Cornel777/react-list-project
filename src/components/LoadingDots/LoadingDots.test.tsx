import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import LoadingDots from './LoadingDots';

describe('LoadingDots', () => {
  const renderLoadingDots = (props = {}) => {
    return render(
        <LoadingDots {...props} />
    );
  };

  it('renders loading dots', () => {
    const { container } = renderLoadingDots();
    const dots = container.querySelectorAll('span');
    expect(dots).toHaveLength(3);
  });

  it('renders with default large size', () => {
    const { container } = renderLoadingDots();
    expect(container.firstChild).toHaveStyle('font-size: 3rem');
  });

  it('renders with small size when specified', () => {
    const { container } = renderLoadingDots({ size: 'small' });
    expect(container.firstChild).toHaveStyle('font-size: 1rem');
  });

  it('matches snapshot', () => {
    const { container } = renderLoadingDots();
    expect(container).toMatchSnapshot();
  });
});