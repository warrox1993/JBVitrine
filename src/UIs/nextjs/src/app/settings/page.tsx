import Link from "next/link";

export default function Page() {
  return (
    <section style={{ padding: "var(--space-5)" }} aria-labelledby="settings-title">
      <div style={{ maxWidth: "60ch", margin: "0 auto" }}>
        <h1 id="settings-title" style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-3)" }}>
          Paramètres retirés
        </h1>
        <p style={{ color: "var(--color-text-2)", marginBottom: "var(--space-4)" }}>
          Le back-office historique n’est plus embarqué dans cette version. Les
          paramétrages sont désormais gérés via la configuration du site vitrine.
        </p>
        <Link href="/" style={{ color: "var(--color-accent-1)", textDecoration: "underline" }}>
          Revenir à l’accueil
        </Link>
      </div>
    </section>
  );
}
