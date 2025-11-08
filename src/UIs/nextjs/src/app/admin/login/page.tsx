"use client";

/**
 * Admin Login Page
 * Authentication form for admin access
 */

import { useState, FormEvent, Suspense } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import cls from "./page.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/leads";

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
      <Breadcrumb items={[
        { label: 'Admin', href: '/admin' },
        { label: 'Connexion', href: '/admin/login' }
      ]} />

      <div className={cls.loginCard}>
        <div className={cls.header}>
          <h1 className={cls.title}>Admin Login</h1>
          <p className={cls.subtitle}>Sign in to access the admin dashboard</p>
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
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cls.input}
              placeholder="admin@smidjan.be"
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className={cls.field}>
            <label htmlFor="password" className={cls.label}>
              Password
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
                <svg
                  className={cls.spinner}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray="60"
                    strokeDashoffset="30"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className={cls.footer}>
          <p className={cls.footerText}>
            Default credentials: admin@smidjan.be / admin123
          </p>
          <p className={cls.footerWarning}>Change password in production!</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
