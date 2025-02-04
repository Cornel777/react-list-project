import { FunctionComponent } from "react";
import { StyledTableRow, StyledTableCell } from "../styled/styledTable";
import { type Starship } from "../../../../types/Starship";
import useFetchQuery from "../../hooks/useFetchQuery";


interface StarshipProps {
  starshipUrl: string;
}

const Starship: FunctionComponent<StarshipProps> = ({ starshipUrl }) => {
  const starshipUrlList = starshipUrl.split('/').filter((element: string) => element.length > 0);
  const starshipId = starshipUrlList.pop();

  const { isPending, isError, error, data} = useFetchQuery<Starship>('starship', `starships/${starshipId}/`, starshipId);

  if (isPending) {
    return <p>Loading...</p>
  }
  if (isError) {
    return <p>{`Failed to load starship ${error && error.message}`}</p>
  }
  if (!data) {
    return null;
  }

  return (
    <StyledTableRow key={starshipId}>
      <StyledTableCell>{data.name }</StyledTableCell>
      <StyledTableCell>{data.model}</StyledTableCell>
    </StyledTableRow>
  )
}

export default Starship;