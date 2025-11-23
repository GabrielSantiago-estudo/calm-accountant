import { API_URL } from "./config";

export async function apiRequest<T>(
  endpoint: string,
  method: string = "GET",
  data: any = null,
  token: string | null = null
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options: RequestInit = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Erro na requisição");
  }

  return response.json() as Promise<T>;
}
