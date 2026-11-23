import { useEffect, useState } from 'react'
import { FiPause, FiPlay } from 'react-icons/fi'
import { Link } from 'react-router-dom'

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
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-[#091d43] pt-36 pb-24 text-paper" aria-labelledby="hero-title">
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

      <div className="site-shell">
        <h1 id="hero-title" className="font-sans text-[clamp(3rem,8vw,7.5rem)] leading-none font-black tracking-tight">
          MFB Geotech
        </h1>
        <p className="mt-4 text-lg font-semibold sm:text-2xl">
          A fast-growing multinational construction company
        </p>
        <ul className="mt-5 flex max-w-2xl flex-wrap gap-2" aria-label="Core services">
          {['Tunnelling', 'Foundations', 'Slope stabilisation', 'Ground improvement'].map((service) => (
            <li className="rounded-md border border-gold/65 bg-[#07172F]/85 px-3 py-2 text-sm font-bold text-gold sm:text-base" key={service}>
              {service}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-base sm:text-lg">
          We provide cost-effective, one-stop solutions by combining specialist design and construction.
          Our highly qualified teams and advanced equipment support safe, reliable project delivery.
        </p>
        <Link className="button mt-6 focus-visible:outline-paper" to="/contact">Discuss your project</Link>
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
