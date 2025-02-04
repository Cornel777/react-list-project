import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import '@testing-library/jest-dom';

describe('Header component', () => {
    it('should match the snapshot', () => {
        const { asFragment } = render(
          <Header>
            <nav>Test Content</nav>
          </Header>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render the Star Wars logo', () => {
        const { getByAltText } = render(
          <Header>
            <nav>Test Content</nav>
          </Header>
        );
        const logo = getByAltText('Star Wars Logo');
        expect(logo).toBeInTheDocument();
    });
});