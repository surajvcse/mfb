import { Link } from 'react-router-dom'
import { projectGroups, projectPath } from '../content/projectGallery'
import { navigation } from '../content/site'

const serviceBase = '/services/'

const geotechServices = [
  { label: 'Foundation Engineering', path: 'foundation-engineering/' },
  { label: 'Ground Improvement', path: 'ground-improvement/' },
  { label: 'Slope Stabilisation / Deep Excavation', path: 'slope-stabilization/' },
]

export function ContactSiteMap() {
  return (
    <section className="border-t border-line bg-paper" aria-labelledby="site-map-title">
      <div className="site-shell section-padding">
        <h2 id="site-map-title">Site map</h2>
        <nav className="mt-7 grid gap-6 sm:grid-cols-2" aria-label="Contact page site map">
          <ul className="grid content-start gap-3">
            {navigation.filter(({ path }) => path !== '/').map(({ label, path }) => (
              <li key={path}><Link className="text-link" to={path}>{label}</Link></li>
            ))}
          </ul>
          <div>
            <h3>Service specialisations</h3>
            <ul className="mt-3 grid gap-3">
              <li>
                <a className="text-link" href={serviceBase + 'geotech-specialisation/'}>Geotech Specialisation</a>
                <ul className="mt-2 grid gap-2 border-l-2 border-gold pl-4">
                  {geotechServices.map(({ label, path }) => (
                    <li key={path}><a className="text-link" href={serviceBase + 'geotech-specialisation/' + path}>{label}</a></li>
                  ))}
                </ul>
              </li>
              <li><a className="text-link" href={serviceBase + 'tunneling/'}>Tunnelling</a></li>
              <li><a className="text-link" href={serviceBase + 'hydro-power-ports/'}>Hydropower &amp; Ports</a></li>
            </ul>
          </div>
        </nav>
        <nav className="mt-10" aria-label="Project site map">
          <h3>Project pages</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projectGroups.map(({ id, title, projects }) => (
              <div key={id}>
                <p className="font-semibold">{title}</p>
                <ul className="mt-3 grid gap-2">
                  {projects.map(({ slug, title: projectName }) => (
                    <li key={slug}><Link className="text-link" to={projectPath(slug)}>{projectName}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <p className="mt-8 border-t border-line pt-4 text-sm">
          Original site design by <a className="text-link" href="https://isaacjames.online/">Isaac James Online</a>
        </p>
      </div>
    </section>
  )
}
