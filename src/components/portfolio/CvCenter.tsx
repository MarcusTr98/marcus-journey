"use client";

import { useEffect, useState } from "react";
import { cvByLanguage } from "@/data/profile";
import type { Language } from "@/types";

const cvOptions = {
  vi: { flag: "🇻🇳", name: "Tiếng Việt", code: "VI" },
  en: { flag: "🇬🇧", name: "English", code: "EN" },
  zh: { flag: "🇨🇳", name: "中文", code: "中文" },
} as const;

const labels = {
  vi: {
    title: "Hồ sơ năng lực",
    hint: "Chọn ngôn ngữ để xem nhanh hoặc tải CV.",
    preview: "Xem nhanh",
    download: "Tải CV",
    close: "Đóng",
  },
  en: {
    title: "Curriculum vitae",
    hint: "Choose a language to preview or download.",
    preview: "Quick preview",
    download: "Download CV",
    close: "Close",
  },
  zh: {
    title: "个人简历",
    hint: "选择语言以快速预览或下载简历。",
    preview: "快速预览",
    download: "下载简历",
    close: "关闭",
  },
} as const;

export default function CvCenter({
  language,
  onClose,
}: {
  language: Language;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<Language>(language);
  const t = labels[language];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [onClose]);

  return (
    <div
      className="cv-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-title"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="cv-center">
        <header>
          <div>
            <span className="kicker">MARCUS TRAN · CV</span>
            <h2 id="cv-title">{t.title}</h2>
            <p>{t.hint}</p>
          </div>
          <button onClick={onClose} aria-label={t.close}>
            {t.close} ×
          </button>
        </header>
        <div className="cv-language-list" role="tablist" aria-label="CV language">
          {(Object.keys(cvOptions) as Language[]).map((key) => {
            const option = cvOptions[key];
            return (
              <button
                key={key}
                className={selected === key ? "is-active" : ""}
                onClick={() => setSelected(key)}
                role="tab"
                aria-selected={selected === key}
              >
                <span aria-hidden="true">{option.flag}</span>
                <strong>{option.name}</strong>
                <small>{t.preview} →</small>
              </button>
            );
          })}
        </div>
        <div className="cv-preview">
          <iframe
            key={selected}
            src={`${cvByLanguage[selected]}#view=FitH&toolbar=0`}
            title={`${cvOptions[selected].name} CV preview`}
          />
          <a
            href={cvByLanguage[selected]}
            download={`Marcus-Tran-CV-${cvOptions[selected].code}.pdf`}
          >
            {cvOptions[selected].flag} {t.download} · {cvOptions[selected].name} ↓
          </a>
        </div>
      </section>
    </div>
  );
}
