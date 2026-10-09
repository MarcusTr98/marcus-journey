import Image from "next/image";
import { getMilestones } from "@/data/i18n";
import { cvByLanguage, profile } from "@/data/profile";
import type { Language } from "@/types";
import ArrowIcon from "@/components/ArrowIcon";

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
    title: "Reduce Training Time",
    action: "Xem case study",
  },
  en: {
    label: "KAIZEN PROJECT · 2019–2020",
    title: "Reduce Training Time",
    action: "View case study",
  },
  zh: {
    label: "改善项目 · 2019–2020",
    title: "缩短培训时间",
    action: "查看案例",
  },
} as const;

const leanSweepLink = {
  vi: {
    label: "DỰ ÁN KAIZEN · 2018–2020",
    title: "Reduce Waste: Toàn bộ phận",
    action: "Xem case study",
  },
  en: {
    label: "KAIZEN PROJECT · 2018–2020",
    title: "Reduce Waste: Department-wide",
    action: "View case study",
  },
  zh: {
    label: "改善项目 · 2018–2020",
    title: "Reduce Waste：全部门",
    action: "查看案例",
  },
} as const;

const tpmHandoverLink = {
  vi: {
    label: "CẢI TIẾN TPM · 2020–2021",
    title: "TPM Machine & Tools: Giảm sự cố máy móc và dụng cụ",
    action: "Xem case study",
  },
  en: {
    label: "TPM IMPROVEMENT · 2020–2021",
    title: "TPM Machine & Tools: Reducing Machine and Tool Failures",
    action: "View case study",
  },
  zh: {
    label: "TPM改善 · 2020–2021",
    title: "TPM Machine & Tools: 降低机器与工具故障",
    action: "查看案例",
  },
} as const;

const fptProjects = {
  vi: [
    { slug: "marcus-electronics", title: "Marcus Electronics", image: "marcus-electronics" },
    { slug: "marcus-store", title: "Marcus Store", image: "marcus-store" },
    { slug: "marcus-video", title: "Marcus Video", image: "marcus-video" },
  ],
  en: [
    { slug: "marcus-electronics", title: "Marcus Electronics", image: "marcus-electronics" },
    { slug: "marcus-store", title: "Marcus Store", image: "marcus-store" },
    { slug: "marcus-video", title: "Marcus Video", image: "marcus-video" },
  ],
  zh: [
    { slug: "marcus-electronics", title: "Marcus Electronics", image: "marcus-electronics" },
    { slug: "marcus-store", title: "Marcus Store", image: "marcus-store" },
    { slug: "marcus-video", title: "Marcus Video", image: "marcus-video" },
  ],
} as const;

const solutionsProjects = {
  vi: [
    { slug: "lan-task-system", title: "Hệ thống quản lý công việc", image: "lan-task-system" },
    { slug: "usb-guardian", title: "USB Guardian · Bảo mật Windows", image: "usb-guardian" },
  ],
  en: [
    { slug: "lan-task-system", title: "LAN Task Management", image: "lan-task-system" },
    { slug: "usb-guardian", title: "USB Guardian · Windows Security", image: "usb-guardian" },
  ],
  zh: [
    { slug: "lan-task-system", title: "局域网任务管理系统", image: "lan-task-system" },
    { slug: "usb-guardian", title: "USB Guardian · Windows安全", image: "usb-guardian" },
  ],
} as const;

const teachingStudies = {
  vi: [
    { title: "Lập trình thực hành", label: "BÀI GIẢNG", image: "lesson-programming" },
    { title: "Robocon & điều khiển", label: "HƯỚNG DẪN", image: "lesson-robocon" },
    { title: "Công nghệ số", label: "TÀI LIỆU HỌC TẬP", image: "lesson-digital" },
  ],
  en: [
    { title: "Practical programming", label: "LESSON", image: "lesson-programming" },
    { title: "Robocon & control", label: "GUIDE", image: "lesson-robocon" },
    { title: "Digital technology", label: "LEARNING RESOURCE", image: "lesson-digital" },
  ],
  zh: [
    { title: "编程实践", label: "课程", image: "lesson-programming" },
    { title: "Robocon与控制", label: "指南", image: "lesson-robocon" },
    { title: "数字技术", label: "学习资料", image: "lesson-digital" },
  ],
} as const;

const teachingStudyStatus = {
  vi: "NỘI DUNG SẼ BỔ SUNG",
  en: "CONTENT COMING SOON",
  zh: "内容即将补充",
} as const;

const keyMetricPattern =
  /(<\s?\d+(?:[.,]\d+)?%|Toyota Boshoku Hai Phong|FPT Polytechnic(?: Hai Phong)?|VHunter Event Company|Laser Cutting CNC|Standard Work|Check Sheets?|Q-Point|Safety Dojo|Plan\/Kanban|Spring Boot(?:\s+\d+(?:\.\d+){1,2})?|SQL Server|Google Workspace|Microsoft Office|WebSocket|JSP\/JSTL|WMI\/WPD|SQLite|Robocon|Java(?:\s+\d+)?|Vue(?:\.\d+)?|Marcus (?:Store|Video|Electronics)|Kaizen|Pareto|QCC|TPM|5S|5W1H|5 Whys|5 Why|~?\d+(?:[.,]\d+)?%|\d\.\d+\/\d\.\d+|\bTop\s*1\b|\b\d{1,3}(?:,\d{3})+\b|\bVND\s?[\d,.]+(?:\s?(?:million|billion))?)/gi;

