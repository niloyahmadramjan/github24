/**
 * hooks/useGithub.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Hook for GitHub App connection via GET /github/connect
 * Returns the install URL from backend then redirects the user.
 * Requires an active session (better-auth.session_token cookie).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import axios from "axios";
import { useState, useCallback } from "react";

/* ──────────────────────────────────────────────────────────
   TYPES
────────────────────────────────────────────────────────── */
export interface GithubConnectResponse {
  data: string; // GitHub App install URL
}

export type GithubConnectResult =
  | { success: true;  url: string }
  | { success: false; error: string };

/* ──────────────────────────────────────────────────────────
   AXIOS INSTANCE (reuses same base config as useAuth)
────────────────────────────────────────────────────────── */
const api = axios.create({
  baseURL:         process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1",
  withCredentials: true, // sends better-auth.session_token automatically
  timeout:         15_000,
});

/* ──────────────────────────────────────────────────────────
   STANDALONE FUNCTION
   Can be called outside the hook if needed.
────────────────────────────────────────────────────────── */
export async function getGithubConnectUrl(): Promise<GithubConnectResult> {
  try {
    const res = await api.post<GithubConnectResponse>("/github/connect");
    const url = res.data.data;

    if (!url) {
      return { success: false, error: "No install URL returned from server." };
    }

    return { success: true, url };
  } catch (err: unknown) {
    const message =
      axios.isAxiosError(err)
        ? err.response?.data?.message ?? err.message
        : "Failed to get GitHub install URL.";
    return { success: false, error: message };
  }
}

/* ──────────────────────────────────────────────────────────
   HOOK
────────────────────────────────────────────────────────── */
interface UseGithubReturn {
  /** Call this to fetch the install URL and redirect */
  connectGithub: () => Promise<void>;
  /** True while fetching the URL */
  connecting: boolean;
  /** Error message if the call failed */
  error: string | null;
}

export function useGithub(): UseGithubReturn {
  const [connecting, setConnecting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const connectGithub = useCallback(async () => {
    setConnecting(true);
    setError(null);

    const result = await getGithubConnectUrl();

    if (result.success) {
      // Hard redirect to GitHub App install page
      window.location.href = result.url;
      // Note: setConnecting(false) not needed — page navigates away
    } else {
      setError(result.error);
      setConnecting(false);
    }
  }, []);

  return { connectGithub, connecting, error };
}

export default useGithub;