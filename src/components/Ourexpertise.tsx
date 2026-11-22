import { FiRefreshCw } from 'react-icons/fi'
import groundworksPhoto from '../Assets/hero/50.jpg'

const expertise = [
  {
    title: 'Slope stabilisation',
    summary: 'Slope reinforcement, drainage, and rockfall protection.',
    services: [
      'Ground and cable anchors', 'Self-drilling anchors and rock bolts', 'Shotcrete',
      'Crib work', 'Wicker fencing', 'Wire netting', 'Rockfall barriers',
      'Drain holes', 'Other natural hazard mitigation',
    ],
  },
  {
    title: 'Ground improvement and foundation engineering',
    summary: 'Grouting, piling, and ground retention for demanding sites.',
    services: [
      'Jet grouting', 'TAM grouting', 'Fissure grouting', 'Chemical grouting',
      'Cavity grouting', 'Deep-hole drilling and grouting', 'Water leakage control',
      'Secant and contiguous piling', 'Soldier and sheet piling', 'Micropiling',
      'King posts and plunge columns', 'Diaphragm walls',
    ],
  },
  {
    title: 'Design-build solutions',
    summary: 'Integrated design and construction for rehabilitation and infrastructure.',
    services: [
      'Slope stabilisation', 'Ground improvement', 'Tunnel rehabilitation',
      'Deep-seated slope failure remediation', 'Dam rehabilitation',
      'Bridge rehabilitation', 'Hydropower projects', 'Underground mining projects',
    ],
  },
  {
    title: 'Tunnelling and specialised construction',
    summary: 'Underground works, mining operations, and specialist civil construction.',
    services: [
      'Mine development and operation (MDO) for metal and coal', 'NATM tunnelling',
      'Cut-and-cover tunnelling', 'Cross passages', 'Pipe roofing and forepoling',
      'Raise-bore shaft sinking', 'Surge shaft excavation', 'Underground cavern excavation',
      'Pipe jacking and microtunnelling',
      'Sewerage works including HDD, manual jack pushing, open-cut excavation, and manholes',
      'TBM tunnelling for metro and sewer systems', 'Dredging',
      'Gabion and concrete retaining walls', 'Roadworks', 'Underwater concreting',
      'Steel and structural works',
    ],
  },
]

const card = 'rounded-2xl border border-line bg-white/90 shadow-sm'

export function OurExpertise() {
  return (
    <section className="grid min-h-svh items-center border-t border-line bg-linear-to-br from-paper to-[#E5F2FA] py-14 sm:py-20" aria-labelledby="expertise-title">
      <div className="site-shell">
        <h2 id="expertise-title" className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-black tracking-tight uppercase">
          Our <span className="text-[#4E5697]">expertise</span>
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">
          Specialist design and construction teams for complex ground engineering projects.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {expertise.map(({ title, summary, services }, index) => (
            <details
              className={`${card} expertise-flip group relative isolate min-w-0 overflow-hidden border-t-4 border-t-gold/80 open:bg-[#FFF9DD] ${index === 3 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              key={title}
            >
              <summary className={`relative isolate flex min-h-40 cursor-pointer list-none items-start justify-between gap-3 rounded-2xl p-6 focus-visible:-outline-offset-4 lg:min-h-44 group-open:min-h-0 lg:group-open:min-h-0 [&::-webkit-details-marker]:hidden ${index === 3 ? 'pb-42 md:pr-[42%] md:pb-6' : ''}`}>
                {index === 3 && (
                  <span
                    className="pointer-events-none absolute inset-x-6 bottom-4 -z-10 h-34 bg-contain bg-center bg-no-repeat md:inset-y-4 md:right-5 md:left-auto md:h-auto md:w-[38%] md:bg-right"
                    style={{ backgroundImage: `url("${groundworksPhoto}")` }}
                    aria-hidden="true"
                  />
                )}
                <span className="min-w-0 self-center">
                  <span className="block text-lg leading-tight font-black tracking-tight uppercase sm:text-xl">{title}</span>
                  <span className="mt-3 block max-w-xl leading-relaxed text-[#393D7E] group-open:hidden">{summary}</span>

                </span>
                <span className="flex shrink-0 items-center gap-2 rounded-full bg-gold px-3 py-2 text-xs font-bold">
                  <FiRefreshCw aria-hidden="true" className="size-3.5" />
                  <span className="sr-only group-open:hidden">View capabilities</span>
                  <span className="hidden group-open:inline">Back<span className="sr-only"> to overview</span></span>
                </span>
              </summary>
              <ul className={`grid list-disc gap-2 border-t border-gold/50 bg-[#FFF9DD] py-5 pr-5 pl-10 marker:text-gold ${index === 3 ? 'md:grid-cols-2 md:gap-x-9' : ''}`}>
                {services.map((service) => <li key={service}>{service}</li>)}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
