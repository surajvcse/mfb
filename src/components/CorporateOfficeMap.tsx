import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiMapPin } from 'react-icons/fi'
import { divIcon, map, marker, tileLayer, type LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { offices } from '../content/offices'

// Centre of the published Solitaire Plaza Plus Code, 7JWVF4J2+G27.
const solitairePlaza: LatLngTuple = [28.4812875, 77.100046875]
const office = offices.find(({ corporate }) => corporate)

export default function CorporateOfficeMap() {
  const container = useRef<HTMLDivElement>(null)
  const [pin] = useState(() => document.createElement('span'))
  const [address] = useState(() => document.createElement('div'))

  useEffect(() => {
    const element = container.current
    if (!element || !office) return

    const officeMap = map(element, { scrollWheelZoom: false }).setView(solitairePlaza, 17)
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(officeMap)

    marker(solitairePlaza, {
      title: 'MFB Geotech corporate office',
      icon: divIcon({
        className: 'corporate-office-pin',
        html: pin,
        iconSize: [60, 60],
        iconAnchor: [30, 44],
        popupAnchor: [0, -45],
      }),
    }).addTo(officeMap).bindPopup(address)

    const resize = new ResizeObserver(() => officeMap.invalidateSize())
    resize.observe(element)
    return () => {
      resize.disconnect()
      officeMap.remove()
    }
  }, [pin, address])

  if (!office) return null

  const query = encodeURIComponent(office.lines.join(', '))

  return (
    <>
      <div className="office-map-frame isolate h-[72svh] min-h-80 w-full" ref={container} role="region" aria-label="Map of the MFB Geotech corporate office in Gurugram" />
      {createPortal(
        <span className="grid size-15 place-items-center rounded-full border-4 border-white bg-red-700 text-white shadow-lg">
          <FiMapPin className="size-8" strokeWidth={2.5} aria-hidden="true" />
        </span>,
        pin,
      )}
      {createPortal(
        <div className="font-sans text-sm leading-relaxed text-ink">
          <strong className="block">MFB Geotech corporate office</strong>
          <address className="mt-1 not-italic">
            {office.lines.map((line) => <span className="block" key={line}>{line}</span>)}
          </address>
          <a className="mt-2 inline-block font-semibold underline" href={`https://www.google.com/maps/search/?api=1&query=${query}`}>Open in Google Maps</a>
        </div>,
        address,
      )}
    </>
  )
}
