import { services } from "@/lib/data";

const cardClass = `
  bg-[#121826] border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8
  transition hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,229,255,0.2)]
  min-w-0
`;

export default function Services() {
  return (
    <section
      id="services"
      className="py-14 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full box-border">
        <h2
          id="services-heading"
          className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 text-center"
        >
          Наші послуги
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <article key={service.id} className={cardClass}>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex flex-wrap items-center gap-2">
                <span className="text-2xl leading-none" aria-hidden>
                  {service.icon}
                </span>
                <span>{service.title}</span>
              </h3>
              <ul className="text-gray-400 text-sm sm:text-base space-y-2 list-none pl-0">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="text-cyan-500/90 shrink-0 select-none" aria-hidden>
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
