import type { Metadata } from 'next';
import { Footer } from '@/components/sections/Footer/Footer';
import { Container } from '@/components/atoms/Container';
import { SectionWithBackground } from '@/components/ui/SectionWithBackground/SectionWithBackground';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Conditions Générales de Vente (CGV) — Smidjan',
    description: 'Conditions Générales de Vente de Smidjan : développement web, cybersécurité, automatisation IA. Prestations, tarifs, délais et garanties pour entreprises en Belgique.',
    alternates: {
        canonical: '/terms',
    },
    openGraph: {
        title: 'CGV — Smidjan',
        description: 'Conditions Générales de Vente : prestations web, cybersécurité et IA.',
        type: 'website',
        url: 'https://www.smidjan.dev/terms',
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
            { '@type': 'ListItem', position: 2, name: 'Conditions Générales de Vente', item: 'https://www.smidjan.dev/terms' },
        ],
    };
    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
    );
}

export default function TermsPage() {
    return (
        <>
            <BreadcrumbJsonLd />
            <div className={styles.termsPage}>
                {/* Hero Section */}
                <SectionWithBackground className={styles.hero} variant="dark" ariaLabel="hero-title">
                    <Container>
                        <h1 id="hero-title" className={styles.heroTitle}>
                            Conditions Générales de Vente
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Cadre contractuel pour nos prestations de développement web, cybersécurité et automatisation IA.
                        </p>
                        <div className={styles.badges}>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                                </svg>
                                Droit belge
                            </span>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M8 0L0 3v5c0 4 2.667 7 8 8 5.333-1 8-4 8-8V3L8 0zm0 1.5l6.5 2.5v4.5c0 3.2-2 5.6-6.5 6.5C3.5 14.1 1.5 11.7 1.5 8.5V4L8 1.5z"/>
                                </svg>
                                Garantie 3 mois
                            </span>
                            <span className={styles.badge}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                </svg>
                                Devis valable 30j
                            </span>
                        </div>
                    </Container>
                </SectionWithBackground>

                {/* Contenu principal */}
                <SectionWithBackground className={styles.content} variant="light">
                    <Container>
                        <div className={styles.contentWrapper}>
                            {/* Préambule */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Préambule</h2>
                                <p>Les présentes Conditions Générales de Vente (ci-après "CGV") définissent les droits et obligations entre :</p>
                                <div className={styles.contactBox}>
                                    <p><strong>SMIDJAN</strong><br />
                                    <em>Marque en cours de création</em><br />
                                    Portée par Jean-Baptiste Dhondt<br />
                                    Adresse : Liège, Belgique<br />
                                    <strong>Email :</strong> <a href="mailto:jeanbaptiste.dhondt1@gmail.com">jeanbaptiste.dhondt1@gmail.com</a><br />
                                    <strong>Téléphone :</strong> <a href="tel:+32475205562">+32 475 205 562</a></p>
                                    <p>Ci-après dénommée "le Prestataire" ou "SMIDJAN",</p>
                                    <p>Et toute personne physique ou morale souhaitant bénéficier des services proposés par SMIDJAN, ci-après dénommée "le Client".</p>
                                </div>

                                <div className={styles.warningBox}>
                                    <h3 className={styles.subsectionTitle}>Statut juridique temporaire</h3>
                                    <p><strong>Important :</strong> SMIDJAN est une marque commerciale en cours de création. La structure juridique définitive (société, entreprise individuelle) est en attente d'immatriculation auprès des autorités belges compétentes.</p>
                                    <p>Les présentes CGV seront mises à jour dès l'obtention :</p>
                                    <ul className={styles.list}>
                                        <li>Du numéro d'entreprise BCE (Banque-Carrefour des Entreprises)</li>
                                        <li>Du numéro de TVA intracommunautaire</li>
                                        <li>De l'immatriculation officielle de la structure</li>
                                    </ul>
                                    <p>Toute prestation réalisée avant l'immatriculation officielle sera facturée selon les modalités légales applicables au moment de la facturation.</p>
                                </div>
                            </section>

                            {/* Objet et champ d'application */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Objet et champ d'application</h2>

                                <h3 className={styles.subsectionTitle}>Services proposés</h3>
                                <p>SMIDJAN propose les prestations suivantes :</p>

                                <div className={styles.servicesGrid}>
                                    <div className={styles.serviceCard}>
                                        <h4>Création et développement web</h4>
                                        <ul className={styles.list}>
                                            <li>Conception de sites web vitrine et e-commerce</li>
                                            <li>Développement d'applications web sur mesure</li>
                                            <li>Optimisation SEO et performance</li>
                                            <li>Maintenance et hébergement web</li>
                                            <li>Solutions web personnalisées pour PME</li>
                                        </ul>
                                    </div>

                                    <div className={styles.serviceCard}>
                                        <h4>Cybersécurité</h4>
                                        <ul className={styles.list}>
                                            <li>Audit de sécurité informatique</li>
                                            <li>Mise en conformité RGPD</li>
                                            <li>Formation en sensibilisation cybersécurité</li>
                                            <li>Conseil en gouvernance des risques</li>
                                            <li>Sécurisation de sites web et applications</li>
                                        </ul>
                                    </div>

                                    <div className={styles.serviceCard}>
                                        <h4>Automatisation et IA</h4>
                                        <ul className={styles.list}>
                                            <li>Automatisation de processus métier</li>
                                            <li>Intégration de solutions d'IA</li>
                                            <li>Développement de chatbots</li>
                                            <li>Optimisation des workflows numériques</li>
                                            <li>Solutions d'IA pour transformation digitale</li>
                                        </ul>
                                    </div>

                                    <div className={styles.serviceCard}>
                                        <h4>Conseil en transformation numérique</h4>
                                        <ul className={styles.list}>
                                            <li>Stratégie de digitalisation</li>
                                            <li>Accompagnement au changement</li>
                                            <li>Formation aux outils numériques</li>
                                            <li>Conseil en architecture système</li>
                                        </ul>
                                    </div>
                                </div>

                                <h3 className={styles.subsectionTitle}>Acceptation des CGV</h3>
                                <p>Toute commande ou signature de devis implique l'acceptation sans réserve des présentes CGV par le Client. Les CGV applicables sont celles en vigueur au moment de la commande.</p>
                            </section>

                            {/* Processus commercial */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Processus commercial</h2>

                                <div className={styles.processSteps}>
                                    <div className={styles.step}>
                                        <div className={styles.stepNumber}>1</div>
                                        <div className={styles.stepContent}>
                                            <h4>Consultation initiale</h4>
                                            <p>Gratuite, par téléphone ou visioconférence (durée maximale : 30 minutes)</p>
                                        </div>
                                    </div>
                                    <div className={styles.step}>
                                        <div className={styles.stepNumber}>2</div>
                                        <div className={styles.stepContent}>
                                            <h4>Analyse des besoins</h4>
                                            <p>Étude détaillée des exigences techniques et fonctionnelles</p>
                                        </div>
                                    </div>
                                    <div className={styles.step}>
                                        <div className={styles.stepNumber}>3</div>
                                        <div className={styles.stepContent}>
                                            <h4>Proposition commerciale</h4>
                                            <p>Devis détaillé avec planning et modalités</p>
                                        </div>
                                    </div>
                                </div>

                                <h3 className={styles.subsectionTitle}>Devis et validation</h3>
                                <p>Tout devis émis par SMIDJAN est <strong>valable 30 jours</strong> à compter de sa date d'émission. Passé ce délai, SMIDJAN se réserve le droit de modifier les conditions proposées.</p>
                                <p>La signature du devis ou l'envoi d'un email de validation par le Client vaut acceptation des présentes CGV et commencement de la prestation.</p>

                                <h3 className={styles.subsectionTitle}>Modifications en cours de projet</h3>
                                <p>Toute modification substantielle demandée par le Client en cours de réalisation fera l'objet d'un avenant au devis initial. Ces modifications peuvent entraîner :</p>
                                <ul className={styles.list}>
                                    <li>Un ajustement des délais de livraison</li>
                                    <li>Une facturation complémentaire</li>
                                    <li>Une révision du planning projet</li>
                                </ul>
                            </section>

                            {/* Obligations des parties */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Obligations des parties</h2>

                                <div className={styles.obligationsGrid}>
                                    <div className={styles.obligationCard}>
                                        <h3 className={styles.subsectionTitle}>Obligations du Prestataire</h3>
                                        <p>SMIDJAN s'engage à :</p>
                                        <ul className={styles.list}>
                                            <li>Respecter les délais convenus, sauf cas de force majeure</li>
                                            <li>Fournir des prestations conformes aux spécifications validées</li>
                                            <li>Maintenir la confidentialité des informations du Client</li>
                                            <li>Assurer un support technique pendant la durée convenue</li>
                                            <li>Respecter les normes de sécurité et de protection des données</li>
                                            <li>Utiliser les meilleures pratiques en développement web, cybersécurité et IA</li>
                                        </ul>
                                    </div>

                                    <div className={styles.obligationCard}>
                                        <h3 className={styles.subsectionTitle}>Obligations du Client</h3>
                                        <p>Le Client s'engage à :</p>
                                        <ul className={styles.list}>
                                            <li>Fournir tous les éléments nécessaires à la réalisation</li>
                                            <li>Respecter les délais de validation et de retour</li>
                                            <li>Effectuer les paiements aux échéances convenues</li>
                                            <li>Communiquer clairement ses besoins et modifications</li>
                                            <li>Respecter les droits de propriété intellectuelle de SMIDJAN</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Propriété intellectuelle */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Propriété intellectuelle</h2>

                                <h3 className={styles.subsectionTitle}>Droits sur les livrables</h3>
                                <p>À l'issue du projet et sous réserve du paiement intégral :</p>
                                <ul className={styles.list}>
                                    <li>Le Client acquiert les droits d'usage sur les éléments créés spécifiquement pour son projet</li>
                                    <li>SMIDJAN conserve la propriété des méthodes, savoir-faire et outils développés</li>
                                    <li>Les codes sources, frameworks et bibliothèques restent la propriété de leurs auteurs respectifs</li>
                                </ul>

                                <h3 className={styles.subsectionTitle}>Éléments préexistants</h3>
                                <p>SMIDJAN peut utiliser des éléments préexistants (frameworks, bibliothèques, composants) pour optimiser les développements. Ces éléments restent soumis à leurs licences d'origine.</p>

                                <h3 className={styles.subsectionTitle}>Droit de référence</h3>
                                <p>SMIDJAN se réserve le droit de mentionner le Client comme référence commerciale et d'utiliser les réalisations à des fins de promotion, sauf opposition écrite du Client.</p>
                            </section>

                            {/* Confidentialité et sécurité */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Confidentialité et sécurité</h2>

                                <div className={styles.highlightBox}>
                                    <h3 className={styles.subsectionTitle}>Engagement de confidentialité</h3>
                                    <p>SMIDJAN s'engage à :</p>
                                    <ul className={styles.list}>
                                        <li>Garder strictement confidentielles toutes les informations du Client</li>
                                        <li>Ne pas divulguer les données techniques, commerciales ou stratégiques</li>
                                        <li>Limiter l'accès aux informations aux seules personnes impliquées dans le projet</li>
                                        <li>Restituer ou détruire les informations confidentielles à la fin de la mission</li>
                                    </ul>
                                </div>

                                <h3 className={styles.subsectionTitle}>Sécurité des données</h3>
                                <p>Conformément au RGPD :</p>
                                <ul className={styles.list}>
                                    <li>Mise en place de mesures techniques et organisationnelles appropriées</li>
                                    <li>Chiffrement des données sensibles (HTTPS/TLS)</li>
                                    <li>Sauvegarde sécurisée des données du projet</li>
                                    <li>Notification en cas de violation de données</li>
                                </ul>
                            </section>

                            {/* Modalités financières */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Modalités financières</h2>

                                <h3 className={styles.subsectionTitle}>Tarification</h3>
                                <p>Les tarifs sont communiqués dans chaque devis et peuvent varier selon :</p>
                                <ul className={styles.list}>
                                    <li>La complexité du projet</li>
                                    <li>Les délais demandés</li>
                                    <li>Les technologies utilisées (frameworks, langages, outils IA)</li>
                                    <li>Le niveau d'accompagnement souhaité</li>
                                </ul>

                                <div className={styles.paymentBox}>
                                    <h3 className={styles.subsectionTitle}>Modalités de paiement</h3>
                                    <p><em>(En attente d'immatriculation)</em></p>
                                    <div className={styles.paymentSteps}>
                                        <div className={styles.paymentStep}>
                                            <span className={styles.percent}>30%</span>
                                            <p>Acompte à la signature du devis</p>
                                        </div>
                                        <div className={styles.paymentStep}>
                                            <span className={styles.percent}>40%</span>
                                            <p>À la livraison de la première version</p>
                                        </div>
                                        <div className={styles.paymentStep}>
                                            <span className={styles.percent}>30%</span>
                                            <p>Solde à la livraison finale</p>
                                        </div>
                                    </div>
                                    <p><strong>Moyens de paiement :</strong> Virement bancaire (coordonnées communiquées après immatriculation)</p>
                                </div>

                                <h3 className={styles.subsectionTitle}>Retard de paiement</h3>
                                <p>En cas de retard de paiement :</p>
                                <ul className={styles.list}>
                                    <li>Pénalités de <strong>1,5% par mois</strong> de retard</li>
                                    <li>Suspension des prestations en cours après mise en demeure restée infructueuse</li>
                                    <li>Facturation des frais de recouvrement</li>
                                </ul>
                            </section>

                            {/* Délais et livraison */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Délais et livraison</h2>

                                <h3 className={styles.subsectionTitle}>Délais de réalisation</h3>
                                <p>Les délais sont indicatifs et débutent à réception :</p>
                                <ul className={styles.list}>
                                    <li>De l'acompte</li>
                                    <li>De tous les éléments nécessaires fournis par le Client</li>
                                    <li>De la validation définitive des spécifications</li>
                                </ul>

                                <h3 className={styles.subsectionTitle}>Livraison</h3>
                                <p>La livraison s'effectue selon les modalités convenues :</p>
                                <ul className={styles.list}>
                                    <li>Mise en ligne sur serveur de test</li>
                                    <li>Formation à l'utilisation</li>
                                    <li>Documentation technique</li>
                                    <li>Transfert sur serveur de production</li>
                                </ul>
                            </section>

                            {/* Garantie et support */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Garantie et support</h2>

                                <div className={styles.warrantyBox}>
                                    <h3 className={styles.subsectionTitle}>Garantie de conformité</h3>
                                    <p>SMIDJAN garantit la conformité des livrables aux spécifications validées pendant une durée de <strong>3 mois</strong> à compter de la livraison.</p>
                                </div>

                                <h3 className={styles.subsectionTitle}>Support technique</h3>
                                <p>Support technique inclus :</p>
                                <ul className={styles.list}>
                                    <li>Résolution des bugs et dysfonctionnements</li>
                                    <li>Assistance téléphonique ou email (heures ouvrables)</li>
                                    <li>Mises à jour de sécurité critiques</li>
                                </ul>

                                <h3 className={styles.subsectionTitle}>Maintenance évolutive</h3>
                                <p>La maintenance évolutive (nouvelles fonctionnalités, améliorations) fait l'objet de contrats séparés ou de devis spécifiques.</p>
                            </section>

                            {/* Limitation de responsabilité */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Limitation de responsabilité</h2>

                                <h3 className={styles.subsectionTitle}>Exclusions</h3>
                                <p>SMIDJAN ne saurait être tenue responsable :</p>
                                <ul className={styles.list}>
                                    <li>Des dommages indirects (perte d'exploitation, manque à gagner)</li>
                                    <li>Des interruptions de service dues à des tiers (hébergeur, FAI)</li>
                                    <li>De l'utilisation inappropriée des livrables par le Client</li>
                                    <li>Des modifications apportées par le Client ou des tiers</li>
                                </ul>

                                <h3 className={styles.subsectionTitle}>Plafonnement</h3>
                                <p>La responsabilité de SMIDJAN est limitée au montant total du contrat concerné.</p>
                            </section>

                            {/* Force majeure */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Force majeure</h2>
                                <p>Sont considérés comme cas de force majeure :</p>
                                <ul className={styles.list}>
                                    <li>Événements naturels (tempête, inondation, etc.)</li>
                                    <li>Guerre, épidémie, grève générale</li>
                                    <li>Défaillance majeure des infrastructures internet</li>
                                    <li>Décisions gouvernementales restrictives</li>
                                </ul>
                                <p>La force majeure suspend les obligations contractuelles sans indemnisation.</p>
                            </section>

                            {/* Résiliation */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Résiliation</h2>

                                <div className={styles.terminationGrid}>
                                    <div className={styles.terminationCard}>
                                        <h3 className={styles.subsectionTitle}>Résiliation par le Client</h3>
                                        <p>Le Client peut résilier le contrat moyennant :</p>
                                        <ul className={styles.list}>
                                            <li>Préavis de 15 jours par lettre recommandée</li>
                                            <li>Paiement des prestations déjà réalisées</li>
                                            <li>Indemnisation forfaitaire de 20% du montant restant dû</li>
                                        </ul>
                                    </div>

                                    <div className={styles.terminationCard}>
                                        <h3 className={styles.subsectionTitle}>Résiliation par SMIDJAN</h3>
                                        <p>SMIDJAN peut résilier en cas de :</p>
                                        <ul className={styles.list}>
                                            <li>Non-paiement persistant malgré mise en demeure</li>
                                            <li>Manquement grave du Client à ses obligations</li>
                                            <li>Impossibilité de réaliser la prestation</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Règlement des litiges */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Règlement des litiges</h2>

                                <h3 className={styles.subsectionTitle}>Résolution amiable</h3>
                                <p>En cas de différend, les parties s'efforceront de trouver une solution amiable par voie de négociation ou médiation.</p>

                                <h3 className={styles.subsectionTitle}>Juridiction compétente</h3>
                                <p>À défaut d'accord amiable, les <strong>tribunaux de Liège (Belgique)</strong> seront seuls compétents pour connaître de tout litige relatif à l'interprétation ou à l'exécution des présentes CGV.</p>

                                <h3 className={styles.subsectionTitle}>Droit applicable</h3>
                                <p>Les présentes CGV sont régies par le <strong>droit belge</strong>.</p>
                            </section>

                            {/* Dispositions finales */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Dispositions finales</h2>

                                <h3 className={styles.subsectionTitle}>Évolution des CGV</h3>
                                <p>SMIDJAN se réserve le droit de modifier les présentes CGV. Les nouvelles conditions s'appliqueront aux contrats conclus postérieurement à leur publication.</p>

                                <h3 className={styles.subsectionTitle}>Nullité partielle</h3>
                                <p>Si une clause des présentes CGV est déclarée nulle ou inapplicable, les autres clauses conservent leur pleine validité.</p>

                                <h3 className={styles.subsectionTitle}>Conservation</h3>
                                <p>Les présentes CGV annulent et remplacent toutes conditions antérieures. Elles sont consultables sur le site internet de SMIDJAN.</p>
                            </section>

                            {/* Contact */}
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Contact</h2>
                                <p>Pour toute question relative aux présentes Conditions Générales de Vente :</p>
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
