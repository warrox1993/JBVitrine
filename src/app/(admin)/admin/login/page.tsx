"use client";

/**
 * Admin Login Page
 * Authentication form for admin access
 */

import { useState, FormEvent, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import cls from "./page.module.css";

/**
 * Sanitizes a callback URL to ensure it only points to an internal path.
 * Rejects anything that is not a same-origin absolute path (must start with
 * "/" and must not start with "//", which browsers treat as protocol-relative
 * and would allow redirecting to an external host).
 */
function sanitizeCallbackUrl(rawCallbackUrl: string | null): string {
  const fallback = "/admin/leads";

  if (!rawCallbackUrl) {
    return fallback;
  }

  if (!rawCallbackUrl.startsWith("/") || rawCallbackUrl.startsWith("//")) {
    return fallback;
  }

  return rawCallbackUrl;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className={cls.container}>
      <div className={cls.loginCard}>
        <div className={cls.header}>
          <h1 className={cls.title}>Espace Admin</h1>
          <p className={cls.subtitle}>Connectez-vous pour gérer votre studio digital</p>
        </div>

        {error && (
          <div className={cls.error}>
            <svg
              className={cls.errorIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={cls.form}>
          <div className={cls.field}>
            <label htmlFor="email" className={cls.label}>
              Email Professionnel
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cls.input}
              placeholder="votre.nom@smidjan.be"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className={cls.field}>
            <label htmlFor="password" className={cls.label}>
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cls.input}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cls.submitButton}
          >
            {isLoading ? (
              <>
                <div className={cls.spinner} />
                Authentification...
              </>
            ) : (
              <>
                Se connecter
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className={cls.footer}>
          <p className={cls.footerText}>
            Accès sécurisé réservé aux membres de Smidjan
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className={cls.container}><div className={cls.spinner} /></div>}>
      <LoginForm />
    </Suspense>
  );
}
