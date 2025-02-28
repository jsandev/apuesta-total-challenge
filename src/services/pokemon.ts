import { AxiosResponse } from "axios";
import { requestApi } from "../config/api";
import { IPaginationPokemon, IPokemonDetail } from "../models";

const getDetail = (id: string): Promise<AxiosResponse<IPokemonDetail>> => {
  return requestApi.get(id);
};

const searchByName = (name: string): Promise<AxiosResponse<IPokemonDetail>> => {
  return requestApi.get(`pokemon/${name}`);
};

const filter = ({
  limit = 30,
  offset = 0,
}: {
  limit: number;
  offset: number;
}): Promise<AxiosResponse<IPaginationPokemon>> => {
  return requestApi.get("pokemon", { params: { limit, offset } });
};

export const pokemonService = { getDetail, searchByName, filter };
