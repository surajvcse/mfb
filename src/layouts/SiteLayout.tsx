import { useEffect, useRef, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { Footer } from '../components/Footer'
import { navigation } from '../content/site'

const navLinkClass = 'relative flex min-h-11 items-center whitespace-nowrap rounded-md px-3 text-sm font-bold tracking-wide text-paper/75 uppercase transition-colors hover:text-paper focus-visible:outline-paper lg:px-3 xl:px-4 xl:text-base'

export function SiteLayout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
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

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header
        className={`sticky top-0 z-30 h-18 border-b border-paper/15 bg-[#07172F]/96 text-paper shadow-sm backdrop-blur-md md:h-20 ${pathname === '/' ? '-mb-18 md:-mb-20' : ''}`}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && menuOpen) {
            setMenuOpen(false)
            menuButton.current?.focus()
          }
        }}
      >
        <div className="site-shell flex h-full items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <div className="justify-self-start"><Brand lightFocus /></div>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-paper/30 px-3 text-sm font-semibold hover:bg-paper/10 focus-visible:outline-paper lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <nav
            id="main-navigation"
            aria-label="Main"
            className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-paper/15 bg-[#07172F] px-5 py-3 shadow-lg sm:px-8 lg:static lg:flex lg:h-full lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none xl:gap-2`}
          >
            {navigation.map(({ label, path }) => (
              <NavLink
                className={`${navLinkClass} aria-[current=page]:bg-gold/12 aria-[current=page]:text-gold aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-gold`}
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                end={path !== '/projects'}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="hidden min-h-11 items-center justify-self-end whitespace-nowrap rounded-md border border-gold bg-gold px-4 text-sm font-bold text-ink transition-colors hover:bg-paper focus-visible:outline-paper lg:inline-flex" to="/contact">Get in touch</Link>
        </div>
      </header>
      <main id="main-content" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
