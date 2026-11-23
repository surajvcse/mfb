import { FiMapPin } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { PageTitle } from '../components/PageTitle'
import { projectImage, projectLocation, projects } from '../content/projectGallery'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { projectSlug } = useParams()
  const project = projects.find(({ slug }) => slug === projectSlug)
  if (!project) return <NotFoundPage />

  return (
    <>
      <PageTitle title={project.title} />
      <section className="page-intro">
        <div className="site-shell">
          <Link className="text-link" to="/projects">All projects</Link>
          <p className="eyebrow mt-6">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="mt-5 flex items-start gap-2 text-lg">
            <FiMapPin className="mt-1 shrink-0 text-red-600" aria-hidden="true" />
            {projectLocation(project.location)}
          </p>
          {project.client && <p className="mt-2 text-lg"><strong>Client:</strong> {project.client}</p>}
        </div>
      </section>
      <section className="site-shell section-padding" aria-labelledby="project-photos-title">
        <h2 id="project-photos-title">Project photos</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {project.photos.map((photo, index) => (
            <a
              className="grid overflow-hidden rounded-xl border border-line bg-white hover:border-gold"
              href={projectImage(photo)}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} photo ${index + 1} in a new tab`}
              key={photo}
            >
              <img className="aspect-[4/3] w-full object-contain" src={projectImage(photo)} alt="" loading="lazy" decoding="async" />
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
