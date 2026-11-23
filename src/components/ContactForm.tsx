import type { FormEvent } from 'react'
import { useId, useRef, useState } from 'react'
import { FiCheck, FiChevronDown, FiSend } from 'react-icons/fi'
import logo from '../Assets/logo/mfb-logo.png'
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
  const [saving, setSaving] = useState(false)
  const confirmation = useRef<HTMLDialogElement>(null)
  const submitButton = useRef<HTMLButtonElement>(null)
  const confirmationId = useId()
  const lastAttempt = useRef<{ id: string; fields: string } | null>(null)

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (saving) return

    const form = event.currentTarget
    const fields = Object.fromEntries(new FormData(form))
    const fieldsKey = JSON.stringify(fields)
    if (lastAttempt.current?.fields !== fieldsKey) {
      const bytes = crypto.getRandomValues(new Uint8Array(16))
      const id = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
      lastAttempt.current = { id, fields: fieldsKey }
    }

    setSaving(true)
    setStatus('')

    try {
      const response = await fetch(import.meta.env.BASE_URL + 'api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, id: lastAttempt.current.id }),
      })
      const result = await response.json()
      if (!response.ok || result.saved !== true) {
        setStatus(typeof result.error === 'string' ? result.error : 'We couldn’t save your inquiry. Please try again.')
        return
      }

      form.reset()
      lastAttempt.current = null
      confirmation.current?.showModal()
    } catch {
      setStatus('We couldn’t confirm your submission. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={submitInquiry} aria-busy={saving}>
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
        <button ref={submitButton} className="button w-full gap-2 rounded-lg hover:border-paper focus-visible:outline-paper disabled:cursor-wait disabled:opacity-75" type="submit" disabled={saving}>
          <FiSend aria-hidden="true" />
          {saving ? 'Submitting…' : 'Send inquiry'}
        </button>
        <p className="form-status text-sm font-medium text-red-200" role="status">{status}</p>
      </div>
      <dialog
        ref={confirmation}
        aria-labelledby={`${confirmationId}-title`}
        aria-describedby={`${confirmationId}-message`}
        onClose={() => submitButton.current?.focus()}
        className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-line bg-white text-center text-[#07172F] shadow-2xl backdrop:bg-[#07172F]/75 backdrop:backdrop-blur-sm"
      >
        <div className="border-b-2 border-gold bg-[#07172F] px-6 pt-5 pb-9">
          <img className="mx-auto h-auto w-36 rounded-sm sm:w-40" src={logo} alt={site.name} width={512} height={177} />
        </div>
        <div className="px-6 pb-7 sm:px-10 sm:pb-9">
          <span className="relative mx-auto -mt-6 mb-4 grid size-12 place-items-center rounded-full bg-gold ring-4 ring-white" aria-hidden="true">
            <FiCheck className="size-6" />
          </span>
          <h2 id={`${confirmationId}-title`} className="text-subsection-title font-bold">Project enquiry received</h2>
          <p id={`${confirmationId}-message`} className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            Thank you for contacting MFB Geotech. Our team will review your project details and get in touch shortly.
          </p>
          <button className="button mt-6 w-full sm:w-auto sm:min-w-32" type="button" onClick={() => confirmation.current?.close()}>
            Done
          </button>
        </div>
      </dialog>
    </form>
  )
}
