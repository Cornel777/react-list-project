import { TableContainer, Paper, Table, TableHead, TableBody } from "@mui/material";
import { StyledTableRow, StyledTableCell } from "../styled/styledTable";
import Film from "./Film";
import { FunctionComponent } from "react";

interface FilmsTableProps {
  data: {
    films: string[];
  }
}

const FilmsTable: FunctionComponent<FilmsTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper} style={{ maxWidth: '400px' }}>
    <Table size="medium" aria-label="Films table">
     <TableHead>
        <StyledTableRow>
          <StyledTableCell>Film name</StyledTableCell>
           <StyledTableCell>Episode no.</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {data.films.map((filmUrl: string) => {
          return <Film filmUrl={filmUrl} />
        })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default FilmsTable;