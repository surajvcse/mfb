import { useRef } from 'react'
import { FiArrowLeft, FiBriefcase, FiChevronLeft, FiChevronRight, FiMapPin, FiMaximize2 } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { projectImage, projectLocation, projects } from '../content/projectGallery'
import { NotFoundPage } from './NotFoundPage'

const photoArrowClass = 'pointer-events-auto grid size-12 cursor-pointer place-items-center rounded-full border-2 border-white bg-gold text-ink shadow-lg hover:bg-white focus-visible:outline-white sm:size-14'

export function ProjectDetailPage() {
  const gallery = useRef<HTMLDivElement>(null)
  const { projectSlug } = useParams()
  const project = projects.find(({ slug }) => slug === projectSlug)
  if (!project) return <NotFoundPage />

  function scrollPhotos(direction: number) {
    const viewport = gallery.current
    if (viewport) viewport.scrollBy({ left: direction * viewport.clientWidth })
  }

  return (
    <>
      <PageTitle title={project.title} />
      <div className="site-shell py-8 sm:py-12 lg:py-14">
        <header>
          <Link className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold hover:underline hover:decoration-gold hover:underline-offset-4" to="/projects">
            <FiArrowLeft aria-hidden="true" />
            All projects
          </Link>
          <p className="eyebrow mt-5">{project.category}</p>
          <h1 className="max-w-5xl text-balance leading-[1.08] font-bold">
            {project.title}
          </h1>
          <dl className="mt-6 grid gap-y-4 border-y border-line py-4 sm:flex sm:flex-wrap sm:gap-x-12">
            <div className="flex min-w-0 items-start gap-3">
              <FiMapPin className="mt-1 size-5 shrink-0 text-red-600" aria-hidden="true" />
              <div>
                <dt className="text-sm font-semibold">Location</dt>
                <dd className="mt-1">{projectLocation(project.location)}</dd>
              </div>
            </div>
            {project.client && (
              <div className="flex min-w-0 items-start gap-3">
                <FiBriefcase className="mt-1 size-5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold">Client</dt>
                  <dd className="mt-1">{project.client}</dd>
                </div>
              </div>
            )}
          </dl>
        </header>

        <section className="mt-8 sm:mt-10" aria-labelledby="project-photos-title">
          <h2 id="project-photos-title" className="mb-4 border-l-4 border-gold pl-3 text-subsection-title leading-tight font-bold">Project photos</h2>
          <div className="relative">
            {project.photos.length > 1 && (
              <div className="pointer-events-none absolute z-10 inset-x-2 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-4" aria-label="Photo navigation" role="group">
                <button className={photoArrowClass} type="button" aria-label="Previous photo" onClick={() => scrollPhotos(-1)}>
                  <FiChevronLeft className="size-7" strokeWidth={2.8} aria-hidden="true" />
                </button>
                <button className={photoArrowClass} type="button" aria-label="Next photo" onClick={() => scrollPhotos(1)}>
                  <FiChevronRight className="size-7" strokeWidth={2.8} aria-hidden="true" />
                </button>
              </div>
            )}
            <div
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-xl pb-3 motion-safe:scroll-smooth"
              ref={gallery}
              key={project.slug}
              tabIndex={project.photos.length > 1 ? 0 : undefined}
              role="region"
              aria-label="Project photo gallery"
            >
              {project.photos.map((photo, index) => (
                <a
                  className="group relative grid w-full shrink-0 snap-start place-items-center self-start overflow-hidden rounded-xl border border-line bg-white hover:border-gold focus-visible:-outline-offset-4"
                  href={projectImage(photo)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} photo ${index + 1} in a new tab`}
                  key={photo}
                >
                  <img
                    className="h-auto max-h-[85svh] w-full object-contain"
                    src={projectImage(photo)}
                    alt=""
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : undefined}
                    decoding="async"
                  />
                  <span className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-[#07172F]/90 text-paper group-hover:bg-gold group-hover:text-ink" aria-hidden="true">
                    <FiMaximize2 className="size-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
