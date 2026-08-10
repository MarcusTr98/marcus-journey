"use client";

import { useEffect } from "react";
import type { Language, Milestone } from "@/types";
import { landmarkMeta } from "@/data/landmarks";

const labels = {
  vi: {
    album: "ALBUM HÀNH TRÌNH",
    collected: "Kỷ niệm đã mở",
    empty: "Hãy lái xe qua trạm đầu tiên để mở khóa ký ức.",
    revisit: "Quay lại trạm",
    close: "Đóng",
  },
  en: {
    album: "JOURNEY ALBUM",
    collected: "Memories collected",
    empty: "Drive through the first station to unlock a memory.",
    revisit: "Revisit stop",
    close: "Close",
  },
  zh: {
    album: "旅程相册",
    collected: "已解锁的记忆",
    empty: "驶过第一个站点即可解锁记忆。",
    revisit: "返回站点",
    close: "关闭",
  },
} as const;

export default function JourneyAlbum({
  language,
  items,
  visited,
  open,
  onOpen,
  onClose,
  onNavigate,
}: {
  language: Language;
  items: Milestone[];
  visited: number[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const t = labels[language];
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);
  return (
    <>
      <button className="journey-album-trigger" onClick={onOpen} aria-label={t.album}>
        <span>▣</span>
        <b>{visited.length}</b>
        <small>{t.album}</small>
      </button>
      {open && (
        <div
          className="album-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="album-title"
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <section className="journey-album">
            <header>
              <div>
                <span className="kicker">MARCUS JOURNEY · MEMORY ARCHIVE</span>
                <h2 id="album-title">{t.album}</h2>
                <p>
                  {visited.length}/{items.length} · {t.collected}
                </p>
              </div>
              <button onClick={onClose}>{t.close} ×</button>
            </header>
            {visited.length === 0 ? (
              <p className="album-empty">{t.empty}</p>
            ) : (
              <div className="album-grid">
                {visited.map((index) => {
                  const item = items[index],
                    meta = landmarkMeta[item.id];
                  return (
                    <article
                      key={item.id}
                      style={{ "--memory-accent": item.accent } as React.CSSProperties}
                    >
                      <div className={`memory-placeholder memory-${meta.kind}`}>
                        <span>{meta.icon}</span>
                        <small>PHOTO PLACEHOLDER</small>
                      </div>
                      <em>{item.period}</em>
                      <h3>{item.title}</h3>
                      <p>{item.role}</p>
                      <button
                        onClick={() => {
                          onNavigate(index);
                          onClose();
                        }}
                      >
                        {t.revisit} →
                      </button>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}
