export default function Home({ setCurrentPage }) {
  const features = [
    {
      title: 'Expert Doctors',
      description: 'Highly qualified specialists across multiple departments',
      icon: '👨‍⚕️',
      color: 'bg-blue-100'
    },
    {
      title: 'Live Bed Status',
      description: 'Real-time bed availability across all wards',
      icon: '🛏️',
      color: 'bg-purple-100'
    },
    {
      title: 'Easy Appointments',
      description: 'Book appointments quickly and conveniently',
      icon: '📅',
      color: 'bg-emerald-100'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to VitalCare Hospital
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-emerald-100">
            Your Health, Our Priority - Providing Excellence in Healthcare
          </p>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Experience world-class medical care with our team of expert doctors, 
            state-of-the-art facilities, and compassionate service available 24/7.
          </p>
          <button 
            onClick={() => setCurrentPage('appointments')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
          >
            Book an Appointment
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform">
                <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 text-4xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">25+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <div className="text-gray-600">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
