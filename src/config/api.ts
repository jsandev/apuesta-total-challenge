import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const createAxiosInstance = () => {
  const config: AxiosRequestConfig = {
    baseURL: `https://pokeapi.co/api/v2/`,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const instance = axios.create(config);
  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export const requestApi = createAxiosInstance();
