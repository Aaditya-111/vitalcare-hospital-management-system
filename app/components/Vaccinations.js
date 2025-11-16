export default function Vaccinations() {
  const newbornVaccines = [
    { name: 'BCG', status: 'available' },
    { name: 'Polio (OPV)', status: 'available' },
    { name: 'Hepatitis B', status: 'available' },
    { name: 'DPT', status: 'available' },
    { name: 'Hib', status: 'available' },
    { name: 'Rotavirus', status: 'available' }
  ]

  const emergencyVaccines = [
    { name: 'Anti-Rabies (Dog Bite)', status: 'in-stock' },
    { name: 'Anti-Venom (Snake Bite)', status: 'out-of-stock' }
  ]

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Vaccination Availability</h1>

        {/* Newborn Vaccination */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Newborn Vaccination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newbornVaccines.map((vaccine, index) => (
              <div key={index} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vaccine.name}</h3>
                    <p className="text-emerald-600 font-semibold mt-1">Available</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Vaccines */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Vaccines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyVaccines.map((vaccine, index) => (
              <div 
                key={index} 
                className={`card ${
                  vaccine.status === 'in-stock' 
                    ? 'border-l-4 border-green-500' 
                    : 'border-l-4 border-red-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{vaccine.name}</h3>
                    <p className={`text-lg font-bold ${
                      vaccine.status === 'in-stock' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {vaccine.status === 'in-stock' ? 'IN STOCK' : 'OUT OF STOCK'}
                    </p>
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    vaccine.status === 'in-stock' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {vaccine.status === 'in-stock' ? (
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>For emergency vaccinations, please contact our emergency department immediately at <strong>108</strong> or visit the hospital directly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
