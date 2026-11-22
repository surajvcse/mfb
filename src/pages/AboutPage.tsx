import { Link } from 'react-router-dom'
import projectPhoto from '../Assets/hero/5.jpg'
import { PageIntro } from '../components/PageIntro'
import { PageTitle } from '../components/PageTitle'
import { MoilAward } from '../components/MoilAward'

const capabilities = [
  { title: 'Foundation engineering', description: 'Specialised foundation systems for infrastructure and heavy construction.' },
  { title: 'Ground improvement', description: 'Techniques to improve soil strength, stability, and load-bearing capacity.' },
  { title: 'Slope stabilisation', description: 'Measures to improve slope stability and reduce the risk of ground movement.' },
  { title: 'Deep excavation', description: 'Excavation support and ground retention for complex sites.' },
  { title: 'Tunnelling and underground construction', description: 'Specialised construction for challenging geology and confined working environments.' },
  { title: 'Hydropower, ports, and marine infrastructure', description: 'Geotechnical design and construction support for demanding ground conditions and structural requirements.' },
]

const industries = [
  'Infrastructure and civil construction',
  'Roads, highways, and bridges',
  'Metro, rail, and underground infrastructure',
  'Commercial and industrial construction',
  'Hydropower and energy infrastructure',
  'Ports and marine infrastructure',
  'Urban development and complex excavation',
]

export function AboutPage() {
  return (
    <>
      <PageTitle title="About" />
      <PageIntro
        label="About MFB Geotech"
        title="Engineering the ground. Building stronger foundations."
        description="MFB Geotech provides specialised geotechnical engineering and construction for infrastructure, industrial, and construction projects across South Asia and the Middle East."
      />

      <section className="site-shell section-padding grid items-center gap-8 md:grid-cols-2 lg:gap-16">
        <div>
          <h2>Who we are</h2>
          <p className="mt-5">Headquartered in India, MFB Geotech is a fast-growing multinational construction company specialising in tunnelling, foundations, slope stabilisation, and ground improvement. We bring more than a decade of experience to projects with challenging ground conditions.</p>
          <p className="mt-4">We bring design and specialised construction together to deliver practical, cost-effective solutions tailored to each site. Our qualified teams use advanced equipment and proven construction methods to support safe, reliable project delivery.</p>
        </div>
        <img
          className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
          src={projectPhoto}
          alt="Tunnel entrance at a construction site"
          loading="lazy"
          decoding="async"
        />
      </section>

      <MoilAward />

      <section className="services-section">
        <div className="site-shell">
          <h2>Our expertise</h2>
          <p className="mt-4 max-w-2xl">We design and build solutions for difficult ground conditions, underground structures, and large-scale infrastructure.</p>
          <div className="service-grid">
            {capabilities.map(({ title, description }) => (
              <article className="service-card" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="site-shell section-padding about-grid">
          <h2>Industries we serve</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {industries.map((industry) => (
              <li className="flex items-start gap-3 rounded-md bg-paper px-4 py-3 before:mt-2 before:size-2 before:shrink-0 before:rounded-full before:bg-gold" key={industry}>
                {industry}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-shell section-padding grid gap-8 md:grid-cols-2 lg:gap-16">
        <div>
          <h2>Our vision</h2>
          <p className="mt-4">To be a trusted leader in specialised geotechnical engineering and construction, contributing to reliable, sustainable infrastructure in regional and international markets.</p>
        </div>
        <div>
          <h2>Our mission</h2>
          <p className="mt-4">To deliver high-quality engineering and construction through skilled teams, appropriate technology, and a consistent focus on safety, efficiency, and client needs.</p>
        </div>
      </section>

      <section className="project-callout">
        <div className="site-shell callout-inner">
          <div>
            <h2>Let’s discuss your project</h2>
            <p>Tell us about your site and the ground engineering or construction support you need.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link className="button" to="/contact">Get in touch</Link>
            
          </div>
        </div>
      </section>
    </>
  )
}
