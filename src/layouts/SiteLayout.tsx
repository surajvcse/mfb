import { useEffect, useRef, useState } from 'react'
import { FiMail, FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { Footer } from '../components/Footer'
import { navigation } from '../content/site'

const navLinkClass = 'relative flex min-h-11 items-center whitespace-nowrap rounded-lg px-4 text-[0.9375rem] font-semibold text-paper/85 transition-colors hover:bg-paper/10 hover:text-paper focus-visible:outline-paper lg:min-h-10 lg:px-3 xl:px-4'
const activeNavClass = 'aria-[current=page]:bg-gold/12 aria-[current=page]:text-gold aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-4 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-gold'

export function SiteLayout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const main = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    if (previousPath.current === pathname) return
    previousPath.current = pathname
    setMenuOpen(false)
    window.scrollTo(0, 0)
    main.current?.focus({ preventScroll: true })
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false)
    }

    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header
        ref={header}
        className={`sticky top-0 z-30 h-18 border-b border-paper/15 bg-[#07172F]/95 text-paper shadow-[0_4px_16px_#07172F24] backdrop-blur-md md:h-20 ${pathname === '/' ? '-mb-18 md:-mb-20' : ''}`}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && menuOpen) {
            setMenuOpen(false)
            menuButton.current?.focus()
          }
        }}
      >
        <div className="site-shell flex h-full items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="justify-self-start"><Brand lightFocus /></div>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-paper/25 bg-paper/5 px-3.5 text-sm font-semibold hover:border-gold/60 hover:bg-paper/10 focus-visible:outline-paper lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX className="size-5" aria-hidden="true" /> : <FiMenu className="size-5" aria-hidden="true" />}
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main"
            className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-4 top-full mt-2 max-h-[calc(100svh-6rem)] flex-col gap-1 overflow-y-auto rounded-xl border border-paper/15 bg-[#0d213b] p-2 shadow-xl sm:inset-x-8 lg:static lg:mt-0 lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-0.5 lg:overflow-visible lg:rounded-xl lg:bg-paper/5 lg:p-1 lg:shadow-none`}
          >
            {navigation.map(({ label, path }) => (
              <NavLink
                className={`${navLinkClass} ${activeNavClass}`}
                key={path}
                to={path}
                onClick={() => {
                  setMenuOpen(false)
                  if (menuOpen && pathname.replace(/\/$/, '') === path.replace(/\/$/, '')) {
                    menuButton.current?.focus()
                  }
                }}
                end={path !== '/projects'}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="hidden min-h-11 items-center gap-2 justify-self-end whitespace-nowrap rounded-lg border border-gold bg-gold px-4 text-sm font-bold text-ink transition-colors hover:border-paper hover:bg-paper focus-visible:outline-paper lg:inline-flex" to="/contact">
            <FiMail className="size-4" aria-hidden="true" />
            Get in touch
          </Link>
        </div>
      </header>
      <main id="main-content" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
