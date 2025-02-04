import { Button } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FunctionComponent } from "react";
import LoadingDots from "../LoadingDots/LoadingDots";
import CurrentPageContainer from "./styled/CurrentPageContainer";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  isLoading: boolean;
  isPlaceholderData: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: FunctionComponent<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  hasNextPage,
  isLoading,
  isPlaceholderData, 
  onPageChange 
}) => {
  return (
    <>
      <CurrentPageContainer>Current Page: {currentPage}/{totalPages}</CurrentPageContainer>
      <Button
        sx={{margin: '0 auto'}}
        variant='contained'
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 1}
      >
        <ArrowBackIosIcon/> Previous Page
      </Button>{' '}
      <Button
        sx={{margin: '0 auto'}}
        variant='contained'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={ isPlaceholderData &&  !hasNextPage}
      >
        Next Page <ArrowForwardIosIcon />
      </Button>
      {isLoading ? <LoadingDots/>: null}
    </>
  );
}

export default Pagination;