"use client";
import { copy, getMilestones } from "@/data/i18n";
import { useJourneyStore } from "@/stores/journeyStore";
export default function QuickProfile({ onClose }: { onClose: () => void }) {
  const language = useJourneyStore((s) => s.language),
    t = copy[language],
    items = getMilestones(language);
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
          <strong>MARCUS TRAN</strong>
          <span>{t.tagline}</span>
          <a href="mailto:marcus.tran2202@gmail.com">marcus.tran2202@gmail.com ↗</a>
        </div>
      </div>
      <div className="profile-grid">
        {items.map((m, i) => (
          <article key={m.id}>
            <span>
              {String(i + 1).padStart(2, "0")} / {m.period}
            </span>
            <h3>{m.title}</h3>
            <strong>{m.role}</strong>
            <p>{m.summary}</p>
            <ul>
              {m.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
