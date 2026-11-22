import { ContactSection } from '../components/ContactSection'
import { OfficeDirectory } from '../components/OfficeDirectory'
import { PageTitle } from '../components/PageTitle'

export function ContactPage() {
  return (
    <>
      <PageTitle title="Contact" />
      <ContactSection standalone />
      <OfficeDirectory />
    </>
  )
}
