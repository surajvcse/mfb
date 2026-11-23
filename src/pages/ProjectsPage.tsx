import { FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { projectGroups, projectImage, projectPath } from '../content/projectGallery'

export function ProjectsPage() {
  return (
    <>
      <PageTitle title="Our Projects" />
      <section className="relative isolate grid min-h-[min(39rem,75svh)] items-end overflow-hidden bg-[#07172F] py-14 text-paper sm:py-20" aria-labelledby="projects-title">
        <img className="projects-hero-photo absolute inset-0 -z-20 size-full object-cover object-[65%_43%]" src={projectImage(15)} alt="" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-linear-to-tr from-[#07172F] via-[#07172F]/75 to-[#07172F]/20" aria-hidden="true" />
        <div className="project-shell projects-hero-copy">
          <p className="eyebrow text-gold">MFB Geotech projects</p>
          <h1 id="projects-title" className="font-sans font-black tracking-tight">Our Projects</h1>
          <p className="mt-5 max-w-2xl text-intro">
            Explore our work in hydropower, mining, tunnelling, slope stabilisation, and dredging.
          </p>
          <a className="button mt-7 focus-visible:outline-paper" href="#project-portfolio">Explore</a>
        </div>
      </section>

      <section className="border-b border-line bg-white" aria-label="Portfolio at a glance">
        
      </section>

      <div id="project-portfolio" className="scroll-mt-24 bg-paper">
        {projectGroups.map(({ id, title, projects: groupProjects }) => (
          <section className="scroll-mt-24 border-b border-line bg-white py-10 even:bg-paper sm:py-14" id={id} aria-labelledby={`${id}-title`} key={id}>
            <div className="project-shell">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
                <h2 id={`${id}-title`} className="border-l-4 border-gold pl-4 font-sans text-subsection-title leading-tight font-bold">{title}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
                {groupProjects.map(({ slug, title: projectName, location, client, photos: [coverPhoto] }) => (
                  <Link className="projects-photo-tile group grid overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-colors hover:border-gold focus-visible:-outline-offset-4" to={projectPath(slug)} key={slug}>
                    <div className="overflow-hidden">
                      <img className="aspect-[4/3] w-full bg-paper object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105" src={projectImage(coverPhoto)} alt="" loading="lazy" decoding="async" />
                    </div>
                    <div className="self-start px-4 py-4">
                      <h3 className="text-base leading-snug group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">{projectName}</h3>
                      {location && (
                        <p className="mt-2 flex items-start gap-2 text-sm">
                          <FiMapPin className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                          {location}
                        </p>
                      )}
                      {client && <p className="mt-2 text-sm"><strong>Client:</strong> {client}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
