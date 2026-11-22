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
          <p>The form uses your name, email address, optional phone number and project address, selected service, and project description to prepare your inquiry in your browser. The website does not submit those details to a server when you use the form.</p>
          <p>The form opens a draft in your email application. MFB Geotech receives the inquiry when you send that email.</p>
          <h2>Privacy questions</h2>
          <p>For questions about your project inquiry, <Link className="text-link" to="/contact">contact MFB Geotech</Link>.</p>
        </div>
      </section>
    </>
  )
}
