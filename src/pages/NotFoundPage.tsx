import { Link } from 'react-router-dom'
import { PageIntro } from '../components/PageIntro'
import { PageTitle } from '../components/PageTitle'

export function NotFoundPage() {
  return (
    <>
      <PageTitle title="Page not found" />
      <PageIntro label="404" title="Page not found." description="Check the address or return to the home page." />
      <div className="site-shell section-padding">
        <Link className="button" to="/">Return home</Link>
      </div>
    </>
  )
}
