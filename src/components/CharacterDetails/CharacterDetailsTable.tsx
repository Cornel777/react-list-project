import { TableContainer, Paper, Table, TableHead, TableBody } from "@mui/material";
import Homeworld from "./components/Homeworld/Homeworld";
import { StyledTableRow, StyledTableCell } from "./components/styled/styledTable";
import { FunctionComponent } from "react";
import { Character } from "../../types/Character";

export interface CharacterDetailsTableProps {
  data: Character
}

const CharacterDetailsTable: FunctionComponent<CharacterDetailsTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper} style={{ maxWidth: '400px' }}>
        <Table size="medium" aria-label="Character traits table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Character trait</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>Hair colour</StyledTableCell>
              <StyledTableCell>{data.hair_color}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Eye colour</StyledTableCell>
              <StyledTableCell>{data.eye_color}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>{data.gender}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>Homeworld</StyledTableCell>
              <StyledTableCell>
                <Homeworld homeworldUrl={data.homeworld} />
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default CharacterDetailsTable;