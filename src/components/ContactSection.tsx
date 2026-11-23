import { useId } from 'react'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import contactPhoto from '../Assets/imges/48.png'
import { site } from '../content/site'
import { ContactForm } from './ContactForm'

export function ContactSection({ standalone = false }: { standalone?: boolean }) {
  const Heading = standalone ? 'h1' : 'h2'
  const titleId = useId()
  const email = site.email
  const phone = site.phone || '+91 7428294523'
  const details = [
    { label: 'Phone', Icon: FiPhone, text: phone, href: 'tel:' + phone.replace(/[^+0-9]/g, '') },
    { label: 'Email', Icon: FiMail, text: email, href: 'mailto:' + email },
    { label: 'Corporate office', Icon: FiMapPin, text: 'The Solitaire Plaza, Sector 26, Gurugram, Haryana 122002, India' },
  ]

  return (
    <section className="relative isolate grid min-h-svh items-center overflow-hidden border-y border-paper/15 bg-[#07172F] text-paper" aria-labelledby={titleId}>
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url("${contactPhoto}")` }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#07172F]/82 via-[#07172F]/88 to-[#07172F]/95" aria-hidden="true" />
      <div className="site-shell grid items-start gap-x-12 gap-y-6 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:py-20 xl:gap-x-20">
        <div>
          <p className="eyebrow mb-3 text-gold">Contact us</p>
          <Heading id={titleId} className="font-sans text-[clamp(2.5rem,5vw,4.5rem)] leading-tight font-black tracking-tight">
            Get in <span className="text-gold">touch</span>
          </Heading>
          <p className="mt-3 max-w-md text-base leading-relaxed text-paper/85 sm:text-lg">
            Tell us about your project and where you need ground engineering support.
          </p>
        </div>

        <div className="min-w-0 border-t border-paper/35 pt-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 xl:pl-12">
          <p className="mb-4 text-xl font-bold">Project inquiry</p>
          <ContactForm />
        </div>

        <ul className="divide-y divide-paper/25 border-y border-paper/25 lg:col-start-1" aria-label="Direct contact details">
          {details.map(({ label, Icon, text, href }) => (
            <li className="flex min-w-0 items-start gap-3 py-4 sm:gap-4" key={label}>
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center text-gold">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-sm font-bold tracking-wide text-gold uppercase">{label}</p>
                {href ? (
                  <a className="rounded-sm font-semibold [overflow-wrap:anywhere] hover:underline hover:decoration-gold focus-visible:outline-paper" href={href}>{text}</a>
                ) : (
                  <address className="not-italic leading-relaxed text-paper/90">{text}</address>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
