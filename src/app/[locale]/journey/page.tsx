import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JourneyApp from "@/components/journey/JourneyApp";
import { isLanguage, languages, localeMetadata } from "@/data/locales";

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

type JourneyPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: JourneyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLanguage(locale)) return {};
  const content = localeMetadata[locale];
  return {
    title: locale === "vi" ? "Hành trình 3D" : locale === "zh" ? "3D职业历程" : "3D Journey",
    description: content.description,
    alternates: {
      canonical: `/${locale}/journey`,
      languages: {
        vi: "/vi/journey",
        en: "/en/journey",
        "zh-CN": "/zh/journey",
      },
    },
  };
}

export default async function LocalizedJourney({ params }: JourneyPageProps) {
  const { locale } = await params;
  if (!isLanguage(locale)) notFound();
  return (
    <main>
      <JourneyApp initialLanguage={locale} journeyMode />
    </main>
  );
}
