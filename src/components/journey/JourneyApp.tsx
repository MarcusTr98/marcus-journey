"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { milestones } from "@/data/milestones";
import { copy, getMilestones } from "@/data/i18n";
import { useJourneyStore } from "@/stores/journeyStore";
import QuickProfile from "@/components/portfolio/QuickProfile";
import CvCenter from "@/components/portfolio/CvCenter";
import { profile } from "@/data/profile";
import { getStageLabel, stageOrder } from "@/data/stages";
import { useRouter } from "next/navigation";
import type { Language } from "@/types";
import { useJourneyNavigation } from "@/hooks/useJourneyNavigation";
import JourneyAlbum from "@/components/journey/JourneyAlbum";
import { minorLearningCurveProgress } from "@/components/world/Road";
import type { Milestone } from "@/types";
const Experience = dynamic(() => import("@/components/world/Experience"), {
  ssr: false,
  loading: () => <div className="scene-loading">LOADING 3D WORLD…</div>,
});
const ACTION_LABEL = {
  vi: "XEM CASE STUDY",
  en: "VIEW CASE STUDY",
  zh: "查看案例",
};
const SOURCE_LABEL = {
  vi: "XEM SOURCE CODE",
  en: "VIEW SOURCE CODE",
  zh: "查看源代码",
};
const IT_CLUB_MILESTONE: Record<Language, Milestone> = {
  vi: {
    id: "it-club",
    shortTitle: "MỐC LÃNH ĐẠO CỘNG ĐỒNG",
    title: "Chủ nhiệm CLB IT · Cộng đồng Công nghệ",
    period: "2024 — 09/2026",
    role: "ĐIỀU HÀNH CLB · TỔ CHỨC SỰ KIỆN · ĐÀO TẠO AI",
    summary:
      "Dẫn dắt hoạt động CLB IT, xây dựng kế hoạch và điều phối workshop, sự kiện cùng các dự án thực hành. Đồng thời hỗ trợ cộng đồng tiếp cận AI an toàn, hiệu quả và huấn luyện giáo viên ứng dụng AI có kiểm soát vào giáo án, bài tập và học liệu.",
    highlights: [
      "Điều hành CLB, phân công đội ngũ và duy trì chương trình hoạt động",
      "Tổ chức workshop, sự kiện công nghệ và mentoring dự án thực tế",
      "Hỗ trợ cộng đồng tiếp cận, sử dụng AI an toàn và hiệu quả",
      "Training giáo viên ứng dụng AI vào giảng dạy và thiết kế học liệu",
    ],
    accent: "#8b5cf6",
    position: [0, 0, 0],
    upgrade: "Lãnh đạo cộng đồng · Tổ chức sự kiện · AI Enablement · Teacher Training",
    stage: "transformation",
    projectLinks: [],
  },
  en: {
    id: "it-club",
    shortTitle: "COMMUNITY LEADERSHIP CHECKPOINT",
    title: "IT Club Chairman · Technology Community",
    period: "2024 — 09/2026",
    role: "CLUB OPERATIONS · EVENTS · AI TRAINING",
    summary:
      "Led IT Club operations, planned and coordinated workshops, events and hands-on projects. Also supported responsible AI adoption in the community and trained teachers to use AI with human oversight for lesson plans, assignments and learning materials.",
    highlights: [
      "Led the club team, delegated responsibilities and maintained its activity program",
      "Organized technology workshops and events while mentoring practical projects",
      "Helped the community adopt AI safely and effectively",
      "Trained teachers to apply AI in instruction and learning-content design",
    ],
    accent: "#8b5cf6",
    position: [0, 0, 0],
    upgrade: "Community Leadership · Event Operations · AI Enablement · Teacher Training",
    stage: "transformation",
    projectLinks: [],
  },
  zh: {
    id: "it-club",
    shortTitle: "社区领导力节点",
    title: "IT俱乐部负责人 · 科技社区",
    period: "2024 — 09/2026",
    role: "俱乐部运营 · 活动组织 · AI培训",
    summary:
      "负责IT俱乐部运营，策划并统筹技术工作坊、社群活动和实践项目；同时推动社区安全、高效地使用AI，并培训教师在人类监督下将AI应用于教案、作业与学习材料设计。",
    highlights: [
      "统筹俱乐部团队、任务分工与持续活动计划",
      "组织技术工作坊与活动，并指导实践项目",
      "帮助社区安全、有效地使用AI工具",
      "培训教师将AI应用于教学与学习材料设计",
    ],
    accent: "#8b5cf6",
    position: [0, 0, 0],
    upgrade: "社区领导力 · 活动运营 · AI赋能 · 教师培训",
    stage: "transformation",
    projectLinks: [],
  },
};
export default function JourneyApp({ initialLanguage }: { initialLanguage: Language }) {
  const router = useRouter();
  const [quick, setQuick] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [albumOpen, setAlbumOpen] = useState(false);
  const { begin, goToMilestone } = useJourneyNavigation();
  const {
    vehicleProgress,
    currentMilestone,
    started,
    language,
    soundEnabled,
    sceneReady,
    visitedMilestones,
    setLanguage,
    toggleSound,
  } = useJourneyStore();
  useEffect(() => {
    void Promise.resolve(useJourneyStore.persist.rehydrate()).then(() => {
      setLanguage(initialLanguage);
    });
    document.documentElement.lang = initialLanguage === "zh" ? "zh-CN" : initialLanguage;
  }, [initialLanguage, setLanguage]);
  const isItClubCheckpoint =
    started && Math.abs(vehicleProgress - minorLearningCurveProgress) < 0.004;
  const t = copy[language],
    items = getMilestones(language),
    active = isItClubCheckpoint
      ? IT_CLUB_MILESTONE[language]
      : currentMilestone >= 0
        ? items[currentMilestone]
        : null,
    activeStageItems = active ? items.filter(({ stage }) => stage === active.stage) : [],
    activeStageStop = isItClubCheckpoint
      ? 2
      : active
        ? activeStageItems.findIndex(({ id }) => id === active.id) + 1
        : 0;
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
          <a href="#case-studies">{t.projects}</a>
          <button onClick={() => setCvOpen(true)}>{t.cv}</button>
        </nav>
        <div className="controls">
          <button onClick={toggleSound} aria-label="Toggle sound">
            {t.sound} {soundEnabled ? "ON" : "OFF"}
          </button>
          <select
            value={language}
            onChange={(e) => {
              const nextLanguage = e.target.value as Language;
              setLanguage(nextLanguage);
              router.push(`/${nextLanguage}${location.hash}`);
            }}
            aria-label="Language"
          >
            <option value="vi">🇻🇳 VI</option>
            <option value="en">🇬🇧 EN</option>
            <option value="zh">🇨🇳 中文</option>
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
            <button className="main-cta" onClick={begin} disabled={!sceneReady}>
              {sceneReady ? t.start : "LOADING 3D…"} <b>{sceneReady ? "→" : "·"}</b>
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
      {started && vehicleProgress < 0.985 && (
        <>
          <JourneyAlbum
            language={language}
            items={items}
            visited={visitedMilestones}
            open={albumOpen}
            onOpen={() => setAlbumOpen(true)}
            onClose={() => setAlbumOpen(false)}
            onNavigate={goToMilestone}
            triggerSide={
              currentMilestone >= 0 &&
              (items[currentMilestone].id === "graduation" || currentMilestone % 2 === 0)
                ? "left"
                : "right"
            }
          />
          <aside className="progress-ui">
            <div className="progress-track">
              <span style={{ height: `${vehicleProgress * 100}%` }} />
            </div>
            <div>
              <small>{t.journey}</small>
              <strong>{String(Math.round(vehicleProgress * 100)).padStart(2, "0")}%</strong>
            </div>
          </aside>
          <nav className="milestone-dots" aria-label="Journey milestones">
            {stageOrder.map((stage, stageIndex) => (
              <div className="dot-stage" key={stage}>
                <em>
                  {stageIndex + 1}. {getStageLabel(language, stage)}
                </em>
                <div>
                  {items.map((item, index) =>
                    item.stage === stage ? (
                      <button
                        key={item.id}
                        className={index === currentMilestone ? "is-active" : ""}
                        style={{ "--dot": item.accent } as React.CSSProperties}
                        onClick={() => goToMilestone(index)}
                        aria-label={`${index + 1}. ${item.title}`}
                        title={`${index + 1}. ${item.title}`}
                      >
                        <span />
                        <small>{String(index + 1).padStart(2, "0")}</small>
                      </button>
                    ) : null,
                  )}
                </div>
              </div>
            ))}
          </nav>
          {active && (
            <aside
              key={active.id}
              className={`milestone-panel ${active.id !== "graduation" && currentMilestone % 2 === 1 ? "is-left" : "is-right"}`}
              style={{ "--accent": active.accent } as React.CSSProperties}
            >
              <div className="stage-context">
                {String(stageOrder.indexOf(active.stage) + 1).padStart(2, "0")}/
                {String(stageOrder.length).padStart(2, "0")} ·{" "}
                {getStageLabel(language, active.stage)}
                <span>
                  {activeStageStop}/{activeStageItems.length}
                </span>
              </div>
              <span className="panel-index">
                {isItClubCheckpoint ? "03A" : String(currentMilestone + 1).padStart(2, "0")} /{" "}
                {String(milestones.length).padStart(2, "0")}
              </span>
              <span className="chapter-title">{active.shortTitle}</span>
              <span className="kicker">{active.period}</span>
              <h2>{active.title}</h2>
              <h3>{active.role}</h3>
              <p>{active.summary}</p>
              <ul>
                {active.highlights.slice(0, 4).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <div className="upgrade">
                {t.unlocked} <b>{active.upgrade}</b>
              </div>
              {(
                active.projectLinks ??
                (active.projectUrl
                  ? [{ label: SOURCE_LABEL[language], url: active.projectUrl }]
                  : [{ label: ACTION_LABEL[language], url: "#case-studies" }])
              ).map((link) => (
                <a
                  key={link.url}
                  className="milestone-cta"
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={link.url.startsWith("http") ? "noreferrer" : undefined}
                >
                  {link.label} ↗
                </a>
              ))}
            </aside>
          )}
        </>
      )}
      <div id="journey-track" className="scroll-space" aria-hidden="true" />
      <section id="projects" className={`final-cta ${vehicleProgress < 0.985 ? "is-waiting" : ""}`}>
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
          <button onClick={() => setCvOpen(true)}>{t.cv} ↗</button>
          <button onClick={() => setQuick(true)}>{t.projects} ↗</button>
          <a href={`mailto:${profile.email}`}>{t.contact} ↗</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            {t.github} ↗
          </a>
        </div>
      </section>
      {cvOpen && <CvCenter language={language} onClose={() => setCvOpen(false)} />}
    </div>
  );
}
