"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudyContent, ProcessStep } from "@/data/caseStudies";

function Results({
  content,
  language,
}: {
  content: CaseStudyContent;
  language: "vi" | "en" | "zh";
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [split, setSplit] = useState(50);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="case-results" ref={sectionRef}>
        {content.results.map((result, index) => (
          <article
            className="case-result"
            key={result.id}
            style={{ "--result-order": index } as React.CSSProperties}
          >
            <p>{result.label}</p>
            <div className="case-result-values">
              <span>
                <small>
                  {language === "vi" ? "Trước" : language === "zh" ? "改善前" : "Before"}
                </small>
                <strong>{result.before}</strong>
              </span>
              <span aria-hidden="true">→</span>
              <span>
                <small>{language === "vi" ? "Sau" : language === "zh" ? "改善后" : "After"}</small>
                <strong>{result.after}</strong>
              </span>
            </div>
            <AnimatedReduction amount={result.changePercent} active={entered} />
            <div className="case-result-track" aria-hidden="true">
              <span
                style={
                  {
                    "--result-width": `${(Number.parseInt(result.after, 10) / Number.parseInt(result.before, 10)) * 100}%`,
                  } as React.CSSProperties
                }
              />
            </div>
          </article>
        ))}
      </div>
      {content.results.find(({ id }) => id === "independent") && (
        <div className="case-comparison">
          <div className="case-comparison-heading">
            <span>
              {language === "vi"
                ? "KÉO ĐỂ SO SÁNH"
                : language === "zh"
                  ? "拖动进行对比"
                  : "DRAG TO COMPARE"}
            </span>
            <p>
              {language === "vi"
                ? "Thời gian đến khi làm việc độc lập"
                : language === "zh"
                  ? "达到独立作业所需时间"
                  : "Time to independent work"}
            </p>
          </div>
          <div
            className="case-comparison-track"
            style={{ "--comparison-split": `${split}%` } as React.CSSProperties}
          >
            <span className="case-comparison-before">
              30<span>{language === "zh" ? "天" : language === "en" ? "days" : "ngày"}</span>
            </span>
            <span className="case-comparison-after">
              10<span>{language === "zh" ? "天" : language === "en" ? "days" : "ngày"}</span>
            </span>
            <input
              type="range"
              min="15"
              max="85"
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
              aria-label={
                language === "vi"
                  ? "Thanh trượt so sánh 30 ngày trước và 10 ngày sau cải tiến"
                  : language === "zh"
                    ? "对比改善前30天与改善后10天"
                    : "Compare 30 days before with 10 days after"
              }
            />
            <span className="case-comparison-handle" aria-hidden="true" />
          </div>
        </div>
      )}
    </>
  );
}

function AnimatedReduction({ amount, active }: { amount: number; active: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(amount);
      return;
    }
    let frame = 0;
    const startedAt = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / 850, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(amount * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [active, amount]);

  return <strong className={`case-result-change ${active ? "is-visible" : ""}`}>−{value}%</strong>;
}

function ProcessSteps({
  before,
  after,
  labels,
}: {
  before: ProcessStep[];
  after: ProcessStep[];
  labels: { before: string; after: string; previous: string; next: string; step: string };
}) {
  const [showAfter, setShowAfter] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const steps = showAfter ? after : before;
  const selected = steps[activeStep] ?? steps[0];

  function chooseProcess(next: boolean) {
    setShowAfter(next);
    setActiveStep(0);
  }

  return (
    <div className="process-walkthrough">
      <div
        className="process-switch"
        role="group"
        aria-label={`${labels.before} / ${labels.after}`}
      >
        <button type="button" aria-pressed={!showAfter} onClick={() => chooseProcess(false)}>
          {labels.before}
        </button>
        <button type="button" aria-pressed={showAfter} onClick={() => chooseProcess(true)}>
          {labels.after}
        </button>
      </div>
      <ol className="process-track" aria-label={showAfter ? labels.after : labels.before}>
        {steps.map((step, index) => (
          <li
            className={index === activeStep ? "is-active" : ""}
            key={`${showAfter ? "after" : "before"}-${index}`}
          >
            <button
              type="button"
              onClick={() => setActiveStep(index)}
              aria-current={index === activeStep ? "step" : undefined}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
            </button>
          </li>
        ))}
      </ol>
      {selected && (
        <div className="process-detail" aria-live="polite" key={`${showAfter}-${activeStep}`}>
          <span>
            {labels.step} {activeStep + 1} / {steps.length}
          </span>
          <h3>{selected.title}</h3>
          <p>{selected.detail}</p>
        </div>
      )}
      <div className="process-controls">
        <button
          type="button"
          onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
          disabled={activeStep === 0}
        >
          ← {labels.previous}
        </button>
        <button
          type="button"
          onClick={() => setActiveStep((step) => Math.min(step + 1, steps.length - 1))}
          disabled={activeStep === steps.length - 1}
        >
          {labels.next} →
        </button>
      </div>
    </div>
  );
}

export default function CaseStudyInteractions({
  content,
  language,
  mode,
}: {
  content: CaseStudyContent;
  language: "vi" | "en" | "zh";
  mode: "results" | "process";
}) {
  const interfaceLabels = {
    vi: {
      before: "Trước cải tiến",
      after: "Sau cải tiến",
      previous: "Trước",
      next: "Tiếp",
      step: "Bước",
    },
    en: { before: "Before", after: "After", previous: "Previous", next: "Next", step: "Step" },
    zh: { before: "改善前", after: "改善后", previous: "上一步", next: "下一步", step: "步骤" },
  } as const;
  return mode === "results" ? (
    <Results content={content} language={language} />
  ) : (
    <ProcessSteps
      before={content.beforeProcess}
      after={content.afterProcess}
      labels={interfaceLabels[language]}
    />
  );
}
