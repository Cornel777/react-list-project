import { TableContainer, Paper, Table, TableHead, TableBody } from "@mui/material";
import { FunctionComponent } from "react";
import { StyledTableRow, StyledTableCell } from "../styled/styledTable";
import Starship from "./Starship";

interface StarshipsTableProps {
  data: {
    starships: string[];
  }
}

const StarshipsTable: FunctionComponent<StarshipsTableProps> = ({ data }) => {

  if (!data.starships.length) {
    return <p>No starships flown</p>
  }

  return (
    <TableContainer component={Paper} style={{ maxWidth: '400px' }}>
        <Table size="medium" aria-label="Starships table">
         <TableHead>
            <StyledTableRow>
              <StyledTableCell>Starship name</StyledTableCell>
               <StyledTableCell>Model</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.starships.map((starshipUrl: string) => {
              return <Starship starshipUrl={starshipUrl} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
  )
}

export default StarshipsTable;