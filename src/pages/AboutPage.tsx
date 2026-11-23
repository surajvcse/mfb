import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { MoilAward } from '../components/MoilAward'
import { NumberSection } from '../components/numbersection'
import { expertise } from '../content/expertise'
import { projectImage, projectPath } from '../content/projectGallery'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'recognition', label: 'Project award' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'industries', label: 'Industries' },
]

const industries = [
  'Infrastructure and civil construction',
  'Roads, highways, and bridges',
  'Metro, rail, and underground infrastructure',
  'Commercial and industrial construction',
  'Hydropower and energy infrastructure',
  'Ports and marine infrastructure',
  'Urban development and complex excavation',
]

export function AboutPage() {
  const expertiseGrid = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = Array.from(expertiseGrid.current?.children ?? [])
    if (!('IntersectionObserver' in window) || cards.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        target.setAttribute('data-in-view', String(isIntersecting))
      }
    }, { rootMargin: '-5% 0px -10% 0px' })

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageTitle title="About" />
      <section className="relative isolate flex min-h-[min(39rem,75svh)] items-end overflow-hidden bg-[#07172F] pt-20 pb-12 text-paper sm:pt-24 sm:pb-16" aria-labelledby="about-title">
        <img className="absolute inset-0 -z-20 size-full object-cover object-[center_55%] contrast-[1.08] saturate-[1.06]" src={projectImage(10)} alt="" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#07172F]/95 via-[#07172F]/75 to-transparent lg:bg-linear-to-r lg:from-[#07172F]/95 lg:via-[#07172F]/65 lg:via-48% lg:to-transparent" aria-hidden="true" />
        <div className="site-shell projects-hero-copy">
          <p className="eyebrow text-gold">About MFB Geotech</p>
          <h1 id="about-title" className="max-w-[19ch] text-balance leading-[1.08] font-bold tracking-tight">
            Engineering the ground. Building stronger foundations.
          </h1>
          <p className="mt-5 max-w-xl border-l-4 border-gold pl-4 text-intro text-paper/95">
            Specialised geotechnical engineering and construction across South Asia and the Middle East.
          </p>
        </div>
      </section>

      <nav className="border-b border-line bg-white" aria-label="On this page">
        <ul className="site-shell flex flex-wrap gap-x-5 gap-y-1 py-2 sm:gap-x-8">
          {sections.map(({ id, label }) => (
            <li key={id}><a className="inline-flex min-h-11 items-center border-b-2 border-transparent font-semibold hover:border-gold" href={`#${id}`}>{label}</a></li>
          ))}
        </ul>
      </nav>

      <section id="overview" className="site-shell section-padding grid scroll-mt-24 items-center gap-8 md:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <h2>Who we are</h2>
          <p className="mt-5">Headquartered in India, MFB Geotech is a fast-growing multinational construction company specialising in tunnelling, foundations, slope stabilisation, and ground improvement. We bring more than a decade of experience to projects with challenging ground conditions.</p>
          <p className="mt-4">We bring design and specialised construction together to deliver practical, cost-effective solutions tailored to each site. Our qualified teams use advanced equipment and proven construction methods to support safe, reliable project delivery.</p>
        </div>
        <img
          className="expertise-image-reveal aspect-[4/3] w-full rounded-2xl object-cover"
          src={projectImage(23)}
          alt="Munnar hydropower tunnel works"
          loading="lazy"
          decoding="async"
        />
      </section>

      <div id="recognition" className="scroll-mt-24"><MoilAward /></div>

      <NumberSection compact />

      <section id="expertise" className="scroll-mt-24 border-y border-line bg-paper" aria-labelledby="about-expertise-title">
        <div className="site-shell section-padding">
          <div className="flex flex-wrap items-end justify-between gap-5 border-b border-line pb-5">
            <div>
              <h2 id="about-expertise-title" className="border-l-4 border-gold pl-4 font-sans font-bold">
                Our expertise
              </h2>
              <p className="mt-4 max-w-2xl text-sm">
                We bring engineering design and specialist construction together for complex ground and infrastructure projects.
              </p>
            </div>
            <Link className="button" to="/services">
              Explore all capabilities
            </Link>
          </div>

          <div ref={expertiseGrid} className="mt-7 grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {expertise.map(({ id, title, summary, photo, photoCaption, projectSlug }) => (
              <div className="about-expertise-slot min-w-0" key={id}>
                <article className="about-expertise-card h-full overflow-hidden rounded-xl border-2 border-gold bg-white">
                  <Link className="group block overflow-hidden focus-visible:-outline-offset-4" to={projectPath(projectSlug)} aria-label={`View project: ${photoCaption}`}>
                    <img className="aspect-[16/10] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105" src={projectImage(photo)} alt="" loading="lazy" decoding="async" />
                  </Link>
                  <div className="border-t-2 border-gold px-5 py-4">
                    <h3 className="leading-snug">{title}</h3>
                    <p className="mt-2 text-sm text-ink/85">{summary}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="scroll-mt-24 border-y border-line bg-white">
        <div className="site-shell section-padding grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <img
            className="expertise-image-reveal aspect-[4/3] w-full rounded-2xl object-cover"
            src={projectImage(8)}
            alt="Pallivasal hydropower project site"
            loading="lazy"
            decoding="async"
          />
          <div>
            <h2>Industries we serve</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {industries.map((industry) => (
                <li className="flex items-start gap-3 py-3 before:mt-2 before:size-2 before:shrink-0 before:rounded-full before:bg-gold" key={industry}>{industry}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
