import { FiMinus, FiPlus } from 'react-icons/fi'
import groundworksPhoto from '../Assets/hero/50.jpg'
import { expertise } from '../content/expertise'

export function OurExpertise() {
  return (
    <section className="relative isolate grid min-h-svh items-center overflow-hidden border-t border-line bg-paper py-12 sm:py-16" aria-labelledby="expertise-title">
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url("${groundworksPhoto}")` }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-paper/85 via-paper/95 to-paper" aria-hidden="true" />
      <div className="site-shell grid items-start gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
        <div>
          <h2 id="expertise-title" className="border-l-4 border-gold pl-4 font-sans leading-tight font-bold tracking-tight">
            Our expertise
          </h2>
          <p className="mt-4 max-w-md text-intro leading-relaxed">
            Specialist design and construction teams for complex ground engineering projects.
          </p>
        </div>

        <div className="divide-y divide-ink/20 border-y border-ink/20">
          {expertise.map(({ title, summary, services }) => (
            <details className="expertise-flip group" key={title}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-5 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block text-card-title leading-tight font-bold sm:text-xl">{title}</span>
                  <span className="mt-2 block leading-relaxed text-ink/85">{summary}</span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-gold bg-gold text-ink transition-colors group-hover:border-ink group-open:border-ink" aria-hidden="true">
                  <FiPlus className="size-4 group-open:hidden" />
                  <FiMinus className="hidden size-4 group-open:block" />
                </span>
              </summary>
              <ul className="grid list-disc gap-x-8 gap-y-2 pb-5 pl-5 marker:text-ink/70 sm:grid-cols-2">
                {services.map((service) => <li key={service}>{service}</li>)}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
