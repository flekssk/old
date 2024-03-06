import { ENV } from "@/env";
import axios from "axios";

export const api = axios.create({
  baseURL: ENV.API_URL,
});

export const setToken = (token: string | null) => {
  api.defaults.headers.common["X-AUTH-TOKEN"] = token ? `${token}` : undefined;
};
