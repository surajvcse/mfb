import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { PageTitle } from '../components/PageTitle'

export function PrivacyPolicyPage() {
  return (
    <>
      <PageTitle title="Privacy Policy" />
      <PageIntro label="MFB Geotech" title="Privacy Policy" description="How this website handles the details you enter in the project inquiry form." />
      <section className="site-shell section-padding">
        <div className="prose">
          <h2>Project inquiries</h2>
          <p>The website sends your name, work email, selected service, and project details to MFB Geotech when you submit the form. If you enter a phone number or project address, those details are sent as well.</p>
          <p>The submission is stored in an Excel workbook on the website server so MFB Geotech can review and respond to your inquiry.</p>
          <h2>Privacy questions</h2>
          <p>For questions about your project inquiry, <Link className="text-link" to="/contact">contact MFB Geotech</Link>.</p>
        </div>
      </section>
    </>
  )
}
