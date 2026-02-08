export default function Contacts() {
  const contacts = [
    { dept: 'Emergency & Trauma', phone: '108', available: '24/7' },
    { dept: 'Main Reception', phone: '+91-11-2345-6789', available: '24/7' },
    { dept: 'Appointment Desk', phone: '+91-11-2345-6790', available: '8 AM - 8 PM' },
    { dept: 'Cardiology Department', phone: '+91-11-2345-6791', available: '9 AM - 5 PM' },
    { dept: 'Neurology Department', phone: '+91-11-2345-6792', available: '9 AM - 5 PM' },
    { dept: 'OPD', phone: '+91-11-2345-6793', available: '8 AM - 6 PM' },
    { dept: 'ENT Department', phone: '+91-11-2345-6794', available: '9 AM - 5 PM' },
    { dept: 'Surgery Department', phone: '+91-11-2345-6795', available: '9 AM - 5 PM' },
    { dept: 'Pharmacy', phone: '+91-11-2345-6796', available: '24/7' },
    { dept: 'Laboratory', phone: '+91-11-2345-6797', available: '7 AM - 9 PM' },
    { dept: 'Blood Bank', phone: '+91-11-2345-6798', available: '24/7' },
    { dept: 'Ambulance Service', phone: '102', available: '24/7' }
  ]

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Important Contacts</h1>

        {/* Emergency Banner */}
        <div className="bg-red-600 text-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Emergency Helpline</h2>
              <p className="text-red-100">Available 24/7 for medical emergencies</p>
            </div>
            <a
              href="tel:108"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-2xl hover:bg-red-50 transition-colors"
            >
              108
            </a>
          </div>
        </div>

        {/* Contact List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-200">
            {contacts.map((contact, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{contact.dept}</h3>
                    <p className="text-sm text-gray-600">{contact.available}</p>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-semibold">{contact.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Hospital Address</h2>
          <p className="text-gray-700 mb-2">VitalCare Hospital</p>
          <p className="text-gray-700 mb-2">123 Healthcare Avenue</p>
          <p className="text-gray-700 mb-4">Medical District, City, State 12345</p>
          <p className="text-gray-600">
            <strong>Email:</strong> info@vitalcare.com
          </p>
        </div>
      </div>
    </div>
  )
}
