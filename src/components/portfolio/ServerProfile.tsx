import { getMilestones } from "@/data/i18n";
import { cvByLanguage, profile } from "@/data/profile";
import type { Language } from "@/types";

const archiveCopy = {
  vi: {
    kicker: "KINH NGHIỆM & DỰ ÁN TIÊU BIỂU",
    title: "Cải tiến tại hiện trường.\nChuyển hóa thành kết quả.",
    intro:
      "Bảy năm kinh nghiệm sản xuất và chất lượng, tiếp nối bằng phát triển phần mềm, đào tạo và số hóa quy trình.",
    englishCv: "English CV",
    chineseCv: "中文简历",
    download: "Tải PDF",
    source: "Mã nguồn GitHub",
  },
  en: {
    kicker: "SELECTED EXPERIENCE & PROJECTS",
    title: "Improve the process.\nMake the result last.",
    intro:
      "Seven years in manufacturing and quality, followed by work in software, training and process digitization.",
    englishCv: "English CV",
    chineseCv: "Chinese CV",
    download: "Download PDF",
    source: "GitHub source",
  },
  zh: {
    kicker: "精选经历与项目",
    title: "改善现场流程。\n让成果持续可见。",
    intro: "七年制造与质量经验，随后投入软件开发、培训和流程数字化。",
    englishCv: "English CV",
    chineseCv: "中文简历",
    download: "下载PDF",
    source: "GitHub源代码",
  },
} as const;

const trainToRoleLink = {
  vi: {
    label: "DỰ ÁN KAIZEN · 2019–2020",
    title: "Train-to-Role — Chuẩn hóa đào tạo theo vị trí",
    summary: "Giảm 53% thời lượng đào tạo tập trung và 80% thời lượng thực hành tại chuyền.",
    action: "Xem case study",
  },
  en: {
    label: "KAIZEN PROJECT · 2019–2020",
    title: "Train-to-Role — Role-based operator training",
    summary: "Cut classroom training by 53% and on-line practice time by 80%.",
    action: "View case study",
  },
  zh: {
    label: "改善项目 · 2019–2020",
    title: "Train-to-Role — 按岗位标准化培训",
    summary: "集中培训时间减少53%，生产线实操时间减少80%。",
    action: "查看案例",
  },
} as const;

const leanSweepLink = {
  vi: {
    label: "DỰ ÁN KAIZEN · 2018–2020",
    title: "Lean Sweep — Giảm lãng phí toàn khu vực sản xuất",
    summary: "11 nhóm cải tiến, giảm 30% lãng phí, 35% cycle time và 25% thời gian di chuyển.",
    action: "Xem case study",
  },
  en: {
    label: "KAIZEN PROJECT · 2018–2020",
    title: "Lean Sweep — Area-wide waste reduction",
    summary: "11 improvement groups, reducing waste by 30%, cycle time by 35% and travel time by 25%.",
    action: "View case study",
  },
  zh: {
    label: "改善项目 · 2018–2020",
    title: "Lean Sweep — 区域精益改善",
    summary: "11个改善小组，浪费减少30%，周期时间减少35%，移动时间减少25%。",
    action: "查看案例",
  },
} as const;

export default function ServerProfile({ language }: { language: Language }) {
  const profileMilestones = getMilestones(language);
  const t = archiveCopy[language];
  return (
    <section className="seo-profile" id="case-studies" aria-labelledby="case-studies-title">
      <header className="profile-section-header">
        <div className="profile-heading-copy">
          <span className="kicker">{t.kicker}</span>
          <h2 id="case-studies-title">
            {t.title.split("\n").map((line, index) => (
              <span key={line}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </h2>
          <p>{t.intro}</p>
        </div>
        <aside className="profile-contact-card" aria-label="Marcus Tran contact card">
          <div className="profile-identity">
            <strong>{profile.preferredName}</strong>
            <span>PROCESS ENGINEER / CONTINUOUS IMPROVEMENT</span>
          </div>
          <div className="profile-contact-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
            <span>{profile.location}</span>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub · MarcusTr98 ↗
            </a>
          </div>
          <div className="profile-cv-links" aria-label="Download CV">
            <a href={cvByLanguage.en} download>
              <b>EN</b>
              <span>
                {t.englishCv}
                <small>{t.download}</small>
              </span>
              <i aria-hidden="true">↓</i>
            </a>
            <a href={cvByLanguage.zh} download>
              <b>中文</b>
              <span>
                {t.chineseCv}
                <small>{t.download}</small>
              </span>
              <i aria-hidden="true">↓</i>
            </a>
          </div>
        </aside>
      </header>
      <div className="seo-profile-grid">
        {profileMilestones.map((milestone, index) => (
          <article key={milestone.id}>
            <span>
              {String(index + 1).padStart(2, "0")} / {milestone.shortTitle} / {milestone.period}
            </span>
            <h3>{milestone.title}</h3>
            <strong>{milestone.role}</strong>
            <p>{milestone.summary}</p>
            <ul>
              {milestone.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            {milestone.id === "toyota" && (
              <div className="timeline-projects">
                <div className="timeline-project">
                  <span>{trainToRoleLink[language].label}</span>
                  <h4>{trainToRoleLink[language].title}</h4>
                  <p>{trainToRoleLink[language].summary}</p>
                  <a href="/cases/train-to-role.html">
                    {trainToRoleLink[language].action} <b aria-hidden="true">↗</b>
                  </a>
                </div>
                <div className="timeline-project">
                  <span>{leanSweepLink[language].label}</span>
                  <h4>{leanSweepLink[language].title}</h4>
                  <p>{leanSweepLink[language].summary}</p>
                  <a href="/cases/lean-sweep.html">
                    {leanSweepLink[language].action} <b aria-hidden="true">↗</b>
                  </a>
                </div>
              </div>
            )}
            {milestone.projectUrl && (
              <a href={milestone.projectUrl} target="_blank" rel="noreferrer">
                {t.source} ↗
              </a>
            )}
            {milestone.projectLinks?.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                {link.label} ↗
              </a>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
