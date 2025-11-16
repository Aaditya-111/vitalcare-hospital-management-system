export default function Navbar({ currentPage, setCurrentPage, isLoggedIn, onLogout }) {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'beds', label: 'Bed Availability' },
    { id: 'vaccinations', label: 'Vaccinations' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'contacts', label: 'Contacts' }
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="bg-emerald-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              VitalCare <span className="text-emerald-600">HMS</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => setCurrentPage(link.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === link.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Login/Logout Button */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Login / Signup
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setCurrentPage(link.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                currentPage === link.id
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
