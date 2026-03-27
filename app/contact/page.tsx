import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: `Зв'яжіться з ${siteConfig.siteName}: телефон, Telegram, адреса та відгуки на Google Maps.`,
};

export default function ContactPage() {
  const hasGoogleMaps = Boolean(siteConfig.googleMapsUrl?.trim());

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24 w-full box-border">
      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
          Контакти
        </h1>
        <p className="text-gray-400 text-base sm:text-lg">
          Зателефонуйте або напишіть у Telegram — ми відповімо найближчим часом.
        </p>
      </header>

      <div className="space-y-10 sm:space-y-12">
        {/* Call & Telegram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <a
            href={`tel:${siteConfig.phone.replaceAll(/\s/g, "")}`}
            className="
              flex items-center gap-4 p-5 sm:p-6 rounded-xl sm:rounded-2xl
              bg-[#121826] border border-white/10
              hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition
            "
          >
            <span className="text-3xl" aria-hidden>📞</span>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">Зателефонувати</h2>
              <p className="text-cyan-400 font-medium text-lg">{siteConfig.phone}</p>
              <p className="text-gray-500 text-sm mt-1">Натисніть для дзвінка</p>
            </div>
          </a>

          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-4 p-5 sm:p-6 rounded-xl sm:rounded-2xl
              bg-[#121826] border border-white/10
              hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)] transition
            "
          >
            <span className="text-3xl" aria-hidden>💬</span>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-1">Telegram</h2>
              <p className="text-cyan-400 font-medium">Відкрити чат</p>
              <p className="text-gray-500 text-sm mt-1">Напишіть нам у месенджер</p>
            </div>
          </a>
        </div>

        {siteConfig.address && (
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Адреса</h2>
            <p className="text-gray-400">{siteConfig.address}</p>
          </div>
        )}

        {/* Google Maps — reviews & directions */}
        {hasGoogleMaps && (
          <div
            className="
              p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl
              bg-cyan-500/10 border border-cyan-500/30
              shadow-[0_0_40px_rgba(0,229,255,0.1)]
            "
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Відгуки на Google Maps
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">
              Перегляньте відгуки клієнтів або залиште свій відгук про наш сервіс —
              на сторінці в Google Maps є кнопка «Написати відгук».
            </p>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center min-h-[44px] gap-2
                px-5 sm:px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base
                bg-cyan-500 text-black hover:bg-cyan-400 transition
                shadow-[0_0_20px_rgba(0,229,255,0.3)] touch-manipulation
              "
            >
              <span aria-hidden>📍</span>{" "}
              Відкрити в Google Maps
            </a>
          </div>
        )}

        {!hasGoogleMaps && (
          <p className="text-gray-500 text-sm">
            Посилання на Google Maps буде додано пізніше — там можна переглянути та
            залишити відгуки.
          </p>
        )}
      </div>
    </div>
  );
}
