import Image from "next/image";
import Link from "next/link";
import { ROUTES, NAV_LINKS } from "@/constants/routes";
import { siteConfig } from "@/config/site";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0f19]/80 mt-auto w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full box-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center gap-2 text-lg font-bold text-white hover:text-cyan-400 transition-colors"
            >
              <Image
                src={siteConfig.logoSrc}
                alt=""
                width={160}
                height={44}
                className="h-8 w-auto object-contain object-left shrink-0"
              />
              <span>{siteConfig.siteName}</span>
            </Link>
            <p className="mt-2 text-gray-400 text-xs sm:text-sm break-words">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Навігація
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Контакти
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replaceAll(/\s/g, "")}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  📞 {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  💬 Telegram
                </a>
              </li>
              {siteConfig.address && <li>{siteConfig.address}</li>}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
