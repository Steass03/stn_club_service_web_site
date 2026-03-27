import { Button } from "@/components/UI/Button";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

export default function Hero() {
  return (
    <section className="py-12 sm:py-20 md:py-28 lg:py-32 text-center" aria-label="Головний банер">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full box-border">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 break-words">
          {siteConfig.siteName}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 px-0 break-words">
          {siteConfig.tagline}
        </p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          <Button href={`tel:${siteConfig.phone.replaceAll(/\s/g, "")}`}>
            📞 Зателефонувати
          </Button>
          <Button href={siteConfig.telegram} variant="secondary">
            💬 Telegram
          </Button>
          <Button href={ROUTES.CONTACT} variant="ghost">
            Написати нам
          </Button>
        </div>
      </div>
    </section>
  );
}
