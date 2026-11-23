import { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiMapPin, FiPause, FiPlay } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { projectImage, projectPath, projects } from '../content/projectGallery'

const motionPreference = '(prefers-reduced-motion: reduce)'
const controlClass = 'grid size-11 place-items-center rounded-full border border-line bg-white/95 text-ink shadow-sm hover:border-gold hover:bg-gold'

export function ProjectStrip() {
  const slider = useRef<Slider>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(motionPreference).matches)
  const [playing, setPlaying] = useState(() => !window.matchMedia(motionPreference).matches)

  useEffect(() => {
    const preference = window.matchMedia(motionPreference)
    function updateMotion(event: MediaQueryListEvent) {
      setReducedMotion(event.matches)
      if (event.matches) setPlaying(false)
    }

    preference.addEventListener('change', updateMotion)
    return () => preference.removeEventListener('change', updateMotion)
  }, [])

  return (
    <section className="overflow-hidden border-b border-line bg-paper py-10 sm:py-14" aria-labelledby="project-strip-title">
      <div className="project-shell grid grid-cols-[1fr_auto_1fr] items-center">
        <h2 id="project-strip-title" className="col-start-2 px-2 text-center font-sans text-[clamp(1.75rem,5vw,3.75rem)] leading-tight font-bold tracking-tight text-ink after:mx-auto after:mt-3 after:block after:h-1 after:w-12 after:rounded-full after:bg-gold sm:after:w-16">
          Our Projects
        </h2>
        <button className={`${controlClass} justify-self-end`} type="button" aria-label={playing ? 'Pause carousel' : 'Play carousel'} onClick={() => setPlaying((current) => !current)}>
          {playing ? <FiPause aria-hidden="true" /> : <FiPlay aria-hidden="true" />}
        </button>
      </div>
      <div className="relative mt-7">
        <Slider
          ref={slider}
          className="project-slick"
          arrows={false}
          centerMode
          centerPadding="12%"
          slidesToShow={3}
          responsive={[{ breakpoint: 1023, settings: { slidesToShow: 1, centerPadding: '18%' } }]}
          infinite
          swipeToSlide
          autoplay={playing}
          autoplaySpeed={100}
          speed={reducedMotion ? 0 : playing ? 2800 : 350}
          cssEase={playing ? 'linear' : 'ease-out'}
          pauseOnHover
          pauseOnFocus
          afterChange={setActiveIndex}
        >
          {projects.map(({ slug, title, photos, location, client }, index) => (
            <div className="h-full px-1.5 sm:px-2" key={slug}>
              <Link className="project-slick-card block h-full overflow-hidden rounded-2xl border border-line bg-white focus-visible:-outline-offset-4" to={projectPath(slug)} tabIndex={index === activeIndex ? 0 : -1}>
                <img className="h-[clamp(15rem,26vw,25rem)] w-full object-cover" src={projectImage(photos[0])} alt="" loading="lazy" decoding="async" />
                <div className="px-4 py-3 sm:px-5 sm:py-4">
                  <h3 className="text-base leading-snug sm:text-lg">{title}</h3>
                  {location && (
                    <p className="mt-1 flex items-start gap-2 text-sm">
                      <FiMapPin className="mt-1 shrink-0 text-red-600" aria-hidden="true" />
                      {location}
                    </p>
                  )}
                  {client && <p className="mt-1 text-sm"><strong>Client:</strong> {client}</p>}
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        <button className={`${controlClass} absolute top-[clamp(7.5rem,13vw,12.5rem)] left-3 -translate-y-1/2 sm:left-6`} type="button" aria-label="Previous project" onClick={() => slider.current?.slickPrev()}>
          <FiChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button className={`${controlClass} absolute top-[clamp(7.5rem,13vw,12.5rem)] right-3 -translate-y-1/2 sm:right-6`} type="button" aria-label="Next project" onClick={() => slider.current?.slickNext()}>
          <FiChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

    </section>
  )
}
