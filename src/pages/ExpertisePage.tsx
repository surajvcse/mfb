import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { expertise } from '../content/expertise'
import { projectImage, projectPath } from '../content/projectGallery'

export function ExpertisePage() {
  return (
    <>
      <PageTitle title="Our Expertise" />
      <section className="relative isolate flex min-h-[min(34rem,68svh)] items-end overflow-hidden bg-[#07172F] py-12 text-paper sm:py-16" aria-labelledby="expertise-page-title">
        <img className="projects-hero-photo absolute inset-0 -z-20 size-full object-cover object-[center_45%]" src={projectImage(8)} alt="" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#07172F] via-[#07172F]/82 to-[#07172F]/25" aria-hidden="true" />
        <div className="site-shell projects-hero-copy">
          <p className="eyebrow text-gold">MFB Geotech</p>
          <h1 id="expertise-page-title" className="font-bold tracking-tight">Our Expertise</h1>
          <p className="mt-5 max-w-2xl border-l-4 border-gold pl-4 text-lg sm:text-xl">
            Specialist design and construction for challenging ground, underground works, and infrastructure.
          </p>
        </div>
      </section>

      <nav className="border-b border-line bg-white" aria-label="Expertise areas">
        <ul className="site-shell flex flex-wrap gap-x-5 gap-y-1 py-2">
          {expertise.map(({ id, title }) => (
            <li key={id}><a className="inline-flex min-h-11 items-center border-b-2 border-transparent text-sm font-semibold hover:border-gold" href={`#${id}`}>{title}</a></li>
          ))}
        </ul>
      </nav>

      <div className="divide-y divide-line">
        {expertise.map(({ id, title, summary, photo, photoCaption, projectSlug, services }, index) => (
          <section className="scroll-mt-24 bg-white even:bg-paper" id={id} aria-labelledby={`${id}-title`} key={id}>
            <div className="site-shell grid items-start gap-7 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <div className={index % 2 === 0 ? '' : 'lg:col-start-2 lg:row-start-1'}>
                <h2 className="border-l-4 border-gold pl-4 text-2xl leading-tight font-bold sm:text-3xl" id={`${id}-title`}>{title}</h2>
                <p className="mt-4 max-w-prose text-lg">{summary}</p>
                <ul className="mt-5 grid list-disc gap-x-6 gap-y-2 pl-5 marker:text-ink sm:grid-cols-2">
                  {services.map((service) => <li key={service}>{service}</li>)}
                </ul>
              </div>
              <figure className={`expertise-image-reveal group min-w-0 ${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                <Link className="block overflow-hidden rounded-2xl border border-line focus-visible:-outline-offset-4" to={projectPath(projectSlug)} aria-label={`View project: ${photoCaption}`}>
                  <img className="aspect-[4/3] w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105" src={projectImage(photo)} alt="" loading="lazy" decoding="async" />
                </Link>
                <figcaption className="mt-3 border-l-2 border-gold pl-3 text-sm font-semibold">{photoCaption}</figcaption>
              </figure>
            </div>
          </section>
        ))}
      </div>

    </>
  )
}
