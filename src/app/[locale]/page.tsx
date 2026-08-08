import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JourneyApp from "@/components/journey/JourneyApp";
import ServerProfile from "@/components/portfolio/ServerProfile";
import { isLanguage, languages, localeMetadata } from "@/data/locales";

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

type LocalePageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLanguage(locale)) return {};
  const content = localeMetadata[locale];
  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { vi: "/vi", en: "/en", "zh-CN": "/zh" },
    },
    openGraph: { title: content.title, description: content.description, locale },
  };
}

export default async function LocalizedHome({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLanguage(locale)) notFound();
  return (
    <main>
      <JourneyApp initialLanguage={locale} />
      <ServerProfile language={locale} />
    </main>
  );
}
