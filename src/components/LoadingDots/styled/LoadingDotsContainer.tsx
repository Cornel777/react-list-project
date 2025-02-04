import styled from "styled-components";

interface LoadingDotsContainerProps {
  size: 'small' | 'medium' | 'large';
  dataTestId?: string;
}

const MAP_SIZE = {
  small: '1rem',
  medium: '2rem',
  large: '3rem'
}

const PADDING = {
  small: 0,
  medium: '10px',
  large: '20px'
}

const LoadingDotsContainer = styled.div.attrs<LoadingDotsContainerProps>(
  (props) => (({
    'data-testid': props.dataTestId || 'loading-dots',
  }) as React.HTMLAttributes<HTMLDivElement>)
)`
  text-align: center;
  padding: ${({ size }) => PADDING[size]};
  font-size: ${({ size }) => MAP_SIZE[size]};
  span {
    animation: dot 1.4s infinite;
    opacity: 0;
  }

  span:nth-child(1) { animation-delay: 0.2s; }
  span:nth-child(2) { animation-delay: 0.4s; }
  span:nth-child(3) { animation-delay: 0.6s; }

  @keyframes dot {
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}
`;

export default LoadingDotsContainer;