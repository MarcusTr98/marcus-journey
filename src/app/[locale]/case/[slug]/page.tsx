import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudyInteractions from "@/components/portfolio/CaseStudyInteractions";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { isLanguage, languages } from "@/data/locales";

type CasePageProps = { params: Promise<{ locale: string; slug: string }> };

const sectionLabels = {
  vi: {
    back: "← Về hành trình nghề nghiệp",
    period: "Thời gian",
    context: "Bối cảnh",
    problem: "Vấn đề cần giải quyết",
    baseline: "Hiện trạng ban đầu",
    rootCause: "Phân tích nguyên nhân gốc",
    conclusion: "Kết luận phân tích",
    solution: "Giải pháp cải tiến",
    results: "Kết quả trước và sau",
    comparison: "So sánh kết quả",
    process: "Quy trình trước và sau",
    sustain: "Duy trì kết quả",
    role: "Vai trò của tôi",
    tools: "Công cụ áp dụng",
    note: "Số liệu được trình bày theo dự án Train-to-Role do Marcus cung cấp.",
  },
  en: {
    back: "← Back to career overview",
    period: "Project period",
    context: "Context",
    problem: "Problem to solve",
    baseline: "Baseline",
    rootCause: "Root-cause analysis",
    conclusion: "Analysis conclusion",
    solution: "Improvement solution",
    results: "Before-and-after results",
    comparison: "Outcome comparison",
    process: "Process before and after",
    sustain: "Sustaining the result",
    role: "My role",
    tools: "Methods and tools",
    note: "Figures are from Marcus's supplied Train-to-Role project brief.",
  },
  zh: {
    back: "← 返回职业经历",
    period: "项目周期",
    context: "项目背景",
    problem: "待解决的问题",
    baseline: "改善前现状",
    rootCause: "根因分析",
    conclusion: "分析结论",
    solution: "改善方案",
    results: "改善前后结果",
    comparison: "结果对比",
    process: "改善前后流程",
    sustain: "成果维持",
    role: "个人职责",
    tools: "方法与工具",
    note: "数据来自Marcus提供的Train-to-Role项目说明。",
  },
} as const;

export function generateStaticParams() {
  return languages.flatMap((locale) => caseStudies.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLanguage(locale)) return {};
  const study = getCaseStudy(slug, locale);
  if (!study) return {};
  return {
    title: study.content.title,
    description: study.content.summary,
    alternates: {
      canonical: `/${locale}/case/${slug}`,
      languages: {
        vi: `/vi/case/${slug}`,
        en: `/en/case/${slug}`,
        "zh-CN": `/zh/case/${slug}`,
      },
    },
    openGraph: {
      title: study.content.title,
      description: study.content.summary,
      type: "article",
      locale: locale === "zh" ? "zh_CN" : locale === "vi" ? "vi_VN" : "en_US",
    },
  };
}

export default async function CaseStudyPage({ params }: CasePageProps) {
  const { locale, slug } = await params;
  if (!isLanguage(locale)) notFound();
  const study = getCaseStudy(slug, locale);
  if (!study) notFound();
  const t = sectionLabels[locale];
  const { content } = study;

  return (
    <main className="case-page">
      <Link className="case-back-link" href={`/${locale}#case-studies`}>
        {t.back}
      </Link>
      <header className="case-hero">
        <span className="kicker">PROCESS IMPROVEMENT · TOYOTA</span>
        <p className="case-period">
          {t.period} · {study.period}
        </p>
        <h1>{content.title}</h1>
        <p className="case-summary">{content.summary}</p>
        <div className="case-tool-tags">
          {content.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
      </header>

      <section className="case-section" aria-labelledby="case-results-title">
        <div className="case-section-heading">
          <span className="kicker">01 · {t.comparison}</span>
          <h2 id="case-results-title">{t.results}</h2>
        </div>
        <CaseStudyInteractions content={content} language={locale} mode="results" />
      </section>

      <section className="case-section case-story-grid" aria-label={`${t.context} / ${t.problem}`}>
        <article className="case-story-card case-story-wide">
          <span className="kicker">02 · {t.context}</span>
          <p>{content.context}</p>
        </article>
        <article className="case-story-card">
          <span className="kicker">03 · {t.problem}</span>
          <p>{content.problem}</p>
        </article>
        <article className="case-story-card">
          <span className="kicker">04 · {t.baseline}</span>
          <p>{content.baseline}</p>
        </article>
        <article className="case-story-card">
          <span className="kicker">05 · {t.rootCause}</span>
          <p>{content.rootCause.conclusion}</p>
          <div className="case-tool-tags">
            {content.rootCause.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </article>
        <article className="case-story-card">
          <span className="kicker">06 · {t.solution}</span>
          <p>{content.solution}</p>
        </article>
      </section>

      <section className="case-section" aria-labelledby="case-process-title">
        <div className="case-section-heading">
          <span className="kicker">07 · PDCA</span>
          <h2 id="case-process-title">{t.process}</h2>
        </div>
        <CaseStudyInteractions content={content} language={locale} mode="process" />
      </section>

      <section className="case-section case-story-grid case-closeout">
        <article className="case-story-card">
          <span className="kicker">08 · {t.sustain}</span>
          <p>{content.sustain}</p>
        </article>
        <article className="case-story-card">
          <span className="kicker">09 · {t.role}</span>
          <p>{content.myRole}</p>
        </article>
      </section>
      <p className="case-data-note">{t.note}</p>
    </main>
  );
}
