"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ROUTES, NAV_LINKS } from "@/constants/routes";
import { siteConfig } from "@/config/site";

const navLinkClass =
  "text-gray-300 hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/5";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-between h-14 sm:h-16 w-full box-border">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 sm:gap-3 min-w-0 text-base sm:text-xl font-bold text-white hover:text-cyan-400 transition-colors"
        >
          <Image
            src={siteConfig.logoSrc}
            alt=""
            width={200}
            height={56}
            className="h-9 w-auto sm:h-10 object-contain object-left shrink-0"
            priority
          />
          <span className="truncate">{siteConfig.siteName}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClass}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${siteConfig.phone.replaceAll(/\s/g, "")}`}
            className="hidden sm:inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
          >
            <span aria-hidden>📞</span> {siteConfig.phone}
          </a>
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Відкрити меню"
          >
            {mobileOpen ? (
              <span className="text-xl">✕</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="md:hidden border-t border-white/10 bg-[#0b0f19] px-4 py-4 flex flex-col gap-1"
          aria-label="Мобільне меню"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={navLinkClass}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href={`tel:${siteConfig.phone.replaceAll(/\s/g, "")}`}
            className="text-cyan-400 font-medium py-2 px-3"
          >
            📞 {siteConfig.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
