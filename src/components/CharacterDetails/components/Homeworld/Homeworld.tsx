import { FunctionComponent } from "react"
import useFetchQuery from "../../hooks/useFetchQuery"
import { type Homeworld } from "../../../../types/Homeworld"

interface HomeworldProps {
  homeworldUrl: string
}

const Homeworld: FunctionComponent<HomeworldProps> = ({homeworldUrl}) => {

  const homeworldUrlList = homeworldUrl.split('/').filter((element: string) => element.length > 0)
  const homeworldId = homeworldUrlList.pop()

  const {isPending, isError, error, data} = useFetchQuery<Homeworld>('homeworld', `planets/${homeworldId}/`, homeworldId)

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <p>{`Failed to load homeworld ${error && error.message}`}</p>;
  }
  if (!data) {
    return null;
  }

  return data.name
}

export default Homeworld;