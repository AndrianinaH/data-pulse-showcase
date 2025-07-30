import { API_BASE_URL } from "@/lib/api";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  return response.json();
};
