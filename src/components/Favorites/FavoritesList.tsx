import { Typography, TableContainer, Paper, Table, TableHead, TableBody, IconButton, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { FunctionComponent, useState } from "react";
import Homeworld from "../CharacterDetails/components/Homeworld/Homeworld";
import BreakElement from "../CharacterDetails/components/styled/BreakElement";
import { StyledTableRow, StyledTableCell } from "../CharacterList/styled/styledListTable";
import useFavorites from "../hooks/useFavorites";
import { Character } from "../../types/Character";
import EditableCell from "../EditableCell/EditableCell";


const FavoritesList: FunctionComponent = () => {
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  const handleToggleFavorite = ( favorite: Character) => { 
    toggleFavorite(favorite)
  };

  const handleKeyDownToggleFavorite = (e: React.KeyboardEvent, favorite: Character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleToggleFavorite(favorite)
    }
  };

  const handleFocus = (favoriteId: string) => {
    setIsFocused(favoriteId);
    console.log(favoriteId)
  };

  const handleBlur = () => {
    setIsFocused(null);
  };

  const handleEditSave = (favorite: Character, value: string, field: string) => {
    const updatedCharacter = { ...favorite, [field]: value };
    toggleFavorite(favorite);
    toggleFavorite(updatedCharacter);
  };

  return (
      <div>
        <Typography variant="h3">Favorites List</Typography>
        <BreakElement/>
        <TableContainer component={Paper} style={{ maxWidth: '600px' }}>
          <Table size="medium" aria-label="Favorites list table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Height</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Home Planet</StyledTableCell>
                <StyledTableCell>Remove</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {favorites.map((favorite) => {
                const favoriteUrlList = favorite.url.split('/').filter((element: string) => element.length > 0)
                const favoriteId = favoriteUrlList.pop()
                  return (
                      <StyledTableRow 
                        key={favoriteId}
                        onMouseEnter={() => handleFocus(favoriteId!)}
                        onMouseLeave={handleBlur}
                        onFocus={() => handleFocus(favoriteId!)}
                        onBlur={handleBlur}
                        tabIndex={0}
                      >
                        <StyledTableCell>{favorite.name}</StyledTableCell>
                        <EditableCell
                          value={favorite.height}
                          field='height'
                          favorite={favorite}
                          isFocused={isFocused === favoriteId}
                          onSave={handleEditSave}
                        />
                        <StyledTableCell>{favorite.gender}</StyledTableCell>
                        <StyledTableCell><Homeworld homeworldUrl={favorite.homeworld}/></StyledTableCell>
                        <StyledTableCell>
                        <IconButton 
                          aria-label="remove from favorites button"
                          onClick={() => handleToggleFavorite(favorite)}
                          onKeyDown={(e) => handleKeyDownToggleFavorite(e, favorite)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton> 
                        </StyledTableCell>
                      </StyledTableRow>
                  )
              })}
           </TableBody>
          </Table>
       </TableContainer>
       </div>
  )
}

export default FavoritesList;