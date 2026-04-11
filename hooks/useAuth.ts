import { getApiPath } from "@/lib/api";
import {
  AuthLoginRequest,
  AuthLoginResponse,
  AuthMeResponse,
  AuthRegisterRequest,
  AuthRegisterResponse,
} from "@/types/api/auth";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

// Register
const authRegisterFetcher = (
  url: string,
  { arg }: { arg: AuthRegisterRequest },
) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  }).then((res) => res.json() as Promise<AuthRegisterResponse>);
};

export const useAuthRegister = () => {
  return useSWRMutation(getApiPath(`/auth/register`), authRegisterFetcher);
};

// Login
const authLoginFetcher = (url: string, { arg }: { arg: AuthLoginRequest }) => {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  }).then((res) => res.json() as Promise<AuthLoginResponse>);
};

export const useAuthLogin = () => {
  return useSWRMutation(getApiPath(`/auth/login`), authLoginFetcher);
};

// Logout
const authLogoutFetcher = (url: string) => {
  return fetch(url, {
    method: "POST",
  }).then((res) => res.json());
};

export const useAuthLogout = () => {
  return useSWRMutation(getApiPath(`/auth/logout`), authLogoutFetcher);
};

// Me
const authMeFetcher = (url: string) => {
  return fetch(url).then((res) => res.json() as Promise<AuthMeResponse>);
};

export const useAuthMe = () => {
  return useSWR(getApiPath(`/auth/me`), authMeFetcher);
};
