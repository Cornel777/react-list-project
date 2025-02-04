import { TextField, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import LoadingDots from '../LoadingDots/LoadingDots'
import { FunctionComponent, useEffect, useState } from 'react'
import {type CharacterList } from '../../types/CharacterList'
import BreakElement from '../CharacterDetails/components/styled/BreakElement'
import useSearchAllPages from '../hooks/useSearchAllPages';
import Pagination from '../Pagination/Pagination'
import CharactersListTable from './CharactersListTable'
import useFetchPages from './hooks/useFetchPages'
import usePrefetchNextPage from './hooks/usePrefetchNextPage'

const CharacterList: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, isFetching, isPending, isError, error, isPlaceholderData } = useFetchPages(page);
  usePrefetchNextPage(data, isPlaceholderData, page);
  const { resultCharacters, setSearchTerm: setDebouncedSearch} = useSearchAllPages(searchTerm);

  useEffect(() => {
    if (data) {
      setTotalPageCount(Math.ceil(data.count / 10));
    }
  }, [data])


  
  useEffect(() => {
    if (location.state?.page) {
      setPage(location.state.page);
    }
  }, [location]);


  const handleListElementNavigation = ( characterId: string) => { 
    navigate(`/characters/${characterId}`, 
      { state: { page } }
    )
  };

  const handleKeyDown = (e: React.KeyboardEvent, characterId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleListElementNavigation(characterId)
    }
  };
  
  if (isPending) {
    return <LoadingDots/>
 }
 if (isError) {
   return <p>`Failed to load data ${error && error.message}`</p>
 }
 if (!data) {
   return null;
 }

  return (
      <>
        <Typography variant="h3">Character List</Typography>
        <BreakElement/>
        <TextField 
          data-testid="character-list-search-input"
          id="outlined-basic"
          label="Search character name"
          variant="outlined" margin='normal' 
          fullWidth
          value={searchTerm}
          onChange={(e) => {
              setSearchTerm(e.target.value)
              setDebouncedSearch(e.target.value)
            } 
          }
        />
        { resultCharacters?.length ? 
          <CharactersListTable 
            characters={resultCharacters}
            onCharacterNavigation={handleListElementNavigation}
            onKeyDownNavigation={handleKeyDown}
        /> : 
        <>
          <CharactersListTable 
            characters={data.results}
            onCharacterNavigation={handleListElementNavigation}
            onKeyDownNavigation={handleKeyDown}
          />
          <BreakElement/>
          <Pagination
            currentPage={page}
            totalPages={totalPageCount}
            hasNextPage={data.next !== null}
            isLoading={isFetching}
            isPlaceholderData={isPlaceholderData}
            onPageChange={setPage}
          />
       </>
        }
      </>
  )
}

export default CharacterList;
