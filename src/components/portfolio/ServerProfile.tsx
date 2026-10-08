import { getMilestones } from "@/data/i18n";
import { cvByLanguage, profile } from "@/data/profile";
import type { Language } from "@/types";

const archiveCopy = {
  vi: {
    kicker: "KINH NGHIỆM & DỰ ÁN TIÊU BIỂU",
    title: "Cải tiến tại hiện trường. Chuyển hóa thành kết quả.",
    intro:
      "Từ 7 năm làm việc trong sản xuất và chất lượng đến các dự án phần mềm, đào tạo và số hóa quy trình.",
    role: "Ứng viên Process Engineer · Sản xuất · Kaizen · Chất lượng",
    englishCv: "English CV",
    chineseCv: "中文简历",
    download: "Tải PDF",
    source: "Mã nguồn GitHub",
  },
  en: {
    kicker: "SELECTED EXPERIENCE & PROJECTS",
    title: "Improve the process. Make the result visible.",
    intro:
      "Seven years in manufacturing and quality, followed by hands-on work in software, training and process digitization.",
    role: "Process Engineer candidate · Manufacturing · Kaizen · Quality",
    englishCv: "English CV",
    chineseCv: "Chinese CV",
    download: "Download PDF",
    source: "GitHub source",
  },
  zh: {
    kicker: "精选经历与项目",
    title: "改善现场流程，让成果清晰可见。",
    intro: "七年制造与质量经验，之后持续投入软件开发、培训和流程数字化项目。",
    role: "工艺工程师候选人 · 制造 · 改善 · 质量",
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
    summary: "Rút ngắn thời gian đến khi làm việc độc lập từ 30 xuống 10 ngày.",
    action: "Xem case study",
  },
  en: {
    label: "KAIZEN PROJECT · 2019–2020",
    title: "Train-to-Role — Role-based operator training",
    summary: "Reduced time to independent work from 30 to 10 days.",
    action: "View case study",
  },
  zh: {
    label: "改善项目 · 2019–2020",
    title: "Train-to-Role — 按岗位标准化培训",
    summary: "将独立上岗周期从30天缩短至10天。",
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
          <h2 id="case-studies-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <address className="profile-contact-card">
          <div className="profile-identity">
            <strong>{profile.preferredName}</strong>
            <span>{t.role}</span>
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
        </address>
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
              <div className="timeline-project">
                <span>{trainToRoleLink[language].label}</span>
                <h4>{trainToRoleLink[language].title}</h4>
                <p>{trainToRoleLink[language].summary}</p>
                <a href="/cases/train-to-role.html">
                  {trainToRoleLink[language].action} <b aria-hidden="true">↗</b>
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
