'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DoctorProfileForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.target)
        
        try {
            const res = await fetch('/api/doctor/profile', {
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Title</label>
                <input
                    name="title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required
                    placeholder="e.g. Senior Cardiologist"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select name="department" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all bg-white" required>
                    <option value="">Select Department</option>
                    <option value="General">General Practice</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                <input
                    name="experience"
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required
                    min="0"
                />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Description</label>
                <textarea
                    name="description"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    required
                    rows={4}
                    placeholder="Tell us about your expertise and qualifications..."
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:scale-100"
            >
                {loading ? 'Saving...' : 'Save Profile & Continue'}
            </button>
        </form>
    )
}
