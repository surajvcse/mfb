import { useEffect, useState } from 'react'
import { FiArrowRight, FiPause, FiPlay } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { site } from '../content/site'

const photos = Object.entries(
  import.meta.glob<string>('../Assets/hero/*.jpg', { eager: true, import: 'default', query: '?url' }),
)
  .sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true }))
  .map(([, url]) => url)

const motionPreference = '(prefers-reduced-motion: reduce)'
const slideInterval = 3900

export function Hero() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia(motionPreference).matches)
  const index = step % photos.length
  const previous = (index + photos.length - 1) % photos.length
  const next = (index + 1) % photos.length

  useEffect(() => {
    const preference = window.matchMedia(motionPreference)
    const onChange = (event: MediaQueryListEvent) => setPlaying(!event.matches)
    preference.addEventListener('change', onChange)
    return () => preference.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => setStep((current) => current + 1), slideInterval)
    return () => window.clearTimeout(timer)
  }, [playing, step])

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-[#091d43] pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 text-paper" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {step > 0 && <img src={photos[previous]} alt="" className="hero-photo" />}
        <img
          key={step}
          src={photos[index]}
          alt=""
          className={step > 0 ? 'hero-photo hero-photo-enter' : 'hero-photo'}
          fetchPriority={step === 0 ? 'high' : 'auto'}
        />
        <img src={photos[next]} alt="" className="hidden" fetchPriority="low" />
        <div className="absolute inset-0 bg-linear-to-r from-[#091e43]/95 via-[#091e43]/75 to-[#091e43]/35 md:via-[#091e43]/60 md:to-[#091e43]/15" />
      </div>

      <div className="site-shell motion-safe:animate-[projects-copy-rise_750ms_ease-out_both]">
        <h1 id="hero-title" className="leading-none font-black tracking-tight sm:text-[clamp(2.75rem,6.5vw,6.25rem)]">
          {site.name}
        </h1>
        <p className="mt-3 text-intro leading-snug font-semibold sm:mt-4">
          A fast-growing multinational construction company
        </p>
        <ul className="mt-4 flex max-w-3xl flex-wrap gap-x-4 gap-y-2 sm:mt-5 sm:gap-x-6 sm:gap-y-3" aria-label="Core services">
          {['Tunnelling', 'Foundations', 'Slope stabilisation', 'Ground improvement'].map((service) => (
            <li className="text-sm font-semibold text-paper underline decoration-gold decoration-2 underline-offset-[0.4em] lg:text-base" key={service}>
              {service}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-2xl text-intro sm:mt-6">
          We provide cost-effective, one-stop solutions by combining specialist design and construction.
          Our highly qualified teams and advanced equipment support safe, reliable project delivery.
        </p>
        <Link className="group mt-5 inline-flex min-h-12 sm:mt-7 items-center gap-4 rounded-lg bg-gold px-4 py-3 text-sm font-bold text-ink shadow-lg hover:bg-paper focus-visible:outline-paper motion-safe:transition-colors sm:min-h-16 sm:gap-6 sm:px-7 lg:text-base" to="/contact">
          Discuss your project
          <FiArrowRight className="size-5 shrink-0 sm:size-6 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1.5 motion-safe:group-focus-visible:translate-x-1.5" aria-hidden="true" />
        </Link>
      </div>

      <button
        className="absolute right-4 bottom-4 grid size-11 cursor-pointer place-items-center rounded-full border border-paper/45 bg-[#091e43]/75 text-paper hover:bg-[#091e43] focus-visible:outline-paper sm:right-6 sm:bottom-6"
        type="button"
        aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
        onClick={() => setPlaying((current) => !current)}
      >
        {playing ? <FiPause className="size-4" aria-hidden="true" /> : <FiPlay className="size-4" aria-hidden="true" />}
      </button>
    </section>
  )
}
