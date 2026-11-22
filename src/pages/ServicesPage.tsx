import { PageIntro } from '../components/PageIntro'
import { PageTitle } from '../components/PageTitle'
import { ProjectCallout } from '../components/ProjectCallout'
import { ServiceCards } from '../components/ServiceCards'

export function ServicesPage() {
  return (
    <>
      <PageTitle title="Services" />
      <PageIntro label="MFB Geotech" title="Our Services" description="Specialised geotechnical design and construction for complex ground, underground works, and infrastructure." />
      <section className="site-shell section-padding">
        <h2>Engineering capabilities</h2>
        <ServiceCards />
      </section>
      <ProjectCallout />
    </>
  )
}
