import { useEffect, useRef, useState } from 'react'
import sitePhoto from '../Assets/hero/50.jpg'

const team = [
  { count: 120, label: 'Engineers' },
  { count: 200, label: 'Technicians' },
  { count: 300, label: 'Service staff' },
  { count: 1400, label: 'Site workers' },
]

const formatNumber = new Intl.NumberFormat('en-IN')

export function NumberSection({ compact = false }: { compact?: boolean }) {
  const counters = useRef<HTMLDListElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = counters.current
    if (!target) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (motion.matches) {
        setProgress(1)
        return
      }

      const start = performance.now()
      function animate(now: number) {
        const elapsed = Math.min(Math.max((now - start) / 1400, 0), 1)
        setProgress(1 - (1 - elapsed) ** 3)
        if (elapsed < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
    }, { threshold: 0.15 })

    observer.observe(target)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className={`relative isolate grid items-center overflow-hidden bg-[#07172F] text-paper ${compact ? 'py-12 sm:py-16' : 'min-h-svh py-16 sm:py-24'}`} aria-labelledby="team-numbers-title">
      <img className="absolute inset-0 -z-20 size-full object-cover" src={sitePhoto} alt="" loading="lazy" decoding="async" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#07172F]/95 via-[#07172F]/85 to-[#07172F]/75" aria-hidden="true" />
      <div className="site-shell">
        <p className="eyebrow text-gold">Our team</p>
        <h2 id="team-numbers-title" className="max-w-3xl text-balance font-sans text-[clamp(2.5rem,6vw,5rem)] leading-none font-black">
          MFB Geotech Team
        </h2>
        <dl ref={counters} className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4">
          {team.map(({ count, label }) => (
            <div className="flex min-w-0 flex-col-reverse gap-2 rounded-xl border border-paper/25 border-t-4 border-t-gold bg-[#07172F]/80 p-4 sm:p-6" key={label}>
              <dt className="text-sm font-semibold sm:text-base">{label}</dt>
              <dd className="text-[clamp(1.75rem,5vw,4.25rem)] leading-none font-black tracking-tight text-gold">
                <span className="sr-only">{formatNumber.format(count)}</span>
                <span aria-hidden="true" className="tabular-nums">{formatNumber.format(Math.round(count * progress))}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
