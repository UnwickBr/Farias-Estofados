import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ cartCount = 0 }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const links = [
    { label: 'Inicio', to: '/' },
    { label: 'Catalogo', to: '/catalogo' },
    { label: 'Contato', to: '/contato' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-black/55 backdrop-blur-md'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="font-display text-xl lg:text-2xl font-semibold tracking-tight text-white">
          <span className="text-blue-500">Farias</span>{' '}
          <span className="text-white">Estofados</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide transition-colors ${
                location.pathname === link.to ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden md:inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/30 text-white/90 hover:text-white hover:border-white/60 hover:bg-white/10 transition-colors"
          >
            <User className="h-4 w-4" />
          </Link>

          <Link to="/carrinho" className="relative group">
            <ShoppingBag className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-b border-white/10"
          >
            <div className="px-6 py-6 space-y-4">
              <Link
                to="/login"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 text-white"
              >
                <User className="h-4 w-4" />
              </Link>

              {links.map((link) => (
                <Link key={link.to} to={link.to} className="block text-base font-medium text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
