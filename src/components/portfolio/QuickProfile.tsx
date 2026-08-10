"use client";
import { copy } from "@/data/i18n";
import { useJourneyStore } from "@/stores/journeyStore";
import { profile } from "@/data/profile";
import CvCenter from "@/components/portfolio/CvCenter";
import { useState } from "react";
export default function QuickProfile({ onClose }: { onClose: () => void }) {
  const [cvOpen, setCvOpen] = useState(false);
  const language = useJourneyStore((s) => s.language),
    t = copy[language];
  return (
    <section className="quick-profile" aria-label="Marcus Tran quick profile">
      <header>
        <div>
          <span className="kicker">{t.quick}</span>
          <h2>
            {t.profileTitle.split("\n").map((x, i) => (
              <span key={x}>
                {x}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
        </div>
        <button onClick={onClose} aria-label="Close quick profile">
          {t.close} ×
        </button>
      </header>
      <div className="profile-intro">
        <p>
          {t.promise.split("\n").map((x) => (
            <span key={x}>
              {x}
              <br />
            </span>
          ))}
        </p>
        <div>
          <strong>
            {profile.legalName.toUpperCase()} · {profile.preferredName}
          </strong>
          <span>{t.tagline}</span>
          <a href={`mailto:${profile.email}`}>{profile.email} ↗</a>
          <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
          <span>{profile.location}</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <button className="profile-cv-button" onClick={() => setCvOpen(true)}>
            {t.cv} ↗
          </button>
        </div>
      </div>
      {cvOpen && <CvCenter language={language} onClose={() => setCvOpen(false)} />}
    </section>
  );
}
