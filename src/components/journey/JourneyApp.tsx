"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { milestones } from "@/data/milestones";
import { copy, getMilestones } from "@/data/i18n";
import { useJourneyStore } from "@/stores/journeyStore";
import QuickProfile from "@/components/portfolio/QuickProfile";
import { clamp } from "@/lib/utils";
const Experience = dynamic(() => import("@/components/world/Experience"), {
  ssr: false,
  loading: () => <div className="scene-loading">LOADING 3D WORLD…</div>,
});
export default function JourneyApp() {
  const [quick, setQuick] = useState(false);
  const [reduced, setReduced] = useState(false);
  const {
    progress,
    currentMilestone,
    started,
    language,
    quality,
    soundEnabled,
    start,
    setProgress,
    setCurrentMilestone,
    setLanguage,
    toggleQuality,
    toggleSound,
  } = useJourneyStore();
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      if (!started) return;
      const track = document.getElementById("journey-track");
      if (!track) return;
      const startAt = innerHeight * 0.86;
      const finishAt = track.offsetTop + track.offsetHeight - innerHeight * 1.25;
      const p = clamp((scrollY - startAt) / Math.max(finishAt - startAt, 1));
      setProgress(p);
      const next = Math.min(milestones.length - 1, Math.floor(p * milestones.length));
      setCurrentMilestone(p < 0.035 ? -1 : next);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, [started, setProgress, setCurrentMilestone]);
  const t = copy[language],
    items = getMilestones(language),
    active = currentMilestone >= 0 ? items[currentMilestone] : null;
  const begin = () => {
    start();
    requestAnimationFrame(() =>
      scrollTo({
        top: innerHeight * 0.86,
        behavior: reduced ? "auto" : "smooth",
      }),
    );
  };
  if (quick)
    return (
      <>
        <QuickProfile onClose={() => setQuick(false)} />
        <button className="floating-return" onClick={() => setQuick(false)}>
          3D JOURNEY ↗
        </button>
      </>
    );
  return (
    <div className={`journey-shell ${started ? "is-started" : ""}`}>
      <Experience />
      <header className="topbar">
        <a className="logo" href="#garage">
          <b>M</b>
          <span>
            MARCUS <i>JOURNEY</i>
          </span>
        </a>
        <nav aria-label="Utility navigation">
          <button onClick={() => setQuick(true)}>{t.quick}</button>
          <a href="#projects">{t.projects}</a>
          <a href="/cv/marcus-tran-cv.pdf" download>
            {t.cv}
          </a>
        </nav>
        <div className="controls">
          <button onClick={toggleSound} aria-label="Toggle sound">
            {t.sound} {soundEnabled ? "ON" : "OFF"}
          </button>
          <button onClick={toggleQuality}>
            {t.quality} {quality.toUpperCase()}
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "vi" | "en" | "zh")}
            aria-label="Language"
          >
            <option value="vi">VI</option>
            <option value="en">EN</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </header>
      <section id="garage" className="garage">
        <div className="garage-lines" />
        <div className="hero-copy">
          <span className="kicker">{t.tagline}</span>
          <h1>
            MARCUS
            <br />
            <i>JOURNEY</i>
          </h1>
          <p>
            {t.subtitle.split("\n").map((x) => (
              <span key={x}>
                {x}
                <br />
              </span>
            ))}
          </p>
          <div className="hero-actions">
            <button className="main-cta" onClick={begin}>
              {t.start} <b>→</b>
            </button>
            <button onClick={() => setQuick(true)}>{t.quick}</button>
          </div>
        </div>
        <div className="build-line">
          BUILD. <span>IMPROVE.</span> AUTOMATE.
        </div>
        <div className="scroll-cue">
          {t.scroll} <b>↓</b>
        </div>
      </section>
      {started && (
        <>
          <aside className="progress-ui">
            <div className="progress-track">
              <span style={{ height: `${progress * 100}%` }} />
            </div>
            <div>
              <small>{t.journey}</small>
              <strong>{String(Math.round(progress * 100)).padStart(2, "0")}%</strong>
            </div>
          </aside>
          <div className="mode-switch">
            <button className="active">{t.auto}</button>
            <button disabled title="Coming soon">
              {t.drive}
            </button>
          </div>
          {active && (
            <aside
              key={active.id}
              className="milestone-panel"
              style={{ "--accent": active.accent } as React.CSSProperties}
            >
              <span className="panel-index">
                {String(currentMilestone + 1).padStart(2, "0")} /{" "}
                {String(milestones.length).padStart(2, "0")}
              </span>
              <span className="kicker">{active.period}</span>
              <h2>{active.title}</h2>
              <h3>{active.role}</h3>
              <p>{active.summary}</p>
              <ul>
                {active.highlights.slice(0, 3).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="upgrade">
                {t.unlocked} <b>{active.upgrade}</b>
              </div>
            </aside>
          )}
        </>
      )}
      <div id="journey-track" className="scroll-space" aria-hidden="true" />
      <section id="projects" className="final-cta">
        <span className="kicker">{t.destination}</span>
        <h2>
          {t.finalTitle.split("\n").map((x, i) => (
            <span key={x}>
              {i === 1 ? <i>{x}</i> : x}
              {i === 0 && <br />}
            </span>
          ))}
        </h2>
        <p>
          {t.promise.split("\n").map((x) => (
            <span key={x}>
              {x}
              <br />
            </span>
          ))}
        </p>
        <div>
          <a href="/cv/marcus-tran-cv.pdf">{t.cv} ↗</a>
          <button onClick={() => setQuick(true)}>{t.projects} ↗</button>
          <a href="mailto:marcus.tran2202@gmail.com">{t.contact} ↗</a>
          <a href="https://github.com/MarcusTr98" target="_blank" rel="noreferrer">
            {t.github} ↗
          </a>
        </div>
      </section>
    </div>
  );
}
