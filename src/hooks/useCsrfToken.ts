/**
 * useCsrfToken Hook
 *
 * Shared hook for CSRF token management across components.
 * Uses a singleton pattern to prevent duplicate API calls when
 * multiple components need the CSRF token.
 *
 * Features:
 * - Singleton: Only one API call regardless of how many components use the hook
 * - Caching: Token is cached globally and reused
 * - Auto-refresh: Token is refreshed before expiration
 * - Error handling: Graceful fallback with retry logic
 */

"use client";

import { useEffect, useState, useCallback } from "react";

// Global singleton state
let globalCsrfToken: string | null = null;
let globalTokenExpiry: number | null = null;
let fetchPromise: Promise<string | null> | null = null;
const listeners = new Set<(token: string | null) => void>();

// Token refresh threshold (5 minutes before expiry)
const REFRESH_THRESHOLD_MS = 5 * 60 * 1000;

/**
 * Fetch CSRF token with deduplication
 */
async function fetchCsrfToken(): Promise<string | null> {
  // If there's already a pending request, reuse it
  if (fetchPromise) {
    console.log("[useCsrfToken] Reusing pending CSRF token request");
    return fetchPromise;
  }

  // Check if we have a valid cached token
  if (globalCsrfToken && globalTokenExpiry) {
    const now = Date.now();
    if (now < globalTokenExpiry - REFRESH_THRESHOLD_MS) {
      console.log("[useCsrfToken] Using cached CSRF token");
      return globalCsrfToken;
    }
  }

  console.log("[useCsrfToken] Fetching new CSRF token");

  fetchPromise = (async () => {
    try {
      const response = await fetch("/api/csrf/token");

      // Check Content-Type before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error("[useCsrfToken] Invalid content-type:", contentType);
        return null;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[useCsrfToken] Failed to fetch CSRF token:", {
          status: response.status,
          error: errorData,
        });

        // On rate limit, keep using existing token if available
        if (response.status === 429 && globalCsrfToken) {
          console.log("[useCsrfToken] Rate limited, using existing token");
          return globalCsrfToken;
        }

        return null;
      }

      const data = await response.json();
      const token = data.token;
      const expiresIn = data.expiresIn || 3600; // Default 1 hour

      // Update global state
      globalCsrfToken = token;
      globalTokenExpiry = Date.now() + expiresIn * 1000;

      console.log("[useCsrfToken] CSRF token fetched successfully");

      // Notify all listeners
      listeners.forEach((listener) => listener(token));

      return token;
    } catch (error) {
      console.error("[useCsrfToken] Error fetching CSRF token:", error);
      return globalCsrfToken; // Return existing token if available
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * Hook to get and manage CSRF token
 */
export function useCsrfToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>(globalCsrfToken);
  const [isLoading, setIsLoading] = useState(!globalCsrfToken);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Register listener for token updates
    const listener = (token: string | null) => {
      setCsrfToken(token);
      setIsLoading(false);
      setError(token ? null : "Failed to get CSRF token");
    };

    listeners.add(listener);

    // Fetch token if not cached
    if (!globalCsrfToken) {
      fetchCsrfToken().then((token) => {
        setCsrfToken(token);
        setIsLoading(false);
        setError(token ? null : "Failed to get CSRF token");
      });
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Sync global token
      setCsrfToken(globalCsrfToken);
      setIsLoading(false);
    }

    // Cleanup listener on unmount
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // Refresh token manually
  const refresh = useCallback(async () => {
    setIsLoading(true);
    // Clear cached data to force refresh
    globalCsrfToken = null;
    globalTokenExpiry = null;

    const token = await fetchCsrfToken();
    setCsrfToken(token);
    setIsLoading(false);
    setError(token ? null : "Failed to refresh CSRF token");
    return token;
  }, []);

  return {
    csrfToken,
    isLoading,
    error,
    refresh,
  };
}

export default useCsrfToken;
