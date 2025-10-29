import Link from "next/link";

export default function Page() {
  return (
    <section style={{ padding: "var(--space-5)" }} aria-labelledby="auditlogs-title">
      <div style={{ maxWidth: "60ch", margin: "0 auto" }}>
        <h1 id="auditlogs-title" style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-3)" }}>
          Journal d&apos;audit indisponible
        </h1>
        <p style={{ color: "var(--color-text-2)", marginBottom: "var(--space-4)" }}>
          Les fonctionnalités d’administration héritées ont été retirées dans la nouvelle
          vitrine. Si vous avez besoin d’un accès audit, contactez l’équipe pour une mise à
          jour dédiée.
        </p>
        <Link href="/" style={{ color: "var(--color-accent-1)", textDecoration: "underline" }}>
          Revenir à l’accueil
        </Link>
      </div>
    </section>
  );
}
