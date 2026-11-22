import { FiMapPin } from 'react-icons/fi'

const offices = [
  {
    city: 'Muscat, Oman',
    company: 'MFB Geotech Private Limited LLC',
    lines: ['Flat No. 15, Building No. 133', 'Way No. 64, Plot No. 85, Block 325', 'Al Hail, PO Box 2156, PC 900', 'Muscat, Sultanate of Oman'],
  },
  {
    city: 'Singapore',
    company: 'Tunneling Technology Company Pte. Ltd.',
    lines: ['89 Short Street, #B1–11, Golden Wall Centre', 'Singapore 188216'],
  },
  {
    city: 'New Delhi NCR, India',
    company: 'MFB Geotech Private Limited',
    lines: ['Corporate Office, Unit No. 304, 3rd Floor', 'The Solitaire Plaza, M.G. Road, near Guru Dronacharya Metro Station', 'Sector 26, Sikanderpur, Gurugram 122002, Haryana, India'],
  },
  {
    city: 'Chennai, India',
    company: 'Bumi Geo Engineering Limited',
    lines: ['No. 15/17, Flat No. 13A, 3rd Floor, Jasmine Enclave', 'Anna Avenue, Kastutiba Nagar, Adyar', 'Chennai, Tamil Nadu 600020, India'],
  },
]

const corporateOffice = offices[2]
const corporateQuery = encodeURIComponent(corporateOffice.lines.join(', '))

export function OfficeDirectory() {
  return (
    <section className="border-t border-line bg-white" aria-labelledby="offices-title">
      <div className="site-shell section-padding">
        <h2 id="offices-title">Visit our offices</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {offices.map(({ city, company, lines }) => (
            <article key={city} className="rounded-xl border border-line bg-paper p-6">
              <h3 className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-gold">
                  <FiMapPin aria-hidden="true" />
                </span>
                {city}
              </h3>
              <address className="mt-4 not-italic leading-relaxed">
                <strong className="block">{company}</strong>
                {lines.map((line) => <span className="block" key={line}>{line}</span>)}
              </address>
            </article>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-line">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-paper p-5 sm:px-6">
            <div>
              <h3>Find us</h3>
              <p>Corporate office in Gurugram</p>
            </div>
            <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${corporateQuery}`}>
              View on Google Maps
            </a>
          </div>
          <iframe
            className="block h-72 w-full border-t border-line sm:h-96"
            title="Map of the MFB Geotech corporate office in Gurugram"
            src={`https://maps.google.com/maps?q=${corporateQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  )
}
