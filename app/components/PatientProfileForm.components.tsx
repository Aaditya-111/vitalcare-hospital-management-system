'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PatientProfileForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.target)
        
        try {
            const res = await fetch('/api/patient/profile', {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()

            if (data.success && data.redirectUrl) {
                router.push(data.redirectUrl)
                router.refresh()
            } else {
                setError(data.message || 'Something went wrong')
            }
        } catch (err) {
            setError('Failed to save profile. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                    {error}
                </div>
            )}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                    name="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                    placeholder="+91 1234567890"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                    <input
                        name="age"
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        required
                        min="0"
                        max="150"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                    <select name="gender" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                <textarea
                    name="address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    rows={3}
                    placeholder="Enter your full address"
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
            >
                {loading ? 'Saving...' : 'Save Profile & Continue'}
            </button>
        </form>
    )
}
