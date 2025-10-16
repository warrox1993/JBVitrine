import styles from "./HeaderBasic.module.css";

type LinkItem = { href: string; label: string };

type HeaderBasicProps = {
  brand?: string;
  links?: LinkItem[];
};

export default function HeaderBasic({
  brand = "YourBrand",
  links = [
    { href: "#intro", label: "Intro" },
    { href: "#one", label: "Who we are" },
    { href: "#two", label: "What we do" },
    { href: "#three", label: "Contact" },
  ],
}: HeaderBasicProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand}>
          {brand}
        </a>
        <nav className={styles.nav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

