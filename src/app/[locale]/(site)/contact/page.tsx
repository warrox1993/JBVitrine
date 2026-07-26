import type { Metadata } from 'next';
import { contact, siteUrl } from "@/config/site";
import { headers } from 'next/headers';
import { buildAlternates } from "@/i18n/metadata";
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Reveal } from '@/components/ui/Reveal/Reveal';
import { CopyButton } from '@/components/ui/CopyButton/CopyButton';
import { Link } from '@/i18n/navigation';
import { ContactForm } from './ContactForm';
import cls from './page.module.css';
import { jsonLdSafe } from "@/lib/security/escape";

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
      url: `${siteUrl}/contact`,
      images: [
        {
          url: `${siteUrl}/og/contact-og.webp`,
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
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return (
    <>
      {/* JSON-LD: ContactPage */}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: jsonLdSafe({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact · Smidjan',
            url: `${siteUrl}/contact`,
            about: {
              '@type': 'Organization',
              name: 'Smidjan',
              url: siteUrl,
              email: contact.email,
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Wallonie',
                addressCountry: 'BE',
              },
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              telephone: contact.phone,
              email: contact.email,
              availableLanguage: ['fr-BE', 'fr'],
              areaServed: ['BE', 'Wallonie'],
            },
          }),
        }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: jsonLdSafe({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
            ],
          }),
        }}
      />

      {/* ===== Page header band ===== */}
      <div className={cls.pageHead}>
        <div className={`wrap ${cls.pageHeadInner}`}>
          <Reveal as="div" className={cls.pageHeadText}>
            <nav className={cls.crumbs} aria-label={t('hero.crumbAria')}>
              <Link href="/">{t('hero.crumbHome')}</Link>
              <span aria-hidden="true">·</span>
              <span>{t('hero.crumbContact')}</span>
            </nav>
            <span className={cls.eyebrow}>{t('hero.eyebrow')}</span>
            <h1>{t.rich('hero.title', { accent: (c) => <span className={cls.accent}>{c}</span> })}</h1>
            <p className={cls.lead}>{t('hero.lead')}</p>
          </Reveal>
        </div>
      </div>

      {/* ===== Contact (form + coordinates) ===== */}
      <section className={cls.contact} id="form">
        <div className="wrap">
          <div className={cls.contactGrid}>
            <div className={cls.formPrimary}>
              <span className={cls.formBadge}>{t('form.badge')}</span>
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            <aside className={cls.side} aria-label={t('side.aria')}>
              <Reveal as="div" className={cls.infoCard}>
                <h2 className={cls.coordTitle}>{t('side.coordTitle')}</h2>
                <ul className={cls.coord}>
                  <li>
                    <span className={cls.k}>{t('side.coordEmailK')}</span>
                    <span className={cls.coordValue}>
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      <CopyButton
                        value={contact.email}
                        copyLabel={t('side.copyEmail')}
                        copiedLabel={t('side.copied')}
                      />
                    </span>
                  </li>
                  <li>
                    <span className={cls.k}>{t('side.coordPhoneK')}</span>
                    <span className={cls.coordValue}>
                      <a href={contact.phoneHref}>{contact.phoneLabel}</a>
                      <CopyButton
                        value={contact.phoneLabel}
                        copyLabel={t('side.copyPhone')}
                        copiedLabel={t('side.copied')}
                      />
                    </span>
                  </li>
                  <li>
                    <span className={cls.k}>{t('side.coordZoneK')}</span>
                    <span>{t('side.coordZoneV')}</span>
                  </li>
                  <li>
                    <span className={cls.k}>{t('side.coordHoursK')}</span>
                    <span>{t('side.coordHoursV')}</span>
                  </li>
                </ul>
                <div className={cls.profiles}>
                  <a href="https://www.linkedin.com/in/jean-baptistedhondt" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://github.com/warrox1993" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </Reveal>
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
