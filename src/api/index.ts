import axios from "axios";

export const getPagination = (
  page?: string,
  limit: number | undefined = 10,
  offset: number = 0
) => {
  const defaultUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  return axios.get(page || defaultUrl);
};

export const getPokemon = (url: string) => {
  return axios.get(url);
};

export const getTypes = () => {
  return axios.get("https://pokeapi.co/api/v2/type");
};
