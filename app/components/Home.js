export default function Home({ setCurrentPage }) {
  const features = [
    {
      title: 'Expert Doctors',
      description: 'Highly qualified specialists across multiple departments',
      icon: 'stethoscope',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Live Bed Status',
      description: 'Real-time bed availability across all wards',
      icon: 'bed',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Easy Appointments',
      description: 'Book appointments quickly and conveniently',
      icon: 'calendar',
      gradient: 'from-teal-500 to-emerald-500'
    }
  ]

  const renderIcon = (iconType, gradient) => {
    const iconClass = `w-8 h-8 bg-gradient-to-br ${gradient} bg-clip-text text-transparent`

    switch (iconType) {
      case 'stethoscope':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8h-1.26c-.19-.73-.48-1.42-.85-2.06l.94-.94a1 1 0 0 0-1.41-1.41l-.94.94c-.65-.38-1.34-.67-2.07-.86V3a1 1 0 0 0-2 0v.67c-.73.19-1.42.48-2.06.85l-.94-.94a1 1 0 0 0-1.41 1.41l.94.94c-.38.65-.67 1.34-.86 2.07H6a1 1 0 0 0 0 2h1.08c.11.57.29 1.12.54 1.64l-1.3 1.3a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l1.3-1.3c.52.25 1.07.43 1.64.54V19a3 3 0 0 0 6 0v-2.08c.57-.11 1.12-.29 1.64-.54l1.3 1.3a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-1.3-1.3c.25-.52.43-1.07.54-1.64H19a1 1 0 0 0 0-2zm-5 11a1 1 0 0 1-2 0v-1.54A6 6 0 0 0 14 12a1 1 0 0 0-2 0 4 4 0 1 1-4-4 1 1 0 0 0 0-2 6 6 0 0 0-6 6 6 6 0 0 0 4 5.65V19a3 3 0 0 0 6 0z" />
          </svg>
        )
      case 'bed':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9.5V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3.5c-1.1 0-2 .9-2 2V18h2v2h2v-2h12v2h2v-2h2v-6.5c0-1.1-.9-2-2-2zM8 6h8c.55 0 1 .45 1 1v2H7V7c0-.55.45-1 1-1z" />
          </svg>
        )
      case 'calendar':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div>
      {/* Hero Section with Modern Mesh Gradient */}
      <section className="gradient-mesh text-white py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-light mb-6 tracking-wide animate-float">
            Welcome to VitalCare Hospital
          </h1>
          <p className="text-xl md:text-3xl mb-8 font-light tracking-wider text-white/90">
            Your Health, Our Priority - Providing Excellence in Healthcare
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto font-light leading-relaxed text-white/80">
            Experience world-class medical care with our team of expert doctors,
            state-of-the-art facilities, and compassionate service available 24/7.
          </p>
          <button
            onClick={() => setCurrentPage('appointments')}
            className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-xl transition-all duration-300 shadow-medium hover:shadow-glow hover:-translate-y-1 hover:scale-105 flex items-center gap-3 mx-auto group"
          >
            <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book an Appointment
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="group card text-center bg-white">
                <div className={`icon-feature bg-gradient-to-br ${feature.gradient} mx-auto mb-6`}>
                  {renderIcon(feature.icon, feature.gradient)}
                </div>
                <h3 className="text-2xl font-display font-bold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Dark Background */}
      <section className="py-20 gradient-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="group">
              <div className="h-px bg-gradient-to-r from-transparent via-primary-light to-transparent mb-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-6xl md:text-7xl font-display font-extrabold text-primary-light mb-3 animate-count-up">
                50+
              </div>
              <div className="text-neutral-300 text-lg font-light tracking-wide">Expert Doctors</div>
            </div>
            <div className="group">
              <div className="h-px bg-gradient-to-r from-transparent via-primary-light to-transparent mb-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-6xl md:text-7xl font-display font-extrabold text-primary-light mb-3 animate-count-up">
                10,000+
              </div>
              <div className="text-neutral-300 text-lg font-light tracking-wide">Happy Patients</div>
            </div>
            <div className="group">
              <div className="h-px bg-gradient-to-r from-transparent via-primary-light to-transparent mb-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-6xl md:text-7xl font-display font-extrabold text-primary-light mb-3 animate-count-up">
                25+
              </div>
              <div className="text-neutral-300 text-lg font-light tracking-wide">Years Experience</div>
            </div>
            <div className="group">
              <div className="h-px bg-gradient-to-r from-transparent via-primary-light to-transparent mb-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-6xl md:text-7xl font-display font-extrabold text-primary-light mb-3 animate-count-up">
                24/7
              </div>
              <div className="text-neutral-300 text-lg font-light tracking-wide">Emergency Care</div>
            </div>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      </section>
    </div>
  )
}
