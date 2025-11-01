import type { Metadata } from 'next';
import { Footer } from '@/components/sections/Footer/Footer';
import { Container } from '@/components/atoms/Container';
import { SectionWithBackground } from '@/components/ui/SectionWithBackground/SectionWithBackground';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Mentions Légales — Smidjan',
    description: 'Mentions légales de Smidjan : identification du site, statut juridique, hébergement, propriété intellectuelle. Studio digital basé à Liège, Belgique.',
    alternates: {
        canonical: '/legal-notice',
    },
    openGraph: {
        title: 'Mentions Légales — Smidjan',
        description: 'Identification du site, statut juridique et informations légales de Smidjan.',
        type: 'website',
        url: 'https://www.smidjan.dev/legal-notice',
    },
    robots: {
        index: true,
        follow: true,
    },
};

function BreadcrumbJsonLd() {
    const json = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.smidjan.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Mentions Légales', item: 'https://www.smidjan.dev/legal-notice' },
        ],
    };
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    );
}

export default function LegalNoticePage() {
    return (
        <>
            <BreadcrumbJsonLd />
            <div className={styles.legalPage}>
                {/* Hero Section */}
                <SectionWithBackground className={styles.hero} variant="dark" ariaLabel="hero-title">
                    <Container>
                        <h1 id="hero-title" className={styles.heroTitle}>
                            Mentions Légales
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Informations légales et identification du site SMIDJAN
                        </p>
                        <div className={styles.badges}>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg>
                                Liège, Belgique
                            </span>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/>
                                </svg>
                                contact@smidjan.dev
                            </span>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                </svg>
                                Vercel DPF
                            </span>
                        </div>
                    </Container>
                </SectionWithBackground>

                {/* Contenu principal */}
                <SectionWithBackground className={styles.content} variant="light">
                    <Container>
                        <div className={styles.contentWrapper}>
                            {/* Objet du document */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Objet du document</h2>
                                <p>
                                    Les présentes mentions légales définissent les modalités de consultation et d'utilisation
                                    du site SMIDJAN. Elles vous informent sur l'identification du responsable du site, les
                                    conditions d'accès, les droits de propriété intellectuelle, et les limitations de
                                    responsabilité applicables.
                                </p>
                            </section>

                            {/* Identification du site */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Identification du site</h2>
                                <p>Le site internet présent à l'adresse <strong>www.smidjan.dev</strong> (ci-après dénommé "le Site") est édité par :</p>

                                <div className={styles.identityCard}>
                                    <div className={styles.identityHeader}>
                                        <h3 className={styles.companyName}>SMIDJAN</h3>
                                        <p className={styles.tagline}>Digital Craft, Where Ideas Forged</p>
                                    </div>
                                    <div className={styles.identityBody}>
                                        <div className={styles.identityItem}>
                                            <span className={styles.label}>Statut :</span>
                                            <span className={styles.value}>Marque en cours de création</span>
                                        </div>
                                        <div className={styles.identityItem}>
                                            <span className={styles.label}>Porteur du projet :</span>
                                            <span className={styles.value}>Jean-Baptiste Dhondt</span>
                                        </div>
                                        <div className={styles.identityItem}>
                                            <span className={styles.label}>Adresse :</span>
                                            <span className={styles.value}>Liège, Belgique</span>
                                        </div>
                                        <div className={styles.identityItem}>
                                            <span className={styles.label}>Téléphone :</span>
                                            <span className={styles.value}>
                                                <a href="tel:+32475205562">+32 475 205 562</a>
                                            </span>
                                        </div>
                                        <div className={styles.identityItem}>
                                            <span className={styles.label}>Email :</span>
                                            <span className={styles.value}>
                                                <a href="mailto:jeanbaptiste.dhondt1@gmail.com">jeanbaptiste.dhondt1@gmail.com</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Présentation et expertise */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Présentation et expertise</h2>
                                <div className={styles.expertiseBox}>
                                    <p>
                                        SMIDJAN est un <strong>studio de création numérique basé à Liège</strong> proposant
                                        des solutions complètes en développement web, cybersécurité et intégration d'intelligence
                                        artificielle.
                                    </p>
                                    <p>
                                        Spécialisé dans la création de sites web modernes, l'audit de sécurité informatique, et
                                        l'automatisation de processus métier, SMIDJAN accompagne les PME, entrepreneurs et
                                        institutions locales dans leur transformation numérique.
                                    </p>
                                    <p>
                                        Notre expertise couvre les technologies web contemporaines, les frameworks de développement,
                                        et les bonnes pratiques de sécurité informatique.
                                    </p>
                                </div>
                            </section>

                            {/* Statut juridique */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Statut juridique</h2>
                                <div className={styles.warningBox}>
                                    <p>
                                        <strong>SMIDJAN est une marque commerciale en cours de création.</strong> L'immatriculation
                                        de la structure juridique définitive est en attente de finalisation auprès des autorités
                                        compétentes belges.
                                    </p>
                                    <p>
                                        Toutes les informations légales seront mises à jour dès l'obtention du :
                                    </p>
                                    <ul className={styles.list}>
                                        <li>Numéro d'entreprise BCE (Banque-Carrefour des Entreprises)</li>
                                        <li>Numéro de TVA intracommunautaire</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Activité */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Activité</h2>
                                <p>SMIDJAN propose des services de :</p>

                                <div className={styles.servicesGrid}>
                                    <div className={styles.serviceItem}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <rect x="2" y="3" width="20" height="14" rx="2"/>
                                            <line x1="8" y1="21" x2="16" y2="21"/>
                                            <line x1="12" y1="17" x2="12" y2="21"/>
                                        </svg>
                                        <div>
                                            <h4>Développement web</h4>
                                            <p>Sites vitrine, e-commerce, applications sur mesure</p>
                                        </div>
                                    </div>

                                    <div className={styles.serviceItem}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                        </svg>
                                        <div>
                                            <h4>Cybersécurité</h4>
                                            <p>Audit de sécurité, conformité RGPD, sensibilisation</p>
                                        </div>
                                    </div>

                                    <div className={styles.serviceItem}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <circle cx="12" cy="12" r="10"/>
                                            <path d="M12 6v6l4 2"/>
                                        </svg>
                                        <div>
                                            <h4>Automatisation et IA</h4>
                                            <p>Processus métier, chatbots, intégration IA</p>
                                        </div>
                                    </div>

                                    <div className={styles.serviceItem}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                            <circle cx="9" cy="7" r="4"/>
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                        </svg>
                                        <div>
                                            <h4>Conseil digital</h4>
                                            <p>Stratégie de digitalisation, accompagnement, formation</p>
                                        </div>
                                    </div>
                                </div>

                                <p className={styles.targetAudience}>
                                    <strong>Public cible :</strong> PME, entrepreneurs, indépendants, institutions locales.
                                </p>
                            </section>

                            {/* Hébergement */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Hébergement</h2>
                                <p>Le Site est hébergé par :</p>

                                <div className={styles.hostingCard}>
                                    <h3 className={styles.subsectionTitle}>Vercel Inc.</h3>
                                    <div className={styles.hostingDetails}>
                                        <p>
                                            340 S Lemon Ave #4133<br />
                                            Walnut, CA 91789<br />
                                            États-Unis
                                        </p>
                                        <p>
                                            <strong>Email :</strong> <a href="mailto:privacy@vercel.com">privacy@vercel.com</a><br />
                                            <strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a>
                                        </p>
                                    </div>
                                    <div className={styles.certificationBadge}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path d="M10 0L0 3v5c0 4 2.667 7 10 10 7.333-3 10-6 10-10V3L10 0z"/>
                                            <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none"/>
                                        </svg>
                                        <span>
                                            Vercel Inc. est certifié dans le cadre de l'accord <strong>EU-US Data Privacy Framework (DPF)</strong> et
                                            respecte les directives européennes en matière de protection des données.
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Propriété intellectuelle */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Propriété intellectuelle</h2>

                                <h3 className={styles.subsectionTitle}>Droits d'auteur</h3>
                                <p>
                                    L'ensemble des éléments du Site (textes, images, vidéos, logos, graphismes, photographies,
                                    sons, logiciels, structure, mise en page, charte graphique) sont la propriété exclusive de
                                    SMIDJAN ou de ses partenaires, et sont protégés par les dispositions du droit belge et
                                    international relatives à la propriété intellectuelle.
                                </p>
                                <div className={styles.highlightBox}>
                                    <p>
                                        <strong>Toute reproduction, représentation, adaptation, traduction et/ou transformation,
                                        partielle ou intégrale, ou transfert sur un autre site sont interdits</strong> sauf
                                        autorisation écrite préalable de SMIDJAN.
                                    </p>
                                </div>

                                <h3 className={styles.subsectionTitle}>Marques et logos</h3>
                                <p>
                                    Le nom <strong>"SMIDJAN"</strong> et le slogan <strong>"Digital Craft, Where Ideas Forged"</strong> sont
                                    des marques en cours de protection au niveau national et communautaire.
                                </p>
                                <p>
                                    Toute utilisation non autorisée de ces éléments constitue une contrefaçon passible de
                                    sanctions civiles et pénales.
                                </p>

                                <h3 className={styles.subsectionTitle}>Liens hypertextes</h3>
                                <p>
                                    La création de liens hypertextes vers le Site est soumise à l'autorisation préalable écrite
                                    de SMIDJAN. Cette autorisation peut être révoquée à tout moment.
                                </p>
                                <p>
                                    SMIDJAN ne saurait être tenue responsable du contenu des sites vers lesquels des liens
                                    hypertextes pourraient renvoyer à partir du Site.
                                </p>
                            </section>

                            {/* Limitation de responsabilité */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Limitation de responsabilité</h2>

                                <div className={styles.responsibilityGrid}>
                                    <div className={styles.responsibilityCard}>
                                        <h3 className={styles.subsectionTitle}>Disponibilité du service</h3>
                                        <p>
                                            SMIDJAN s'efforce d'assurer l'accessibilité du Site 24h/24 et 7j/7. Néanmoins, SMIDJAN
                                            se réserve le droit d'interrompre temporairement l'accès au Site pour des raisons de
                                            maintenance, de mise à jour, ou en cas de force majeure.
                                        </p>
                                        <p>
                                            SMIDJAN ne saurait être tenue responsable des dommages directs ou indirects pouvant
                                            résulter de l'inaccessibilité temporaire du Site.
                                        </p>
                                    </div>

                                    <div className={styles.responsibilityCard}>
                                        <h3 className={styles.subsectionTitle}>Contenu des informations</h3>
                                        <p>
                                            Les informations diffusées sur le Site sont fournies à titre indicatif et peuvent être
                                            modifiées sans préavis. SMIDJAN met tout en œuvre pour fournir des informations exactes
                                            et à jour, mais ne saurait garantir l'exactitude, la complétude ou l'actualité des
                                            informations publiées.
                                        </p>
                                        <p>
                                            SMIDJAN décline toute responsabilité en cas d'erreur, d'omission ou d'inexactitude dans
                                            les informations publiées sur le Site.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Droit applicable */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Droit applicable et juridiction compétente</h2>
                                <div className={styles.jurisdictionBox}>
                                    <div className={styles.jurisdictionItem}>
                                        <h4>Droit applicable</h4>
                                        <p>Les présentes mentions légales sont régies par le <strong>droit belge</strong>.</p>
                                    </div>
                                    <div className={styles.jurisdictionItem}>
                                        <h4>Juridiction compétente</h4>
                                        <p>
                                            En cas de litige relatif à l'interprétation ou à l'exécution des présentes mentions
                                            légales, et à défaut de résolution amiable, les <strong>tribunaux de Liège (Belgique)</strong> seront
                                            seuls compétents.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Contact */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Contact</h2>
                                <p>Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :</p>
                                <div className={styles.contactBox}>
                                    <p>
                                        <strong>Jean-Baptiste Dhondt</strong><br />
                                        SMIDJAN<br />
                                        <strong>Email :</strong> <a href="mailto:jeanbaptiste.dhondt1@gmail.com">jeanbaptiste.dhondt1@gmail.com</a><br />
                                        <strong>Téléphone :</strong> <a href="tel:+32475205562">+32 475 205 562</a><br />
                                        <strong>Adresse :</strong> Liège, Belgique
                                    </p>
                                    <p>Nous nous engageons à répondre à vos demandes dans les meilleurs délais.</p>
                                </div>
                            </section>

                            {/* Mise à jour */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Mise à jour</h2>
                                <p>
                                    Les présentes mentions légales peuvent être modifiées à tout moment. Il appartient à
                                    l'utilisateur de consulter régulièrement la dernière version disponible sur le Site.
                                </p>
                            </section>

                            {/* Version */}
                            <div className={styles.version}>
                                <p>
                                    <strong>Version 1.0</strong> — Applicable à compter du 1er novembre 2025<br />
                                    <strong>Dernière révision :</strong> 1er novembre 2025
                                </p>
                            </div>
                        </div>
                    </Container>
                </SectionWithBackground>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
