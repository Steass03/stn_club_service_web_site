"use client";

import { useMemo, useState } from "react";
import WorkCard from "@/components/works/WorkCard";
import { filterWorksByQuery, type WorksSortMode, sortWorks } from "@/lib/works";
import type { WorkExample } from "@/types";

const SORT_OPTIONS: { value: WorksSortMode; label: string }[] = [
  { value: "date-desc", label: "За датою — спочатку нові" },
  { value: "date-asc", label: "За датою — спочатку старі" },
  { value: "category-site", label: "За напрямком ремонту (двигун, трансмісія, ходова…)" },
  { value: "category-alpha", label: "За категорією прикладу (А — Я)" },
];

type Props = {
  works: WorkExample[];
};

export default function WorksGallery({ works }: Props) {
  const [sortMode, setSortMode] = useState<WorksSortMode>("date-desc");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const filtered = filterWorksByQuery(works, query);
    return sortWorks(filtered, sortMode);
  }, [works, query, sortMode]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div
        className="
          grid grid-cols-1 gap-3
          sm:grid-cols-[minmax(260px,auto)_1fr] sm:gap-x-6 sm:gap-y-2 sm:items-start
          mb-8 sm:mb-10 p-4 sm:p-5 rounded-xl border border-white/10 bg-[#0c0f16]/80
        "
      >
        <span className="text-sm text-gray-400 sm:col-start-1 sm:row-start-1">
          Сортування
        </span>
        <label className="sr-only" htmlFor="works-sort">
          Сортування прикладів робіт
        </label>
        <select
          id="works-sort"
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as WorksSortMode)}
          className="
            sm:col-start-1 sm:row-start-2 w-full min-w-0 min-h-[44px]
            rounded-lg border border-white/15 bg-[#121826] text-white px-3 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-cyan-500/60
          "
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="text-sm text-gray-400 sm:col-start-2 sm:row-start-1">
          Пошук за словами
        </span>
        <label className="sr-only" htmlFor="works-search">
          Пошук за словами в прикладах робіт
        </label>
        <input
          id="works-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Наприклад: BMW ходова гальма"
          autoComplete="off"
          className="
            sm:col-start-2 sm:row-start-2 w-full min-w-0 min-h-[44px]
            rounded-lg border border-white/15 bg-[#121826] text-white placeholder:text-gray-600
            px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/60
          "
        />
        <p className="text-xs text-gray-600 leading-snug sm:col-start-2 sm:row-start-3 m-0">
          Шукаємо у назві, описі, категорії та тегах. Усі введені слова мають зустрічатися.
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-gray-400 py-12">Нічого не знайдено — спробуйте змінити запит.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {visible.map((item) => (
            <WorkCard key={item.id} work={item} />
          ))}
        </div>
      )}
    </div>
  );
}
