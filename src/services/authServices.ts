// src/services/authService.ts
import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async ({ username, password }: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post("https://fakestoreapi.com/auth/login", {
    username:username,
    password:password
  });

  // Return only the token, keep component clean
  return response.data;
};