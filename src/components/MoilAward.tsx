import { FiAward } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { projectPath } from '../content/projectGallery'

export function MoilAward() {
  return (
    <section className="border-y border-gold/50 bg-white text-ink" aria-labelledby="moil-award-title">
      <div className="project-shell grid justify-items-center gap-4 py-5 text-center sm:py-6">
        <div className="grid justify-items-center gap-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gold/25 sm:size-11">
            <FiAward className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="mb-1 text-sm font-bold tracking-wide uppercase">Project award</p>
            <h2 id="moil-award-title" className="font-sans text-xl leading-tight font-bold tracking-tight sm:text-2xl">
              MOIL Limited awards two turnkey shaft projects
            </h2>
            <p className="mx-auto mt-2 max-w-3xl text-pretty">
              MFB Geotech will design, construct, furnish, and equip production shafts at Kandri Mine and Dongri Buzurg Mine.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
              <Link className="text-link" to={projectPath('kandri')}>Kandri Mine</Link>
              <Link className="text-link" to={projectPath('dongri-buzurg')}>Dongri Buzurg Mine</Link>
            </div>
          </div>
        </div>
        <dl className="flex w-fit flex-wrap items-baseline justify-center gap-x-3 gap-y-1 rounded-lg border border-gold/60 bg-[#FFF9E5] px-4 py-2">
          <dt className="order-2 text-sm font-semibold">Production shaft depth</dt>
          <dd className="text-2xl leading-none font-black whitespace-nowrap lg:text-3xl">505 m</dd>
        </dl>
      </div>
    </section>
  )
}
