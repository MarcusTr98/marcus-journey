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
    action: "Xem case study",
  },
  en: {
    label: "KAIZEN PROJECT · 2019–2020",
    title: "Train-to-Role — Role-based operator training",
    action: "View case study",
  },
  zh: {
    label: "改善项目 · 2019–2020",
    title: "Train-to-Role — 按岗位标准化培训",
    action: "查看案例",
  },
} as const;

const leanSweepLink = {
  vi: {
    label: "DỰ ÁN KAIZEN · 2018–2020",
    title: "Lean Sweep — Giảm lãng phí toàn khu vực sản xuất",
    action: "Xem case study",
  },
  en: {
    label: "KAIZEN PROJECT · 2018–2020",
    title: "Lean Sweep — Area-wide waste reduction",
    action: "View case study",
  },
  zh: {
    label: "改善项目 · 2018–2020",
    title: "Lean Sweep — 区域精益改善",
    action: "查看案例",
  },
} as const;

const tpmHandoverLink = {
  vi: {
    label: "CẢI TIẾN TPM · 2020–2021",
    title: "Giảm sự cố máy móc và dụng cụ",
    action: "Xem case study",
  },
  en: {
    label: "TPM IMPROVEMENT · 2020–2021",
    title: "Reducing Machine and Tool Failures",
    action: "View case study",
  },
  zh: {
    label: "TPM改善 · 2020–2021",
    title: "降低机器与工具故障",
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
                <a className="timeline-project" href="/cases/train-to-role.html">
                  <span>{trainToRoleLink[language].label}</span>
                  <h4>{trainToRoleLink[language].title}</h4>
                  <b aria-hidden="true">↗</b>
                </a>
                <a className="timeline-project" href="/cases/lean-sweep.html">
                  <span>{leanSweepLink[language].label}</span>
                  <h4>{leanSweepLink[language].title}</h4>
                  <b aria-hidden="true">↗</b>
                </a>
                <a className="timeline-project" href="/cases/tpm-handover.html">
                  <span>{tpmHandoverLink[language].label}</span>
                  <h4>{tpmHandoverLink[language].title}</h4>
                  <b aria-hidden="true">↗</b>
                </a>
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
