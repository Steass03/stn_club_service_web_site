"use client";

import { useMemo, useState } from "react";
import WorkGalleryLightbox from "@/components/works/WorkGalleryLightbox";
import { getWorkImageUrls } from "@/lib/work-images";
import type { WorkExample } from "@/types";

function formatDisplayDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return isoDate;
  return new Date(y, m - 1, d).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Props = {
  work: WorkExample;
};

export default function WorkCard({ work }: Props) {
  const urls = useMemo(() => getWorkImageUrls(work), [work]);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const validUrls = useMemo(
    () => urls.filter((u) => !failed[u]),
    [urls, failed],
  );

  const markFailed = (url: string) =>
    setFailed((prev) => ({ ...prev, [url]: true }));

  const hero = validUrls[0];
  const thumbs = validUrls.slice(1);
  const multi = validUrls.length > 1;

  return (
    <article
      id={work.slug}
      className="
        scroll-mt-24 bg-[#121826] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden min-w-0
        transition hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.25)]
      "
    >
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
        {hero ? (
          <div className="p-2 sm:p-3">
            <button
              type="button"
              className="relative block w-full overflow-hidden rounded-lg min-h-[11rem] sm:min-h-[13rem] md:min-h-56 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLightboxIndex(0);
              }}
              aria-label={`Відкрити фото: ${work.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hero}
                alt=""
                className="h-44 sm:h-52 md:h-56 w-full object-cover"
                onError={() => markFailed(hero)}
              />
              {multi && (
                <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white tabular-nums">
                  +{validUrls.length - 1} фото
                </span>
              )}
              <span className="sr-only">Натисніть, щоб переглянути збільшеним</span>
            </button>

            {thumbs.length > 0 && (
              <div
                className="mt-2 flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory"
                role="list"
                aria-label="Інші фото до цього прикладу"
              >
                {thumbs.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    role="listitem"
                    className="
                      relative shrink-0 snap-start overflow-hidden rounded-md border border-white/15
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500
                      w-20 h-16 sm:w-24 sm:h-[4.5rem]
                    "
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLightboxIndex(i + 1);
                    }}
                    aria-label={`Фото ${i + 2} з ${validUrls.length}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={() => markFailed(src)}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative h-44 sm:h-52 md:h-56 flex items-center justify-center text-gray-500 text-sm px-4 text-center">
            {urls.length > 0 ? (
              <>
                Немає доступних фото — перевірте шляхи в{" "}
                <span className="font-mono text-[11px] sm:text-xs">data/works.json</span> і файли в{" "}
                <span className="font-mono text-[11px] sm:text-xs">public/works/</span>
              </>
            ) : (
              <>
                Без фото — додайте <span className="font-mono text-xs">images</span> (масив) або{" "}
                <span className="font-mono text-xs">image</span> у <span className="font-mono text-xs">data/works.json</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm">
          <span className="text-cyan-400 font-medium">{work.category}</span>
          <span className="text-gray-600" aria-hidden>
            ·
          </span>
          <time dateTime={work.date} className="text-gray-500">
            {formatDisplayDate(work.date)}
          </time>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold mt-2 mb-2 break-words">{work.title}</h2>
        <p className="text-gray-400 text-sm sm:text-base">{work.description}</p>
        {work.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Ключові слова">
            {work.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-gray-500"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <WorkGalleryLightbox
        open={lightboxIndex !== null && validUrls.length > 0}
        urls={validUrls}
        startIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        imageLabel={work.title}
      />
    </article>
  );
}
