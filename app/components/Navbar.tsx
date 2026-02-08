import { useSession, signOut } from "next-auth/react"
import Link from 'next/link'

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  openAuth?: (view: 'login' | 'signup') => void;
}

interface NavLink {
  id: string;
  label: string;
}

export default function Navbar({ currentPage, setCurrentPage, openAuth }: NavbarProps) {
  const { data: session } = useSession()
  const navLinks: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'beds', label: 'Bed Availability' },
    { id: 'vaccinations', label: 'Vaccinations' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'contacts', label: 'Contacts' }
  ]

  return (
    <nav className="glass-nav sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="bg-gradient-to-br from-primary to-primary-light p-2.5 rounded-xl shadow-soft group-hover:shadow-glow-teal transition-all duration-300 group-hover:scale-110">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-2xl font-display font-bold text-neutral-900 group-hover:text-primary transition-colors">
              VitalCare <span className="text-primary">HMS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group ${currentPage === link.id
                  ? 'text-primary'
                  : 'text-neutral-700 hover:text-primary'
                  }`}
              >
                {link.label}
                <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-primary-light transition-all duration-300 ${currentPage === link.id ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                  }`}></span>
              </button>
            ))}
          </div>

          {/* Login/Logout Button */}
          <div>
            {session ? (
              <div className="flex items-center gap-4">
                {/* Dashboard Link based on role */}
                {session.user.role === 'DOCTOR' && <Link href="/doctor/dashboard" className="text-sm font-semibold hover:text-primary">Dashboard</Link>}
                {session.user.role === 'PATIENT' && <Link href="/patient/dashboard" className="text-sm font-semibold hover:text-primary">Dashboard</Link>}
                {session.user.role === 'ADMIN' && <Link href="/admin/dashboard" className="text-sm font-semibold hover:text-primary">Dashboard</Link>}

                <button
                  onClick={() => signOut()}
                  className="bg-neutral-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-neutral-800 transition-all duration-300 shadow-soft hover:shadow-medium hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuth && openAuth('login')} // Safety check
                className="bg-white text-primary px-6 py-2.5 rounded-xl font-semibold border-2 border-primary transition-all duration-300 shadow-medium hover:shadow-glow hover:-translate-y-0.5 hover:scale-105 inline-block"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 pt-2 space-y-2">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${currentPage === link.id
                ? 'bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary border-l-4 border-primary'
                : 'text-neutral-700 hover:bg-primary-50/50 hover:text-primary hover:border-l-4 hover:border-primary-light'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav >
  )
}
