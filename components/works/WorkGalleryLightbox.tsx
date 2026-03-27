"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  open: boolean;
  urls: string[];
  startIndex: number;
  onClose: () => void;
  imageLabel: string;
};

export default function WorkGalleryLightbox({
  open,
  urls,
  startIndex,
  onClose,
  imageLabel,
}: Props) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    if (open) setIdx(Math.min(Math.max(0, startIndex), Math.max(0, urls.length - 1)));
  }, [open, startIndex, urls.length]);

  const goPrev = useCallback(() => {
    setIdx((i) => (i <= 0 ? urls.length - 1 : i - 1));
  }, [urls.length]);

  const goNext = useCallback(() => {
    setIdx((i) => (i >= urls.length - 1 ? 0 : i + 1));
  }, [urls.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goPrev, goNext]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || urls.length === 0) return null;

  const src = urls[idx];
  const multi = urls.length > 1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/92"
      role="dialog"
      aria-modal="true"
      aria-label={`Галерея: ${imageLabel}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="
          absolute top-3 right-3 sm:top-4 sm:right-4 z-10
          min-h-[44px] min-w-[44px] rounded-lg border border-white/20 bg-[#121826]/90
          text-white text-xl leading-none hover:bg-white/10 transition-colors
        "
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Закрити перегляд"
      >
        ×
      </button>

      {multi && (
        <button
          type="button"
          className="
            absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10
            min-h-[44px] min-w-[44px] rounded-lg border border-white/20 bg-[#121826]/90
            text-white text-lg hover:bg-white/10 transition-colors
          "
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label="Попереднє фото"
        >
          ‹
        </button>
      )}

      <div
        className="relative max-h-[min(90dvh,900px)] max-w-[min(96vw,1200px)] flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${imageLabel} — фото ${idx + 1} з ${urls.length}`}
          className="max-h-[min(85dvh,820px)] max-w-full w-auto object-contain rounded-lg shadow-[0_0_40px_rgba(0,229,255,0.15)]"
        />
        {multi && (
          <p className="text-sm text-gray-400 tabular-nums">
            {idx + 1} / {urls.length}
          </p>
        )}
      </div>

      {multi && (
        <button
          type="button"
          className="
            absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10
            min-h-[44px] min-w-[44px] rounded-lg border border-white/20 bg-[#121826]/90
            text-white text-lg hover:bg-white/10 transition-colors
          "
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label="Наступне фото"
        >
          ›
        </button>
      )}
    </div>
  );
}
