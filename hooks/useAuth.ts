/**
 * hooks/useAuth.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Axios-based auth hook covering every endpoint in the Auth API spec.
 * Session cookie: better-auth.session_token (sent automatically via withCredentials)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { useCallback, useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────
   TYPES
────────────────────────────────────────────────────────── */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: AuthUser;
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface ResendVerifyEmailPayload {
  email: string;
  password: string;
}

export interface RequestPasswordResetPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

export type AuthResult<T> =
  | { success: true; data: T }
  | { success: false; error: AuthError };

/* ──────────────────────────────────────────────────────────
   AXIOS INSTANCE
────────────────────────────────────────────────────────── */

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1",
  withCredentials: true, // sends better-auth.session_token cookie automatically
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

/* Request interceptor — attach any extra headers if needed */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

/* Response interceptor — normalise errors */
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string; error?: string; code?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      "Something went wrong";

    return Promise.reject({
      message,
      code: error.response?.data?.code,
      status: error.response?.status,
    } satisfies AuthError);
  },
);

/* ──────────────────────────────────────────────────────────
   HELPER — wrap every call for consistent result shape
────────────────────────────────────────────────────────── */
async function safeCall<T>(fn: () => Promise<T>): Promise<AuthResult<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err as AuthError };
  }
}

/* ──────────────────────────────────────────────────────────
   AUTH API FUNCTIONS (standalone, usable outside hook)
────────────────────────────────────────────────────────── */

/** POST /sign-up/email */
export async function signUp(
  payload: SignUpPayload,
): Promise<AuthResult<{ user: AuthUser }>> {
  return safeCall(async () => {
    const res = await api.post<{ user: AuthUser }>("/auth/sign-up/email", payload);
    return res.data;
  });
}

/** POST /sign-in/email  — sets session cookie */
export async function signIn(
  payload: SignInPayload,
): Promise<AuthResult<AuthSession>> {
  return safeCall(async () => {
    const res = await api.post<AuthSession>("/auth/sign-in/email", payload);
    return res.data;
  });
}

/** GET /verify-email?token=... — sets session cookie */
export async function verifyEmail(
  token: string,
): Promise<AuthResult<{ message: string }>> {
  return safeCall(async () => {
    const res = await api.get<{ message: string }>("/auth/verify-email", {
      params: { token },
    });
    return res.data;
  });
}

/** POST /resend-verify-email */
export async function resendVerifyEmail(
  payload: ResendVerifyEmailPayload,
): Promise<AuthResult<{ message: string }>> {
  return safeCall(async () => {
    const res = await api.post<{ message: string }>(
      "/auth/resend-verify-email",
      payload,
    );
    return res.data;
  });
}

/** POST /sign-out  — requires session */
export async function signOut(): Promise<AuthResult<{ message: string }>> {
  return safeCall(async () => {
    const res = await api.post<{ message: string }>("/auth/sign-out");
    return res.data;
  });
}

/** POST /request-password-reset */
export async function requestPasswordReset(
  payload: RequestPasswordResetPayload,
): Promise<AuthResult<{ message: string }>> {
  return safeCall(async () => {
    const res = await api.post<{ message: string }>(
      "/auth/request-password-reset",
      payload,
    );
    return res.data;
  });
}

/** POST /reset-password/:token */
export async function resetPassword(
  token: string,
  payload: ResetPasswordPayload,
): Promise<AuthResult<{ message: string }>> {
  return safeCall(async () => {
    const res = await api.post<{ message: string }>(
      `/auth/reset-password/${token}`,
      payload,
    );
    return res.data;
  });
}

/** POST /change-password  — requires session */
export async function changePassword(
  payload: ChangePasswordPayload,
): Promise<AuthResult<{ message: string }>> {
  return safeCall(async () => {
    const res = await api.post<{ message: string }>(
      "/auth/change-password",
      payload,
    );
    return res.data;
  });
}

/** GET /get-session  — requires session */
export async function getSession(): Promise<AuthResult<AuthSession>> {
  return safeCall(async () => {
    const res = await api.get<AuthSession>("/auth/get-session");
    return res.data;
  });
}

/* ──────────────────────────────────────────────────────────
   REACT HOOK
────────────────────────────────────────────────────────── */

interface UseAuthReturn {
  /** Currently authenticated user, null if not logged in, undefined while loading */
  user: AuthUser | null | undefined;
  loading: boolean;
  /** Refresh session from server */
  refreshSession: () => Promise<void>;
  signUp: (payload: SignUpPayload) => Promise<AuthResult<{ user: AuthUser }>>;
  signIn: (payload: SignInPayload) => Promise<AuthResult<AuthSession>>;
  signOut: () => Promise<AuthResult<{ message: string }>>;
  verifyEmail: (token: string) => Promise<AuthResult<{ message: string }>>;
  resendVerifyEmail: (
    payload: ResendVerifyEmailPayload,
  ) => Promise<AuthResult<{ message: string }>>;
  requestPasswordReset: (
    payload: RequestPasswordResetPayload,
  ) => Promise<AuthResult<{ message: string }>>;
  resetPassword: (
    token: string,
    payload: ResetPasswordPayload,
  ) => Promise<AuthResult<{ message: string }>>;
  changePassword: (
    payload: ChangePasswordPayload,
  ) => Promise<AuthResult<{ message: string }>>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    const result = await getSession();
    setUser(result.success ? result.data.user : null);
    setLoading(false);
  }, []);

  /* Fetch session on mount */
  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  /* Wrap signIn to also update local user state */
  const wrappedSignIn = useCallback(
    async (payload: SignInPayload): Promise<AuthResult<AuthSession>> => {
      const result = await signIn(payload);
      if (result.success) setUser(result.data.user);
      return result;
    },
    [],
  );

  /* Wrap signOut to also clear local user state */
  const wrappedSignOut = useCallback(async (): Promise<
    AuthResult<{ message: string }>
  > => {
    const result = await signOut();
    if (result.success) setUser(null);
    return result;
  }, []);

  return {
    user,
    loading,
    refreshSession,
    signUp,
    signIn: wrappedSignIn,
    signOut: wrappedSignOut,
    verifyEmail,
    resendVerifyEmail,
    requestPasswordReset,
    resetPassword,
    changePassword,
  };
}

export default useAuth;