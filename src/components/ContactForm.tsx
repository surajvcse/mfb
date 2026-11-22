import type { FormEvent } from 'react'
import { useState } from 'react'
import { FiChevronDown, FiSend } from 'react-icons/fi'
import { site } from '../content/site'

const inquiryServices = [
  'Foundation engineering',
  'Ground improvement',
  'Slope stabilisation and deep excavation',
  'Tunnelling and underground construction',
  'Hydropower and ports',
  'Mining and dredging',
  'Help choosing a service',
]

export function ContactForm() {
  const [status, setStatus] = useState('')

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const read = (field: string) => String(fields.get(field) ?? '').trim()
    const subject = 'Project inquiry: ' + read('service')
    const body = [
      'Name: ' + read('name'),
      'Email: ' + read('email'),
      'Phone: ' + (read('phone') || 'Not provided'),
      'Project address: ' + (read('address') || 'Not provided'),
      'Service: ' + read('service'),
      '',
      read('message'),
    ].join('\n')

    window.location.href = 'mailto:' + site.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body)
    setStatus('Send the prepared draft from your email app.')
  }

  return (
    <form className="contact-form" onSubmit={prepareEmail}>
      <p className="text-sm text-paper/80">Required fields are marked with an asterisk.</p>
      <div className="field-row">
        <label>
          <span>Full name <span aria-hidden="true">*</span></span>
          <input name="name" autoComplete="name" placeholder="Your full name" required maxLength={120} />
        </label>
        <label>
          <span>Work email <span aria-hidden="true">*</span></span>
          <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} />
        </label>
        <label>
          <span>Phone number <span className="text-sm font-normal">(optional)</span></span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="Include country code" maxLength={40} />
        </label>
        <label>
          <span>Service <span aria-hidden="true">*</span></span>
          <span className="relative">
            <select name="service" required defaultValue="">
              <option value="" disabled>Select a service</option>
              {inquiryServices.map((service) => <option key={service}>{service}</option>)}
            </select>
            <FiChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" aria-hidden="true" />
          </span>
        </label>
      </div>
      <label>
        <span>Project address <span className="text-sm font-normal">(optional)</span></span>
        <input name="address" maxLength={250} placeholder="Street address, city, and postal code" />
      </label>
      <label>
        <span>Project details <span aria-hidden="true">*</span></span>
        <textarea name="message" rows={5} required maxLength={1500} placeholder="Tell us about the site, scope, and timeline." />
      </label>
      <div className="border-t border-paper/25 pt-5">
        <button className="button w-full gap-2 rounded-lg hover:border-paper focus-visible:outline-paper" type="submit">
          <FiSend aria-hidden="true" />
          Send via email
        </button>
        <p className="form-status" role="status">{status}</p>
      </div>
    </form>
  )
}
