import { useRef, useState } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { projectGroups, projectImage, projectLocation, projectPath, projects } from '../content/projectGallery'

const categories = [
  { id: 'hydropower', label: 'Hydro Power Projects' },
  { id: 'mining', label: 'Mining Work' },
  { id: 'tunnelling', label: 'Tunnel Work' },
  { id: 'geotechnical', label: 'Geotechnical & Slope Stabilisation Work' },
  { id: 'dredging', label: 'Dredging Work' },
]

function ProjectList({ items, duplicate = false }: { items: typeof projects; duplicate?: boolean }) {
  return (
    <ul className={`flex shrink-0 gap-3 pr-3 ${duplicate ? 'motion-reduce:hidden' : ''}`} aria-hidden={duplicate || undefined}>
      {items.map(({ slug, title, location, photos }) => (
        <li className="w-58 shrink-0" key={slug}>
          <Link
            className="block h-full overflow-hidden rounded-lg border border-line bg-white shadow-sm hover:border-gold focus-visible:-outline-offset-4"
            to={projectPath(slug)}
            tabIndex={duplicate ? -1 : undefined}
          >
            <img className="aspect-video w-full bg-paper object-cover" src={projectImage(photos[0])} alt="" loading="lazy" decoding="async" />
            <div className="p-4">
              <h3 className="text-base">{title}</h3>
              <p className="mt-2 flex items-start gap-2 text-sm">
                <FiMapPin className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
                {projectLocation(location)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function ProjectStrip() {
  const [paused, setPaused] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const viewport = useRef<HTMLDivElement>(null)
  const category = projectGroups.find(({ id }) => id === categoryId)
  const visibleProjects = category ? projects.filter(({ category: title }) => title === category.title) : projects

  function selectCategory(id: string) {
    if (viewport.current) viewport.current.scrollLeft = 0
    setCategoryId(id)
  }

  return (
    <section className="border-b border-line bg-paper py-8 sm:py-10" aria-labelledby="project-strip-title">
      <div className="project-shell">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 id="project-strip-title" className="font-sans text-2xl font-black tracking-tight sm:text-3xl">Our Projects</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link className="text-link" to="/projects">View all projects</Link>
            {!category && <button
              className="min-h-11 rounded-md border border-line bg-white px-3 text-sm font-semibold hover:border-ink motion-reduce:hidden"
              type="button"
              onClick={() => setPaused((current) => !current)}
            >
              {paused ? 'Resume scrolling' : 'Pause scrolling'}
            </button>}
          </div>
        </div>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter projects by category">
          {[{ id: '', label: 'All projects' }, ...categories].map(({ id, label }) => (
            <button
              className="min-h-11 shrink-0 rounded-full border border-line bg-white px-4 text-sm font-semibold hover:border-gold aria-pressed:border-gold aria-pressed:bg-gold"
              type="button"
              key={id}
              aria-pressed={categoryId === id}
              onClick={() => selectCategory(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          ref={viewport}
          className={`project-strip-window rounded-md ${category ? 'overflow-x-auto pb-3' : 'overflow-hidden motion-reduce:overflow-x-auto motion-reduce:pb-3'}`}
          tabIndex={category ? 0 : undefined}
          role="region"
          aria-label={category ? category.title + ' projects' : 'Featured projects'}
        >
          <div className={`flex w-max ${category ? '' : 'project-strip-track'}`} data-paused={paused}>
            <ProjectList items={visibleProjects} />
            {!category && <ProjectList items={visibleProjects} duplicate />}
          </div>
        </div>
      </div>
    </section>
  )
}
