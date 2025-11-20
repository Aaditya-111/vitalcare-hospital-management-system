'use client'

import { useState, useEffect } from 'react'

export default function BedAvailability() {
  const [beds, setBeds] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchBeds()
  }, [])
  
  const fetchBeds = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
      
      const response = await fetch('/api/beds', {
        signal: controller.signal,
        cache: 'no-store'
      })
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const data = await response.json()
        setBeds(data)
      } else {
        console.warn('API failed, using fallback data')
        setBeds(fallbackBeds)
      }
    } catch (error) {
      console.warn('Error fetching beds, using fallback data:', error.message)
      setBeds(fallbackBeds)
    } finally {
      setLoading(false)
    }
  }
  
  const fallbackBeds = [
    // Ward A
    { id: 'Ward A - 101', available: true },
    { id: 'Ward A - 102', available: false },
    { id: 'Ward A - 103', available: true },
    { id: 'Ward A - 104', available: true },
    { id: 'Ward A - 105', available: false },
    { id: 'Ward A - 106', available: true },
    
    // Ward B
    { id: 'Ward B - 201', available: false },
    { id: 'Ward B - 202', available: true },
    { id: 'Ward B - 203', available: false },
    { id: 'Ward B - 204', available: true },
    { id: 'Ward B - 205', available: true },
    { id: 'Ward B - 206', available: false },
    
    // ICU
    { id: 'ICU - 01', available: false },
    { id: 'ICU - 02', available: false },
    { id: 'ICU - 03', available: true },
    { id: 'ICU - 04', available: false },
    { id: 'ICU - 05', available: true },
    { id: 'ICU - 06', available: false },
    
    // Emergency
    { id: 'Emergency - E1', available: true },
    { id: 'Emergency - E2', available: true },
    { id: 'Emergency - E3', available: false },
    { id: 'Emergency - E4', available: true },
  ]

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bed availability...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Bed Availability</h1>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">Not Available</span>
          </div>
        </div>

        {/* Bed Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {beds.map((bed, index) => (
            <div
              key={index}
              className={`card flex items-center justify-between ${
                bed.available ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
              }`}
            >
              <div>
                <p className="font-bold text-gray-900">{bed.id}</p>
                <p className={`text-sm font-semibold ${
                  bed.available ? 'text-green-600' : 'text-red-600'
                }`}>
                  {bed.available ? 'Available' : 'Occupied'}
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full ${
                bed.available ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <p className="text-gray-600 mb-2">Total Beds</p>
            <p className="text-4xl font-bold text-gray-900">{beds.length}</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-600 mb-2">Available</p>
            <p className="text-4xl font-bold text-green-600">
              {beds.filter(b => b.available).length}
            </p>
          </div>
          <div className="card text-center">
            <p className="text-gray-600 mb-2">Occupied</p>
            <p className="text-4xl font-bold text-red-600">
              {beds.filter(b => !b.available).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
