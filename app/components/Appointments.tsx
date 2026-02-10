'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AppointmentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!session) return null

  return <AppointmentsContent />
}

function AppointmentsContent() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Example selected doctor (normally comes from API / URL)
  const doctor = {
    id: 'doc_123',
    name: 'Dr. Rajesh Kumar',
    department: 'Cardiology'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.target)

    const data = {
      doctorId: doctor.id,
      preferredDate: formData.get('preferredDate'),
      preferredTime: formData.get('preferredTime'),
      reasonForVisit: formData.get('reasonForVisit')
    }

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to create appointment')
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError('Failed to book appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold mb-3">Appointment Requested</h2>
          <p className="text-gray-600 mb-6">
            Your appointment request has been submitted successfully.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Book an Appointment
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Doctor (read-only) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Doctor
              </label>
              <input
                type="text"
                value={doctor.name}
                disabled
                className="input-field bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Department (read-only) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Department
              </label>
              <input
                type="text"
                value={doctor.department}
                disabled
                className="input-field bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Time <span className="text-red-500">*</span>
                </label>
                <select name="preferredTime" required className="input-field">
                  <option value="">Select Time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Reason for Visit <span className="text-red-500">*</span>
              </label>
              <textarea
                name="reasonForVisit"
                required
                rows={4}
                className="input-field"
                placeholder="Describe symptoms or concerns..."
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'Submitting...' : 'Request Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}