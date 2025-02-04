import { TableContainer, Paper, Table, TableHead, TableBody } from "@mui/material";
import { FunctionComponent } from "react";
import { Character } from "../../types/Character";
import Homeworld from "../CharacterDetails/components/Homeworld/Homeworld";
import { StyledTableRow, StyledTableCell } from "./styled/styledListTable";
import getIdFromUrl from "./utils/getIdFromUrl";

interface CharactersListTableProps {
  characters: Character[];
  onCharacterNavigation: (id: string) => void;
  onKeyDownNavigation: (e: React.KeyboardEvent, id: string) => void;
}

const CharactersListTable: FunctionComponent<CharactersListTableProps> = ({ 
  characters,
  onCharacterNavigation,
  onKeyDownNavigation
}) => {

  return (
    <TableContainer component={Paper} style={{ maxWidth: '500px' }}>
          <Table size="medium" aria-label="Characters list table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Home Planet</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {characters.map((character) => {
                const characterId = getIdFromUrl(character.url)
                  return (
                      <StyledTableRow 
                        key={characterId} 
                        tabIndex={0} 
                        onClick={() => onCharacterNavigation(characterId!)}
                        onKeyDown={(e) => onKeyDownNavigation(e, characterId!)}
                      >
                        <StyledTableCell>{characterId}</StyledTableCell>
                        <StyledTableCell>{character.name}</StyledTableCell>
                        <StyledTableCell>{character.gender}</StyledTableCell>
                        <StyledTableCell><Homeworld homeworldUrl={character.homeworld}/></StyledTableCell>
                      </StyledTableRow>
                  )
              })}
           </TableBody>
          </Table>
       </TableContainer>
  )
}

export default CharactersListTable;