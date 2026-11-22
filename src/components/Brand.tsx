import { Link } from 'react-router-dom'
import logo from '../Assets/logo/mfb-logo.png'
import { site } from '../content/site'

export function Brand({ lightFocus = false }: { lightFocus?: boolean }) {
  return (
    <Link className={`inline-flex shrink-0 overflow-hidden rounded-sm${lightFocus ? " focus-visible:outline-paper" : ""}`} to="/" aria-label={site.name + ' home'}>
      <img className="h-auto w-36 sm:w-40" src={logo} alt={site.name} width={512} height={177} />
    </Link>
  )
}
