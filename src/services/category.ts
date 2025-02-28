import { AxiosResponse } from "axios";
import { requestApi } from "../config/api";
import { ICategory } from "../models";

const getPokemonsByCategory = (type: string): Promise<AxiosResponse<ICategory>> => {
  return requestApi.get(`type/${type}`);
};

export const categoryService = { getPokemonsByCategory };
