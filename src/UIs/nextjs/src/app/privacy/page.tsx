import type { Metadata } from 'next';
import { Footer } from '@/components/sections/Footer/Footer';
import { Container } from '@/components/atoms/Container';
import { SectionWithBackground } from '@/components/ui/SectionWithBackground/SectionWithBackground';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Politique de Confidentialité RGPD — Smidjan',
    description: 'Politique de confidentialité et protection des données personnelles de Smidjan. Conformité RGPD, pas de cookies, transparence totale sur vos données.',
    alternates: {
        canonical: '/privacy',
    },
    openGraph: {
        title: 'Politique de Confidentialité — Smidjan',
        description: 'Protection de vos données personnelles. Site sans cookies, conforme RGPD.',
        type: 'website',
        url: 'https://www.smidjan.dev/privacy',
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
            { '@type': 'ListItem', position: 2, name: 'Politique de Confidentialité', item: 'https://www.smidjan.dev/privacy' },
        ],
    };
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    );
}

export default function PrivacyPage() {
    return (
        <>
            <BreadcrumbJsonLd />
            <div className={styles.privacyPage}>
                {/* Hero Section */}
                <SectionWithBackground className={styles.hero} variant="dark" ariaLabel="hero-title">
                    <Container>
                        <h1 id="hero-title" className={styles.heroTitle}>
                            Politique de Confidentialité
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Transparence totale sur la protection de vos données personnelles.
                        </p>
                        <div className={styles.badges}>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8 0L0 3v5c0 4 2.667 7 8 8 5.333-1 8-4 8-8V3L8 0zm0 1.5l6.5 2.5v4.5c0 3.2-2 5.6-6.5 6.5C3.5 14.1 1.5 11.7 1.5 8.5V4L8 1.5z"/>
                                    <path d="M6.5 10.5L4 8l1-1 1.5 1.5L10 5l1 1-4.5 4.5z"/>
                                </svg>
                                100% Conforme RGPD
                            </span>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM9.5 3.5v-2l2.5 2.5h-2a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                                Aucun cookie
                            </span>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                                </svg>
                                Aucun tracking
                            </span>
                        </div>
                    </Container>
                </SectionWithBackground>

                {/* Contenu principal */}
                <SectionWithBackground className={styles.content} variant="light">
                    <Container>
                        <div className={styles.contentWrapper}>
                            {/* Introduction */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Introduction</h2>
                                <p>
                                    SMIDJAN, studio de création numérique basé à Liège spécialisé en développement web,
                                    cybersécurité et intégration d'intelligence artificielle, accorde une importance
                                    particulière à la protection de votre vie privée et de vos données personnelles.
                                </p>
                                <p>
                                    Cette politique s'applique à toutes les personnes visitant le site SMIDJAN ou
                                    utilisant ses services numériques (formulaire de contact, audit, démonstration, etc.).
                                </p>
                                <p>
                                    La présente politique de confidentialité vous informe sur la manière dont nous
                                    collectons, utilisons, stockons et protégeons vos données personnelles, conformément
                                    au <strong>Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679)</strong> et
                                    à la loi belge du 30 juillet 2018 relative à la protection des personnes physiques
                                    à l'égard des traitements de données à caractère personnel.
                                </p>
                            </section>

                            {/* Responsable du traitement */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Responsable du traitement</h2>
                                <div className={styles.contactBox}>
                                    <p><strong>Responsable du traitement :</strong></p>
                                    <p>Jean-Baptiste Dhondt<br />
                                    SMIDJAN (marque en cours de création)<br />
                                    Liège, Belgique</p>
                                    <p>
                                        <strong>Email :</strong> <a href="mailto:jeanbaptiste.dhondt1@gmail.com">jeanbaptiste.dhondt1@gmail.com</a><br />
                                        <strong>Téléphone :</strong> <a href="tel:+32475205562">+32 475 205 562</a>
                                    </p>
                                </div>
                            </section>

                            {/* Données collectées */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Données collectées</h2>

                                <h3 className={styles.subsectionTitle}>Données de contact</h3>
                                <p>Lorsque vous utilisez nos formulaires de contact ou nous contactez directement, nous collectons :</p>
                                <ul className={styles.list}>
                                    <li>Nom et prénom</li>
                                    <li>Adresse email</li>
                                    <li>Numéro de téléphone (facultatif)</li>
                                    <li>Société/organisation (facultatif)</li>
                                    <li>Message et objet de la demande</li>
                                </ul>

                                <h3 className={styles.subsectionTitle}>Données de navigation</h3>
                                <p>Nous collectons automatiquement certaines informations lors de votre visite :</p>
                                <ul className={styles.list}>
                                    <li>Adresse IP (anonymisée après 24 mois)</li>
                                    <li>Type de navigateur et version</li>
                                    <li>Système d'exploitation</li>
                                    <li>Pages visitées et durée de visite</li>
                                    <li>Référent (site depuis lequel vous arrivez)</li>
                                    <li>Données de géolocalisation approximative (pays, région)</li>
                                </ul>

                                <h3 className={styles.subsectionTitle}>Cookies et technologies similaires</h3>
                                <div className={styles.highlightBox}>
                                    <p>
                                        <strong>Notre site n'utilise aucun cookie non essentiel</strong>, ni traceur
                                        publicitaire, ni outil d'analyse tiers.
                                    </p>
                                    <p>
                                        Aucune donnée de navigation n'est transmise à des services externes comme
                                        Google Analytics, Meta Pixel ou tout autre prestataire.
                                    </p>
                                </div>
                                <p>
                                    Nous utilisons uniquement le <strong>stockage local du navigateur (localStorage)</strong> pour :
                                </p>
                                <ul className={styles.list}>
                                    <li><strong>Préférences de thème</strong> : mémoriser votre choix entre le mode clair et sombre</li>
                                    <li><strong>Protection anti-spam</strong> : limiter les soumissions du formulaire de contact à 3 par heure</li>
                                </ul>
                                <p>
                                    Ces données sont stockées <strong>uniquement sur votre appareil</strong>, ne sont jamais
                                    transmises à nos serveurs et ne nécessitent pas de consentement RGPD.
                                </p>
                                <p className={styles.noCookie}>
                                    <strong>En conséquence :</strong><br />
                                    ❌ Aucune bannière de consentement n'est nécessaire<br />
                                    ❌ Aucun cookie n'est utilisé à des fins statistiques, marketing ou de suivi comportemental<br />
                                    ✅ Respect total de votre vie privée
                                </p>
                            </section>

                            {/* Finalités du traitement */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Finalités du traitement</h2>
                                <p>Nous utilisons vos données personnelles pour :</p>

                                <div className={styles.purposeCard}>
                                    <h3 className={styles.subsectionTitle}>Gestion des demandes de contact</h3>
                                    <ul className={styles.list}>
                                        <li><strong>Base légale :</strong> Intérêt légitime (développement commercial)</li>
                                        <li><strong>Finalité :</strong> Répondre à vos demandes, vous fournir des informations sur nos services</li>
                                        <li><strong>Durée :</strong> 3 ans après le dernier contact</li>
                                    </ul>
                                </div>

                                <div className={styles.purposeCard}>
                                    <h3 className={styles.subsectionTitle}>Gestion des prospects</h3>
                                    <ul className={styles.list}>
                                        <li><strong>Base légale :</strong> Intérêt légitime (développement commercial)</li>
                                        <li><strong>Finalité :</strong> Proposer nos services, maintenir une relation commerciale</li>
                                        <li><strong>Durée :</strong> 3 ans sans interaction de votre part</li>
                                    </ul>
                                </div>

                                <div className={styles.purposeCard}>
                                    <h3 className={styles.subsectionTitle}>Obligations légales</h3>
                                    <ul className={styles.list}>
                                        <li><strong>Base légale :</strong> Obligation légale</li>
                                        <li><strong>Finalité :</strong> Respecter nos obligations comptables, fiscales et juridiques</li>
                                        <li><strong>Durée :</strong> Selon les obligations légales applicables</li>
                                    </ul>
                                </div>
                            </section>

                            {/* Droits des personnes concernées */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Vos droits (RGPD)</h2>
                                <p>Conformément au RGPD, vous disposez des droits suivants :</p>

                                <div className={styles.rightsGrid}>
                                    <div className={styles.rightCard}>
                                        <h3>Droit d'accès</h3>
                                        <p>Article 15 RGPD</p>
                                        <p>Demander une copie de vos données personnelles</p>
                                    </div>
                                    <div className={styles.rightCard}>
                                        <h3>Droit de rectification</h3>
                                        <p>Article 16 RGPD</p>
                                        <p>Corriger des données inexactes ou incomplètes</p>
                                    </div>
                                    <div className={styles.rightCard}>
                                        <h3>Droit à l'effacement</h3>
                                        <p>Article 17 RGPD</p>
                                        <p>Demander la suppression de vos données</p>
                                    </div>
                                    <div className={styles.rightCard}>
                                        <h3>Droit à la limitation</h3>
                                        <p>Article 18 RGPD</p>
                                        <p>Limiter le traitement de vos données</p>
                                    </div>
                                    <div className={styles.rightCard}>
                                        <h3>Droit à la portabilité</h3>
                                        <p>Article 20 RGPD</p>
                                        <p>Récupérer vos données dans un format structuré</p>
                                    </div>
                                    <div className={styles.rightCard}>
                                        <h3>Droit d'opposition</h3>
                                        <p>Article 21 RGPD</p>
                                        <p>S'opposer au traitement basé sur l'intérêt légitime</p>
                                    </div>
                                </div>

                                <div className={styles.contactBox}>
                                    <p><strong>Pour exercer vos droits :</strong></p>
                                    <p>Contactez-nous à : <a href="mailto:jeanbaptiste.dhondt1@gmail.com">jeanbaptiste.dhondt1@gmail.com</a></p>
                                    <p>Nous nous engageons à répondre dans un délai maximum d'un mois.</p>
                                </div>
                            </section>

                            {/* Sécurité des données */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Sécurité des données</h2>
                                <p>Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>

                                <h3 className={styles.subsectionTitle}>Mesures techniques</h3>
                                <ul className={styles.list}>
                                    <li>Chiffrement des données en transit (HTTPS/TLS)</li>
                                    <li>Hébergement sécurisé chez Vercel Inc. (certifié DPF)</li>
                                    <li>Sauvegarde régulière des données</li>
                                    <li>Mise à jour des systèmes de sécurité</li>
                                    <li>Protection anti-spam avancée (score 11/10)</li>
                                    <li>Rate limiting et détection de bots</li>
                                </ul>

                                <h3 className={styles.subsectionTitle}>Mesures organisationnelles</h3>
                                <ul className={styles.list}>
                                    <li>Accès limité aux données (principe du moindre privilège)</li>
                                    <li>Formation à la protection des données</li>
                                    <li>Procédures de notification des violations</li>
                                    <li>Politique de mots de passe renforcée</li>
                                </ul>
                            </section>

                            {/* Transferts de données */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Transferts de données</h2>

                                <h3 className={styles.subsectionTitle}>Hébergement</h3>
                                <p>
                                    Nos données sont hébergées par <strong>Vercel Inc.</strong> aux États-Unis. Vercel Inc. est
                                    certifié dans le cadre de l'<strong>EU-US Data Privacy Framework (DPF)</strong>, garantissant
                                    un niveau de protection adéquat selon la Commission européenne.
                                </p>

                                <h3 className={styles.subsectionTitle}>Sous-traitants</h3>
                                <p>Nous pouvons faire appel à des sous-traitants pour certains services :</p>
                                <ul className={styles.list}>
                                    <li>Hébergement web : Vercel Inc. (États-Unis - DPF)</li>
                                    <li>Email : Services de messagerie sécurisés européens</li>
                                </ul>
                                <p>Tous nos sous-traitants sont sélectionnés pour leur conformité RGPD et liés par des accords de sous-traitance.</p>
                            </section>

                            {/* Durée de conservation */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Durée de conservation</h2>
                                <div className={styles.tableWrapper}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Type de données</th>
                                                <th>Durée de conservation</th>
                                                <th>Base légale</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Données de contact (prospects)</td>
                                                <td>3 ans sans interaction</td>
                                                <td>Intérêt légitime</td>
                                            </tr>
                                            <tr>
                                                <td>Données comptables</td>
                                                <td>10 ans</td>
                                                <td>Obligation légale</td>
                                            </tr>
                                            <tr>
                                                <td>Logs de sécurité</td>
                                                <td>1 an</td>
                                                <td>Intérêt légitime</td>
                                            </tr>
                                            <tr>
                                                <td>Correspondances e-mail</td>
                                                <td>3 ans</td>
                                                <td>Intérêt légitime / Preuve</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* Réclamations */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Réclamations</h2>
                                <p>
                                    Si vous estimez que le traitement de vos données personnelles constitue une violation
                                    du RGPD, vous pouvez introduire une réclamation auprès de l'autorité de contrôle compétente :
                                </p>
                                <div className={styles.contactBox}>
                                    <p><strong>Autorité de protection des données (Belgique)</strong></p>
                                    <p>
                                        Rue de la Presse, 35<br />
                                        1000 Bruxelles<br />
                                        <strong>Téléphone :</strong> +32 (0)2 274 48 00<br />
                                        <strong>Email :</strong> <a href="mailto:contact@apd-gba.be">contact@apd-gba.be</a><br />
                                        <strong>Site web :</strong> <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer">autoriteprotectiondonnees.be</a>
                                    </p>
                                </div>
                            </section>

                            {/* Contact */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Contact</h2>
                                <p>Pour toute question relative à cette politique de confidentialité ou à la protection de vos données personnelles :</p>
                                <div className={styles.contactBox}>
                                    <p>
                                        <strong>Jean-Baptiste Dhondt</strong><br />
                                        SMIDJAN<br />
                                        <strong>Email :</strong> <a href="mailto:jeanbaptiste.dhondt1@gmail.com">jeanbaptiste.dhondt1@gmail.com</a><br />
                                        <strong>Téléphone :</strong> <a href="tel:+32475205562">+32 475 205 562</a><br />
                                        <strong>Adresse :</strong> Liège, Belgique
                                    </p>
                                    <p>Nous nous engageons à répondre à vos questions dans les meilleurs délais.</p>
                                </div>
                            </section>

                            {/* Modifications */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Modifications de cette politique</h2>
                                <p>
                                    Cette politique de confidentialité peut être mise à jour pour refléter les évolutions
                                    de nos pratiques ou de la réglementation. Nous vous informerons de tout changement
                                    significatif par email ou via un avis sur notre site.
                                </p>
                            </section>

                            {/* Version */}
                            <div className={styles.version}>
                                <p>
                                    <strong>Version : 1.0</strong> — Applicable à compter du 1er novembre 2025<br />
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
