import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { ROUTES } from "@/constants/routes";

export default function Cta() {
  return (
    <section
      className="py-14 sm:py-20 md:py-24 text-center"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full box-border">
        <div
          className="
            bg-cyan-500/10 border border-cyan-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12
            shadow-[0_0_40px_rgba(0,229,255,0.15)]
          "
        >
          <h2 id="cta-heading" className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">
            Потрібен ремонт?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
            Зателефонуйте нам або напишіть у Telegram. Ми підберемо зручний час та
            допоможемо з будь-яким питанням.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={ROUTES.CONTACT}>Зв&apos;язатися зараз</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
