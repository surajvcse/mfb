import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { navigation, site } from '../content/site'
import { Brand } from './Brand'

const contactLink = 'flex min-h-11 w-fit max-w-full items-center gap-3 rounded-sm font-semibold hover:underline hover:decoration-gold hover:underline-offset-4 focus-visible:outline-paper'
const footerLink = 'w-fit rounded-sm hover:text-gold focus-visible:outline-paper'

const offices = [
  {
    label: 'Corporate Office · New Delhi NCR',
    company: 'MFB Geotech Pvt. Ltd.',
    address: [
      'Unit No. 304, 3rd Floor, The Solitaire Plaza',
      'Mehrauli–Gurgaon Road, Sikanderpur, Sector 26',
      'Gurugram, Haryana 122002, India',
    ],
    phones: ['+91 7428294523', '+91 9599703028'],
    emails: ['info@mfbumi.com', 'tenders@mfbumi.com'],
  },
  {
    label: 'Chennai Office',
    company: 'Bumi Geo Engineering Limited',
    address: [
      'No. 15/17, Flat No. 13A, 3rd Floor, Jasmine Enclave',
      'Anna Avenue, Kastutiba Nagar, Adyar',
      'Chennai, Tamil Nadu 600020, India',
    ],
    phones: ['+91 8754578545'],
    emails: ['sangeetha@bumigrp.com'],
  },
]

export function Footer() {
  return (
    <footer className="border-t-4 border-gold bg-[#07172F] text-paper">
      <div className="site-shell">
        <div className="grid gap-9 py-12 sm:grid-cols-2 lg:grid-cols-[0.9fr_0.6fr_2.5fr] lg:gap-8">
          <div>
            <Brand lightFocus />
            <p className="mt-4 max-w-xs">A growing multinational construction company providing integrated, cost-effective solutions for tunnelling, foundations, slope stabilisation, and ground improvement.</p>
            <p className="mt-3 max-w-xs">Qualified teams and modern equipment support every stage of project delivery.</p>
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

          <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2 lg:col-span-1 xl:gap-4">
            {offices.map(({ label, company, address, phones, emails }) => (
              <div className="min-w-0 rounded-xl border border-paper/20 bg-[#102745] p-5 text-paper" key={label}>
                <p className="mb-2 flex items-start gap-2 font-bold">
                  <FiMapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold" />
                  {label}
                </p>
                <address className="text-sm not-italic leading-relaxed">
                  <span className="block font-semibold">{company}</span>
                  {address.map((line) => <span className="block" key={line}>{line}</span>)}
                </address>
                <div className="mt-4 grid border-t border-paper/25 pt-2 text-sm">
                  {phones.map((phone) => (
                    <a className={contactLink} href={`tel:${phone.replaceAll(' ', '')}`} key={phone}>
                      <FiPhone aria-hidden="true" className="size-4 shrink-0" />
                      {phone}
                    </a>
                  ))}
                  {emails.map((email) => (
                    <a className={contactLink} href={`mailto:${email}`} key={email}>
                      <FiMail aria-hidden="true" className="size-4 shrink-0" />
                      <span className="min-w-0 [overflow-wrap:anywhere]">{email}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-paper/25 py-5 text-sm">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <Link className={footerLink} to="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
