import type { Metadata } from 'next';
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from 'next-intl/server';

import OptimizedImage from '@/components/ui/OptimizedImage/OptimizedImage';
import { Reveal } from '@/components/ui/Reveal/Reveal';
import { ContactForm } from './ContactForm';
import cls from './page.module.css';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates(locale, "/contact"),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: 'https://smidjan.be/contact',
      images: [
        {
          url: 'https://smidjan.be/og/contact-og.webp',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/og/contact-og.webp'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      {/* JSON-LD: ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact · Smidjan',
            url: 'https://smidjan.be/contact',
            about: {
              '@type': 'Organization',
              name: 'Smidjan',
              url: 'https://smidjan.be',
              email: 'smidjan.agency@outlook.com',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Liège',
                addressRegion: 'Wallonie',
                addressCountry: 'BE',
              },
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              telephone: '+32475205562',
              email: 'smidjan.agency@outlook.com',
              availableLanguage: ['fr-BE', 'fr'],
              areaServed: ['BE', 'Wallonie'],
            },
          }),
        }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://smidjan.be' },
              { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://smidjan.be/contact' },
            ],
          }),
        }}
      />

      {/* ===== Page header band ===== */}
      <div className={cls.pageHead}>
        <div className={`wrap ${cls.pageHeadInner}`}>
          <Reveal as="div" className={cls.pageHeadText}>
            <nav className={cls.crumbs} aria-label={t('hero.crumbAria')}>
              <a href="/">{t('hero.crumbHome')}</a>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span>{t('hero.crumbContact')}</span>
            </nav>
            <span className={cls.eyebrow}>{t('hero.eyebrow')}</span>
            <h1>
              {t.rich('hero.title', { accent: (c) => <span className={cls.accent}>{c}</span> })}
            </h1>
            <p className={cls.directPromise}>
              {t.rich('hero.directPromise', { strong: (c) => <strong>{c}</strong> })}
            </p>
            <p className={cls.lead}>
              {t('hero.lead')}
            </p>
            <div className={cls.heroCtas}>
              <a href="#form" className={cls.ctaPrimary}>
                {t('hero.ctaPrimary')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a href="tel:+32475205562" className={cls.ctaPhone}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
                </svg>
                +32 475 20 55 62
              </a>
            </div>
            <div className={cls.headAssure}>
              <div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                {t('hero.assure1')}
              </div>
              <div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                {t('hero.assure2')}
              </div>
              <div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                {t('hero.assure3')}
              </div>
            </div>
          </Reveal>
          <div className={cls.pageHeadMedia}>
            <OptimizedImage
              src="/images/pages/contact/office-team.jpg"
              alt={t('hero.imageAlt')}
              width={640}
              height={430}
              sizePreset="hero"
              aspectRatio="landscape"
              className={cls.pageHeadImg}
              priority
            />
          </div>
        </div>
      </div>

      {/* ===== Contact (form + coordinates) ===== */}
      <section className={cls.contact} id="form">
        <div className="wrap">
          <div className={cls.contactGrid}>
            {/* LEFT: secured form (primary action) */}
            <div className={cls.formPrimary}>
              <span className={cls.formBadge}>{t('form.badge')}</span>
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            {/* RIGHT: coordinates */}
            <aside className={cls.side} aria-label={t('side.aria')}>
              {/* Emergency block */}
              <div id="urgence" style={{ scrollMarginTop: '90px' }}>
              <Reveal className={cls.emergBlock}>
                <div className={`${cls.gridBg} grid-bg`} aria-hidden="true" />
                <div className={cls.ebPhoto}>
                  <OptimizedImage
                    src="/images/pages/contact/incident-response.jpg"
                    alt={t('side.incidentImageAlt')}
                    width={520}
                    height={230}
                    sizePreset="card"
                    aspectRatio="landscape"
                    className={cls.ebPhotoImg}
                  />
                </div>
                <div className={cls.ebTop}>
                  <div className={cls.ebIc}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                      <path d="M12 9v4M12 16h.01" />
                    </svg>
                  </div>
                  <div>
                    <span className={cls.ebBadge}><span className={cls.dot} />{t('side.incidentBadge')}</span>
                    <h3>{t.rich('side.incidentTitle', { accent: (c) => <span className="accentOnDark">{c}</span> })}</h3>
                  </div>
                </div>
                <p>
                  {t('side.incidentText')}
                </p>
                <a className={cls.ebTel} href="tel:+32475205562">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
                  +32 475 20 55 62
                </a>
                <div className={cls.ebNote}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  {t('side.incidentNote')}
                </div>
              </Reveal>
              </div>

              {/* Process mini-diagram */}
              <Reveal as="div" className={cls.infoCard}>
                <h3>
                  <span className={cls.hi}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="9" /></svg>
                  </span>
                  {t('side.processTitle')}
                </h3>
                <div
                  className={cls.processStrip}
                  role="img"
                  aria-label={t('side.processAria')}
                >
                  <div className={cls.pStep} aria-hidden="true">
                    <span className={cls.pIc}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    </span>
                    <span className={cls.pLbl}>{t('side.processStep1')}</span>
                  </div>
                  <span className={cls.pArrow} aria-hidden="true">
                    <svg viewBox="0 0 40 12" fill="none"><path d="M0 6h32" stroke="currentColor" strokeWidth={1.6} strokeDasharray="1 5" strokeLinecap="round" /><path d="M28 1.5 36 6l-8 4.5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div className={cls.pStep} aria-hidden="true">
                    <span className={cls.pIc}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                    </span>
                    <span className={cls.pLbl}>{t('side.processStep2')}</span>
                  </div>
                  <span className={cls.pArrow} aria-hidden="true">
                    <svg viewBox="0 0 40 12" fill="none"><path d="M0 6h32" stroke="currentColor" strokeWidth={1.6} strokeDasharray="1 5" strokeLinecap="round" /><path d="M28 1.5 36 6l-8 4.5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div className={cls.pStep} aria-hidden="true">
                    <span className={cls.pIc}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>
                    </span>
                    <span className={cls.pLbl}>{t('side.processStep3')}</span>
                  </div>
                </div>
              </Reveal>

              {/* Contact details */}
              <Reveal as="div" className={cls.infoCard}>
                <div className={cls.coordPhoto}>
                  <OptimizedImage
                    src="/images/pages/contact/support-desk.jpg"
                    alt={t('side.coordImageAlt')}
                    width={480}
                    height={230}
                    sizePreset="card"
                    aspectRatio="landscape"
                    className={cls.coordPhotoImg}
                  />
                  <span className={cls.coordPhotoTag}>{t('side.coordTag')}</span>
                </div>
                <h3>
                  <span className={cls.hi}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  </span>
                  {t('side.coordTitle')}
                </h3>
                <Reveal stagger as="ul" className={cls.coord}>
                  <li>
                    <span className={cls.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg></span>
                    <div>
                      <div className={cls.k}>{t('side.coordZoneK')}</div>
                      <div className={cls.v}>{t('side.coordZoneV')}<small>{t('side.coordZoneSmall')}</small></div>
                    </div>
                  </li>
                  <li className={cls.coordPrimary}>
                    <span className={cls.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg></span>
                    <div>
                      <div className={cls.k}>{t('side.coordPhoneK')}</div>
                      <div className={cls.v}><a className={cls.telLink} href="tel:+32475205562">+32 475 20 55 62</a><small>{t('side.coordPhoneSmall')}</small></div>
                    </div>
                  </li>
                  <li>
                    <span className={cls.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg></span>
                    <div>
                      <div className={cls.k}>{t('side.coordEmailK')}</div>
                      <div className={cls.v}><a href="mailto:smidjan.agency@outlook.com">smidjan.agency@outlook.com</a><small>{t('side.coordEmailSmall')}</small></div>
                    </div>
                  </li>
                  <li>
                    <span className={cls.ic}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>
                    <div>
                      <div className={cls.k}>{t('side.coordHoursK')}</div>
                      <div className={cls.v}>{t('side.coordHoursV')}<small>{t('side.coordHoursSmall')}</small></div>
                    </div>
                  </li>
                </Reveal>
              </Reveal>

              {/* Stylised map */}
              <div className={cls.mapCard}>
                <div className={cls.mapCanvas} role="img" aria-label={t('side.mapAria')}>
                  <svg className={cls.base} viewBox="0 0 400 210" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <rect width="400" height="210" fill="#eef2f7" />
                    <path d="M-10 40 C 80 70, 120 120, 200 130 S 340 190, 420 160" fill="none" stroke="#c9d8ee" strokeWidth="16" strokeLinecap="round" />
                    <rect x="40" y="30" width="70" height="46" rx="6" fill="#e2ebe1" />
                    <rect x="300" y="20" width="66" height="54" rx="6" fill="#e2ebe1" />
                    <g stroke="#d3dae6" strokeWidth="6" strokeLinecap="round">
                      <path d="M0 90 H400" />
                      <path d="M130 -10 V220" />
                      <path d="M270 -10 V220" />
                      <path d="M-10 150 H410" />
                    </g>
                    <g stroke="#e2e7ef" strokeWidth="3" strokeLinecap="round">
                      <path d="M60 -10 V220" />
                      <path d="M340 -10 V220" />
                      <path d="M0 50 H400" />
                    </g>
                    <g fill="#dbe3ee">
                      <rect x="150" y="100" width="42" height="34" rx="4" />
                      <rect x="205" y="100" width="34" height="34" rx="4" />
                      <rect x="150" y="160" width="34" height="34" rx="4" />
                      <rect x="205" y="160" width="42" height="34" rx="4" />
                      <rect x="285" y="100" width="40" height="34" rx="4" />
                    </g>
                    <path d="M52 175 C 100 158, 150 168, 197 112" fill="none" stroke="#ff6a00" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" opacity=".55" />
                    <circle cx="52" cy="175" r="4.5" fill="#1c3a63" />
                  </svg>
                  <div className={cls.mapCompass} aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.4" opacity=".55" />
                      <path d="M16 4v5M16 23v5M4 16h5M23 16h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".55" />
                      <path d="M16 7l3.6 9-3.6-2.4-3.6 2.4Z" fill="#0b1f3a" />
                      <path d="M16 7l3.6 9-3.6-2.4Z" fill="#ff6a00" />
                    </svg>
                  </div>
                  <div className={cls.mapPulse} aria-hidden="true">
                    <svg viewBox="0 0 58 58"><circle cx="29" cy="29" r="21" /><circle cx="29" cy="29" r="21" /></svg>
                  </div>
                  <div className={cls.mapPin}>
                    <span className={cls.badge}>{t('side.mapBadge')}</span>
                    <span className={cls.drop}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg></span>
                  </div>
                </div>
                <div className={cls.mapFoot}>
                  <span className={cls.addr}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>{t('side.mapAddr')}</span>
                  <a className={cls.linkMore} href="https://www.google.com/maps/search/?api=1&query=Li%C3%A8ge+Belgique" target="_blank" rel="noopener noreferrer">
                    {t('side.mapMore')} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== À quoi s'attendre ===== */}
      <section className={cls.expect}>
        <div className="wrap">
          <div className={cls.secHead}>
            <span className={cls.eyebrow}>{t('expect.eyebrow')}</span>
            <h2>{t.rich('expect.title', { accent: (c) => <span className="accent">{c}</span> })}</h2>
            <p>{t('expect.intro')}</p>
          </div>
          <div className={cls.steps}>
            <div className={cls.step}>
              <div className={cls.num}>1</div>
              <h3>{t('expect.step1Title')}</h3>
              <p>{t('expect.step1Text')}</p>
            </div>
            <div className={cls.step}>
              <div className={cls.num}>2</div>
              <h3>{t('expect.step2Title')}</h3>
              <p>{t('expect.step2Text')}</p>
            </div>
            <div className={cls.step}>
              <div className={cls.num}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>
              </div>
              <h3>{t('expect.step3Title')}</h3>
              <p>{t('expect.step3Text')}</p>
            </div>
          </div>
          <div className={cls.expectNote}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /></svg>
            <span>{t.rich('expect.note', { b: (c) => <b>{c}</b> })}</span>
          </div>
        </div>
      </section>
    </>
  );
}
