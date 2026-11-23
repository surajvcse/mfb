import { FiAward, FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { projectImage, projectPath, projects } from '../content/projectGallery'

const awardedProjects = projects.filter(({ slug }) => slug === 'dongri-buzurg' || slug === 'kandri')

export function MoilAward() {
  return (
    <section className="border-t-2 border-t-gold border-b border-b-line bg-white text-ink" aria-labelledby="moil-award-title">
      <div className="project-shell award-scroll-reveal grid justify-items-center gap-4 py-5 text-center sm:py-6">
        <div className="grid justify-items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/25 sm:size-11">
            <FiAward className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="mb-1 text-sm font-bold tracking-wide uppercase">Project award</p>
            <h1 id="moil-award-title" className="font-sans text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
            AWARDS
            </h1>
            <p className="mx-auto mt-2 max-w-3xl text-pretty">
              WE HAVE BEEN AWARDED WITH TWO TURNKEY PROJECTS BY MOIL LIMITED FOR THE DESIGN, CONSTRUCTION, FURNISHING, AND EQUIPPING OF PRODUCTION SHAFTS AT KANDRI MINE AND DONGRI BUZURG MINE. DEPTH 505 MTR.
            </p>
          </div>
        </div>
        <dl className="flex w-fit flex-wrap items-baseline justify-center gap-x-3 gap-y-1 rounded-lg border border-gold/60 bg-gold/15 px-4 py-2">
          <dt className="order-2 text-sm font-semibold">Production shaft depth</dt>
          <dd className="text-2xl leading-none font-black whitespace-nowrap lg:text-3xl">505 m</dd>
        </dl>
      </div>
      <ul className="site-shell grid gap-4 pb-6 sm:grid-cols-2 sm:gap-5 sm:pb-8">
        {awardedProjects.map(({ slug, title, location, client, photos }) => (
          <li className="min-w-0" key={slug}>
            <Link className="group block h-full overflow-hidden rounded-xl border border-line bg-paper hover:border-gold focus-visible:-outline-offset-4" to={projectPath(slug)}>
              <img className="aspect-[16/7] w-full object-cover object-center" src={projectImage(photos[0])} alt="" loading="lazy" decoding="async" />
              <div className="border-t-2 border-gold px-5 py-4">
                <h3 className="text-lg leading-snug group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{title}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm">
                  <FiMapPin className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                  {location}
                </p>
                <p className="mt-1 text-sm"><strong>Client:</strong> {client}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
