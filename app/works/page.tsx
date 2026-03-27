import type { Metadata } from "next";
import Link from "next/link";
import WorksGallery from "./WorksGallery";
import { workExamples } from "@/lib/data";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Приклади робіт",
  description: `Приклади ремонту авто у ${siteConfig.siteName}: двигун, ходова, електрика.`,
};

export default function WorksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24 w-full box-border">
      <header className="text-center mb-10 sm:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Приклади робіт
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Реальні роботи в нашій майстерні. Нижче можна відсортувати приклади або знайти потрібне за словами.
        </p>
      </header>

      <WorksGallery works={workExamples} />

      <div className="mt-10 sm:mt-14 text-center">
        <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
          Потрібен ремонт? Зв&apos;яжіться з нами.
        </p>
        <Link
          href={ROUTES.CONTACT}
          className="
            inline-flex items-center justify-center min-h-[44px] gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base
            bg-cyan-500 text-black font-semibold
            hover:bg-cyan-400 transition shadow-[0_0_30px_rgba(0,229,255,0.4)] touch-manipulation
          "
        >
          Зв&apos;язатися
        </Link>
      </div>
    </div>
  );
}
