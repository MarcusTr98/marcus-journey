import { getMilestones } from "@/data/i18n";
import { cvByLanguage, profile } from "@/data/profile";

export default function ServerProfile() {
  const profileMilestones = getMilestones("vi");
  return (
    <section className="seo-profile" id="case-studies" aria-labelledby="case-studies-title">
      <header>
        <span className="kicker">CAREER &amp; PROJECT ARCHIVE</span>
        <h2 id="case-studies-title">The journey, available without 3D.</h2>
        <p>
          Production leadership, software engineering, practical deployments and technology
          education—presented as accessible, indexable case studies.
        </p>
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
                GitHub source ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
