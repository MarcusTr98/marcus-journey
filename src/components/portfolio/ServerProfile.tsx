import { getMilestones } from "@/data/i18n";
import { cvByLanguage, profile } from "@/data/profile";
import type { Language } from "@/types";

const archiveCopy = {
  vi: {
    kicker: "HÀNH TRÌNH NGHỀ NGHIỆP & DỰ ÁN",
    title: "Toàn bộ hành trình, không cần chế độ 3D.",
    intro:
      "Kinh nghiệm sản xuất, kỹ nghệ phần mềm, triển khai thực tế và giáo dục công nghệ dưới dạng nội dung dễ tiếp cận.",
    source: "Mã nguồn GitHub",
  },
  en: {
    kicker: "CAREER & PROJECT ARCHIVE",
    title: "The journey, available without 3D.",
    intro:
      "Production leadership, software engineering, practical deployments and technology education—presented as accessible case studies.",
    source: "GitHub source",
  },
  zh: {
    kicker: "职业与项目档案",
    title: "无需3D，也能完整了解这段旅程。",
    intro: "以易于访问的案例形式呈现生产领导力、软件工程、实际部署与科技教育经历。",
    source: "GitHub源代码",
  },
} as const;

export default function ServerProfile({ language }: { language: Language }) {
  const profileMilestones = getMilestones(language);
  const t = archiveCopy[language];
  return (
    <section className="seo-profile" id="case-studies" aria-labelledby="case-studies-title">
      <header>
        <span className="kicker">{t.kicker}</span>
        <h2 id="case-studies-title">{t.title}</h2>
        <p>{t.intro}</p>
        <address>
          <strong>
            {profile.legalName} ({profile.preferredName})
          </strong>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.phoneHref}>{profile.phoneDisplay}</a>
          <span>{profile.location}</span>
          <a href={profile.github}>GitHub: MarcusTr98</a>
          <a href={cvByLanguage.vi} download>
            🇻🇳 CV tiếng Việt
          </a>
          <a href={cvByLanguage.en} download>
            🇬🇧 English CV
          </a>
          <a href={cvByLanguage.zh} download>
            🇨🇳 中文简历
          </a>
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
