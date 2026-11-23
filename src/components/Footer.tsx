import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { offices } from '../content/offices'
import { navigation, site } from '../content/site'
import { Brand } from './Brand'

const contactLink = 'flex min-h-9 w-fit max-w-full items-center gap-3 rounded-sm font-semibold hover:underline hover:decoration-gold hover:underline-offset-4 focus-visible:outline-paper'
const footerLink = 'w-fit rounded-sm hover:text-gold focus-visible:outline-paper'

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mfbgeotech/home/', Icon: FaLinkedinIn },
  { label: 'YouTube', href: 'https://www.youtube.com/@MFBGEOTECH_IND', Icon: FaYoutube },
  { label: 'Facebook', href: 'https://www.facebook.com/mfbgeotech/', Icon: FaFacebookF },
]

export function Footer() {
  return (
    <footer className="border-t-4 border-gold bg-[#07172F] text-paper">
      <div className="site-shell">
        <div className="grid gap-9 py-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)_minmax(0,1.25fr)] lg:gap-8">
          <div>
            <Brand lightFocus />
            <p className="mt-4 max-w-xs">A growing multinational construction company providing integrated, cost-effective solutions for tunnelling, foundations, slope stabilisation, and ground improvement.</p>
            <p className="mt-3 max-w-xs">Qualified teams and modern equipment support every stage of project delivery.</p>
            <ul className="mt-5 flex gap-3" aria-label="MFB Geotech social media">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    className="grid size-11 place-items-center rounded-full border border-paper/30 text-paper transition-colors hover:border-gold hover:bg-gold hover:text-ink focus-visible:outline-paper"
                    href={href}
                    aria-label={`MFB Geotech on ${label}`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="mb-4 font-semibold text-gold">Explore</p>
            <ul className="grid gap-3">
              {navigation.map(({ label, path }) => (
                <li key={path}><Link className={footerLink} to={path}>{label}</Link></li>
              ))}
              <li><Link className={footerLink} to="/blogs">Blogs</Link></li>
            </ul>
          </nav>

          <section className="min-w-0" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title" className="mb-4 text-base font-semibold tracking-normal text-gold">Contact information</h2>
            <div className="grid gap-5 xl:grid-cols-2">
              {offices.filter(({ phones, emails }) => phones || emails).map(({ city, phones, emails }) => (
                <div className="min-w-0 text-sm" key={city}>
                  <p className="mb-1 font-semibold">{city}</p>
                  {phones?.map((phone) => (
                    <a className={contactLink} href={`tel:${phone.replaceAll(' ', '')}`} key={phone}>
                      <FiPhone aria-hidden="true" className="size-4 shrink-0 text-gold" />
                      {phone}
                    </a>
                  ))}
                  {emails?.map((email) => (
                    <a className={contactLink} href={`mailto:${email}`} key={email}>
                      <FiMail aria-hidden="true" className="size-4 shrink-0 text-gold" />
                      <span className="min-w-0 [overflow-wrap:anywhere]">{email}</span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="col-span-full border-t border-paper/25 pt-7" aria-labelledby="footer-offices-title">
            <h2 id="footer-offices-title" className="mb-4 text-base font-semibold tracking-normal text-gold">Office addresses</h2>
            <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2 xl:grid-cols-4">
              {offices.map(({ city, corporate, company, lines }) => (
                <div className="min-w-0" key={city}>
                  <p className="mb-2 flex items-start gap-2 font-bold">
                    <FiMapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                    {corporate ? 'Corporate office · ' + city : city}
                  </p>
                  <address className="text-sm not-italic leading-relaxed">
                    <span className="block font-semibold">{company}</span>
                    {lines.map((line) => <span className="block" key={line}>{line}</span>)}
                  </address>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/25 py-5 text-sm">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <Link className={footerLink} to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
