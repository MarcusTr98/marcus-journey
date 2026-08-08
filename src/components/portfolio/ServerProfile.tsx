import { getMilestones } from "@/data/i18n";

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
      </header>
      <div className="seo-profile-grid">
        {profileMilestones.map((milestone, index) => (
          <article key={milestone.id}>
            <span>
              {String(index + 1).padStart(2, "0")} / {milestone.period}
            </span>
            <h3>{milestone.title}</h3>
            <strong>{milestone.role}</strong>
            <p>{milestone.summary}</p>
            <ul>
              {milestone.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
