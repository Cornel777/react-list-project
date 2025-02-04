import {
  Typography,
  Button,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate, useLocation } from 'react-router'
import LoadingDots from '../LoadingDots/LoadingDots'
import { Character } from '../../types/Character';
import BreakElement from './components/styled/BreakElement';
import NameControlButtonsContainer from './components/styled/NameControlButtonsContainer';
import CharacterDetailsWrapperContainer from './components/styled/CharacterDetailsWrapperContainer';
import { FunctionComponent, useEffect, useRef } from 'react';
import useFavorites from '../hooks/useFavorites';
import FilmsTable from './components/Film/FilmsTable';
import StarshipsTable from './components/Starship/StarshipsTable';
import CharacterDetailsTable from './CharacterDetailsTable';
import useFetchQuery from './hooks/useFetchQuery';

const CharacterDetails: FunctionComponent = () => {
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { page } = location.state || { page: 1 };
  const urlParams = useParams();
  const characterId = urlParams.characterId;

  const { isFavorite, toggleFavorite } = useFavorites();
 
  const { isPending, isError, error, data} = useFetchQuery<Character>('characterDetails', `people/${characterId}/`, characterId);

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

 
  const handleBackNavigation = () => {
    navigate(`/characters`, { 
      state: { page },
      replace: true
    });
  };
  const onKeyDownHandlerNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleBackNavigation();
    }
  };

  const handleToggleFavorite = (favorite: Character) => {
    toggleFavorite(favorite);
  }
  const handleOnKeyUptoggleFavorite = (e: React.KeyboardEvent, favorite: Character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggleFavorite(favorite);
    }
  };

  if (isPending) {
    return <LoadingDots dataTestId="three-loading-dots" />;
  }
  if (isError) {
    return <p>`Failed to load data for character ${error && error.message}`</p>;
  }
  if (!data) {
    return null;
  }

  return (
    <CharacterDetailsWrapperContainer>
      <NameControlButtonsContainer>
        <Button
          aria-label="Go Back"
          data-testId="character-back-button"
          ref={backButtonRef} 
          onClick={handleBackNavigation}
          onKeyDown={(e) => onKeyDownHandlerNavigation(e)}
        >
          <ArrowBackIcon />
        </Button>
        <Typography variant="h3">{data.name}</Typography>
        <Button 
          aria-label="toggle favorites button"
          startIcon={
            <FavoriteIcon 
              color={isFavorite(data) ? 'error' : 'inherit'}
            />
          } 
          onClick={() => handleToggleFavorite(data)}
          onKeyUp={(e) => handleOnKeyUptoggleFavorite(e, data)}
          size='large'
        />
      </NameControlButtonsContainer>
      <CharacterDetailsTable data={data} />
      <BreakElement />
      <Typography variant="h5">Films</Typography>
      <BreakElement/>
      <FilmsTable data={data} />
      <BreakElement />
      <Typography variant="h5">Starships</Typography>
      <BreakElement/>
      <StarshipsTable data={data} />
    </CharacterDetailsWrapperContainer>
  )
}

export default CharacterDetails
