import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import "../styles/cv-center.css";
import { profile } from "@/data/profile";
export const metadata: Metadata = {
  metadataBase: new URL("https://marcus-journey.vercel.app"),
  title: {
    default: "Marcus Journey — Production to Digital Innovation",
    template: "%s | Marcus Tran",
  },
  description:
    "Marcus Tran — Production, Kaizen and Technology. An interactive journey from the factory floor to digital innovation.",
  openGraph: {
    title: "Marcus Journey",
    description: "Build. Improve. Automate.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Marcus Journey",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${profile.legalName} (${profile.preferredName})`,
  url: "https://marcus-journey.vercel.app",
  email: `mailto:${profile.email}`,
  telephone: profile.phoneDisplay,
  address: { "@type": "PostalAddress", addressLocality: "Hải Phòng", addressCountry: "VN" },
  sameAs: [profile.github],
  jobTitle: "Software Developer and Technology Instructor",
  knowsAbout: [
    "Production Management",
    "Kaizen",
    "Quality Management",
    "Java",
    "Spring Boot",
    "Vue.js",
    "Software Engineering",
    "Artificial Intelligence in Education",
    "Smart Factory",
  ],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
