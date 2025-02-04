import { FunctionComponent } from "react";
import LoadingDotsContainer from "./styled/LoadingDotsContainer"

interface LoadingDotsProps {
  size?: 'small' | 'medium' | 'large';
  dataTestId?: string;
}

const LoadingDots: FunctionComponent<LoadingDotsProps> = ({dataTestId, size = 'large'}) => {
  return <LoadingDotsContainer size={size} dataTestId={dataTestId}>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </LoadingDotsContainer>;
};

export default LoadingDots;