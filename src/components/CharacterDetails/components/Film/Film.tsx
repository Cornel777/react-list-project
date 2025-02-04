import { FunctionComponent } from "react"
import LoadingDots from "../../../LoadingDots/LoadingDots"
import { type Film } from "../../../../types/Film"
import { StyledTableCell, StyledTableRow } from "../styled/styledTable"
import useFetchQuery from "../../hooks/useFetchQuery"

interface FilmProps {
  filmUrl: string
}

const Film: FunctionComponent<FilmProps> = ({filmUrl}) => {

  const filmUrlList = filmUrl.split('/').filter((element: string) => element.length > 0);
  const filmId = filmUrlList.pop();

  const { isPending, isError, error, data} = useFetchQuery<Film>('film', `films/${filmId}/`, filmId)

  if (isPending) {
    return <LoadingDots />
  }
  if (isError) {
    return <p>{`Failed to load films ${error && error.message}`}</p>
  }
  if (!data) {
    return null;
  }

  return (
    <StyledTableRow key={filmId}>
      <StyledTableCell> {data.title}</StyledTableCell>
      <StyledTableCell>Episode {data.episode_id}</StyledTableCell>
    </StyledTableRow>
  )
}

export default Film;