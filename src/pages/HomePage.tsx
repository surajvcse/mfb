import { ProjectStrip } from '../components/ProjectStrip'
import { MoilAward } from '../components/MoilAward'
import { Hero } from '../components/Hero'
import { PageTitle } from '../components/PageTitle'
import { ContactSection } from '../components/ContactSection'
import { NumberSection } from '../components/numbersection'
import { OurExpertise } from '../components/Ourexpertise'

export function HomePage() {
  return (
    <>
      <PageTitle title="Ground Engineering" />
      <Hero />
      <ProjectStrip />
      <MoilAward />
      <OurExpertise />
      <NumberSection />
      <ContactSection />
    </>
  )
}
