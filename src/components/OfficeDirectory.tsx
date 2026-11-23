import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { FiMapPin, FiMaximize, FiMinimize } from 'react-icons/fi'
import { offices } from '../content/offices'

const CorporateOfficeMap = lazy(() => import('./CorporateOfficeMap'))

export function OfficeDirectory({ showMap = true, showAddresses = true }: {
  showMap?: boolean
  showAddresses?: boolean
}) {
  const mapPanel = useRef<HTMLDivElement>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [fullscreenError, setFullscreenError] = useState(false)

  useEffect(() => {
    if (!showMap) return

    function syncFullscreen() {
      setFullscreen(document.fullscreenElement === mapPanel.current)
    }

    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [showMap])

  async function toggleFullscreen() {
    const panel = mapPanel.current
    if (!panel) return
    setFullscreenError(false)

    try {
      if (document.fullscreenElement === panel) {
        await document.exitFullscreen()
      } else {
        await panel.requestFullscreen()
      }
    } catch {
      setFullscreenError(true)
    }
  }

  return (
    <section id="offices" className="scroll-mt-24 border-t border-line bg-white" aria-labelledby="offices-title">
      <h2 id="offices-title" className={showAddresses ? 'site-shell pt-10 sm:pt-14' : 'sr-only'}>
        {showAddresses ? 'Visit our offices' : 'Office map'}
      </h2>
      {showAddresses && (
        <div className="site-shell mt-8 grid gap-4 pb-8 sm:grid-cols-2">
          {offices.map((office) => (
            <article className="rounded-xl border border-line bg-paper p-6" key={office.city}>
              <h3 className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-md bg-gold">
                  <FiMapPin aria-hidden="true" />
                </span>
                {office.city}
              </h3>
              <address className="mt-4 not-italic leading-relaxed">
                <strong className="block">{office.company}</strong>
                {office.lines.map((line) => <span className="block" key={line}>{line}</span>)}
              </address>
            </article>
          ))}
        </div>
      )}

      {showMap && (
        <div id="office-map" className="office-map relative scroll-mt-24 border-y border-line bg-white" ref={mapPanel}>
          {document.fullscreenEnabled && (
            <button
              className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-lg border border-line bg-white shadow-sm hover:border-gold hover:bg-gold"
              type="button"
              aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen map'}
              onClick={toggleFullscreen}
            >
              {fullscreen ? <FiMinimize aria-hidden="true" /> : <FiMaximize aria-hidden="true" />}
            </button>
          )}
          {fullscreenError && <p className="sr-only" role="status">Fullscreen is unavailable here.</p>}
          <Suspense fallback={<div className="office-map-frame grid h-[72svh] min-h-80 place-items-center bg-paper" role="status">Loading map…</div>}>
            <CorporateOfficeMap />
          </Suspense>
        </div>
      )}
    </section>
  )
}
