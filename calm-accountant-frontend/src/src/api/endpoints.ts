import { API_URL } from "./config";

export const ENDPOINTS = {
  LOGIN: `${API_URL}/auth/login`,
  REGISTER: `${API_URL}/auth/register`,
  CLIENTS: `${API_URL}/clients`,
  PSYCHOLOGISTS: `${API_URL}/psychologists`,
  SESSIONS: `${API_URL}/sessions`,
  TRANSACTIONS: `${API_URL}/transactions`,
};
