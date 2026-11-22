import { Link } from 'react-router-dom'

export function ProjectCallout() {
  return (
    <section className="project-callout">
      <div className="site-shell callout-inner">
        <div>
          <h2>Have a project in mind?</h2>
          <p>Tell us what you’re working on and where you’d like to start.</p>
        </div>
        <Link className="button" to="/contact">Get in touch</Link>
      </div>
    </section>
  )
}
