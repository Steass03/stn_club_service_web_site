import Link from "next/link";
import WorkCard from "@/components/works/WorkCard";
import { workExamples } from "@/lib/data";
import { sortWorks } from "@/lib/works";
import { ROUTES } from "@/constants/routes";

export default function WorksPreview() {
  const previewItems = sortWorks(workExamples, "date-desc");

  return (
    <section
      id="works-preview"
      className="py-14 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="works-preview-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full box-border">
        <h2
          id="works-preview-heading"
          className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 text-center"
        >
          Приклади робіт
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {previewItems.map((item) => (
            <Link
              key={item.id}
              href={`${ROUTES.WORKS}#${item.slug}`}
              className="block min-w-0 rounded-xl sm:rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
            >
              <WorkCard work={item} />
            </Link>
          ))}
        </div>
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href={ROUTES.WORKS}
            className="
              inline-flex items-center justify-center gap-2 min-h-[44px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl
              border border-cyan-500 text-cyan-400 font-semibold text-sm sm:text-base
              hover:bg-cyan-500/10 transition touch-manipulation
            "
          >
            Всі приклади робіт →
          </Link>
        </div>
      </div>
    </section>
  );
}
