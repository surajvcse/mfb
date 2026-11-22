import { FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { ProjectCallout } from '../components/ProjectCallout'
import { projectCover, projectGroups, projectImage, projectLocation, projectPath } from '../content/projectGallery'

export function ProjectsPage() {
  return (
    <>
      <PageTitle title="Our Projects" />
      <section className="relative isolate overflow-hidden bg-[#07172F] py-16 text-paper sm:py-24" aria-labelledby="projects-title">
        <img
          className="absolute inset-0 -z-20 size-full object-cover"
          src={projectCover}
          alt=""
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-[#07172F] via-[#07172F]/85 to-[#07172F]/40" aria-hidden="true" />
        <div className="project-shell">
          <p className="eyebrow text-gold">MFB Geotech</p>
          <h1 id="projects-title" className="font-sans font-black tracking-tight">Our Projects</h1>
          <p className="mt-5 max-w-xl text-lg">Site photography from our hydropower, mining, tunnelling, ground engineering, and dredging projects.</p>
        </div>
      </section>

      <div className="project-shell section-padding">
        <nav aria-label="Project gallery categories" className="flex flex-wrap gap-2 border-b border-line pb-6">
          {projectGroups.map(({ id, title }) => (
            <a className="rounded-md border border-line bg-white px-4 py-2 font-semibold hover:border-gold hover:bg-gold/15" href={`#${id}`} key={id}>
              {title}
            </a>
          ))}
        </nav>

        {projectGroups.map(({ id, title, projects }) => (
          <section className="scroll-mt-24 border-b border-line py-10 last:border-b-0 last:pb-0" id={id} aria-labelledby={`${id}-title`} key={id}>
            <h2 id={`${id}-title`}>{title}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.flatMap(({ slug, title: projectName, location, photos }) => photos.map((photo) => (
                <Link className="group block overflow-hidden rounded-xl border border-line bg-white shadow-sm hover:border-gold" to={projectPath(slug)} key={photo}>
                  <div className="overflow-hidden">
                    <img
                      src={projectImage(photo)}
                      alt=""
                      className="aspect-[4/3] w-full bg-paper object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="text-base">{projectName}</h3>
                    <p className="mt-2 flex items-start gap-2 text-sm">
                      <FiMapPin className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                      {projectLocation(location)}
                    </p>
                  </div>
                </Link>
              )))}
            </div>
          </section>
        ))}
      </div>
      <ProjectCallout />
    </>
  )
}