function highlightMetrics(text: string) {
  return text.split(keyMetricPattern).map((part, index) =>
    index % 2 === 1 ? (
      <b className="profile-metric" key={`${part}-${index}`}>
        {part}
      </b>
    ) : (
      part
    ),
  );
}

export default function ServerProfile({ language }: { language: Language }) {
  const profileMilestones = getMilestones(language).filter(
    (milestone) => !["graduation", "video", "electronics", "store"].includes(milestone.id),
  );
  const t = archiveCopy[language];
  return (
    <section className="seo-profile" id="case-studies" aria-labelledby="case-studies-title">
      <header className="profile-section-header">
        <div className="profile-heading-copy">
          <span className="kicker">{t.kicker}</span>
          <h2 id="case-studies-title">
            {t.title.split("\n").map((line, index) => (
              <span key={`${index}-${line}`}>{line}</span>
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
              GitHub · MarcusTr98 <ArrowIcon />
            </a>
          </div>
          <div className="profile-cv-links" aria-label="Download CV">
            <a href={cvByLanguage.en} download>
              <b>EN</b>
              <span>
                {t.englishCv}
                <small>{t.download}</small>
              </span>
              <ArrowIcon direction="down" />
            </a>
            <a href={cvByLanguage.zh} download>
              <b>中文</b>
              <span>
                {t.chineseCv}
                <small>{t.download}</small>
              </span>
              <ArrowIcon direction="down" />
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
            <p>{highlightMetrics(milestone.summary)}</p>
            <ul>
              {milestone.highlights.map((highlight) => (
                <li key={highlight}>{highlightMetrics(highlight)}</li>
              ))}
            </ul>
            {(milestone.id === "fpt" || milestone.id === "solutions") && (
              <div
                className="education-projects"
                aria-label={
                  language === "en"
                    ? milestone.id === "fpt" ? "Selected software projects" : "Real-world digital products"
                    : milestone.id === "fpt" ? "Dự án phần mềm tiêu biểu" : "Sản phẩm số thực tế"
                }
              >
                {(milestone.id === "fpt" ? fptProjects[language] : solutionsProjects[language]).map((project) => (
                  <a
                    className="education-project-card"
                    href={`/cases/${project.slug}${language === "en" ? ".en" : ""}.html`}
                    key={project.slug}
                    aria-label={`${project.title} · ${language === "en" ? "Project details" : "Chi tiết dự án"}`}
                  >
                    <Image
                      className="education-project-image"
                      src={`/images/projects/${project.image}.svg`}
                      alt=""
                      width={640}
                      height={420}
                      aria-hidden="true"
                    />
                    <span className="education-project-title">{project.title}</span>
                    <ArrowIcon className="education-project-arrow" />
                  </a>
                ))}
              </div>
            )}
            {milestone.id === "teaching" && (
              <div
                className="education-projects teaching-studies"
                aria-label={language === "en" ? "Teaching case studies" : "Chuyên đề giảng dạy"}
              >
                {teachingStudies[language].map((study) => (
                  <div className="education-project-card teaching-study-card" key={study.image}>
                    <Image
                      className="education-project-image"
                      src={`/images/projects/${study.image}.svg`}
                      alt=""
                      width={640}
                      height={420}
                      aria-hidden="true"
                    />
                    <span className="teaching-study-label">{study.label}</span>
                    <span className="education-project-title">{study.title}</span>
                    <small>{teachingStudyStatus[language]}</small>
                  </div>
                ))}
              </div>
            )}
            {milestone.id === "toyota" && (
              <div className="timeline-projects">
                <a className="timeline-project" href={language === "en" ? "/cases/train-to-role.en.html" : "/cases/train-to-role.html"}>
                  <span>{trainToRoleLink[language].label}</span>
                  <h4>{trainToRoleLink[language].title}</h4>
                  <ArrowIcon />
                </a>
                <a className="timeline-project" href={language === "en" ? "/cases/lean-sweep.en.html" : "/cases/lean-sweep.html"}>
                  <span>{leanSweepLink[language].label}</span>
                  <h4>{leanSweepLink[language].title}</h4>
                  <ArrowIcon />
                </a>
                <a className="timeline-project" href={language === "en" ? "/cases/tpm-machine-tools.en.html" : "/cases/tpm-handover.html"}>
                  <span>{tpmHandoverLink[language].label}</span>
                  <h4>{tpmHandoverLink[language].title}</h4>
                  <ArrowIcon />
                </a>
              </div>
            )}
            {milestone.projectUrl && (
              <a href={milestone.projectUrl} target="_blank" rel="noreferrer">
                {t.source} <ArrowIcon />
              </a>
            )}
            {milestone.id !== "solutions" && milestone.projectLinks?.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  {link.label} <ArrowIcon />
                </a>
              ))}
          </article>
        ))}
      </div>
    </section>
  );
}
