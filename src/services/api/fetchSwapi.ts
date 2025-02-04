import axios from "axios";

const fetchSwapi = async (path: string) => {
  const baseUrl = "https://swapi.dev/api/";
  const fetchUrl = baseUrl + path;
  
  const response = await axios.get(fetchUrl);
  return response.data;
};

export default fetchSwapi;