"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode) // 'login' or 'signup'
    const [data, setData] = useState({ name: "", email: "", password: "", role: "PATIENT" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        // Validation for Signup
        if (mode === 'signup') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(data.email)) {
                setError("Please enter a valid email address")
                setLoading(false)
                return
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            if (!passwordRegex.test(data.password)) {
                setError("Password must be at least 8 chars, include uppercase, lowercase, number & special char")
                setLoading(false)
                return
            }
        }

        try {
            if (mode === 'login') {
                const result = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                })

                if (result.error) {
                    setError("Invalid credentials")
                } else if (result.ok) {
                    onClose()
                    router.refresh()
                }
            } else {
                // Register
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })

                if (res.ok) {
                    setMode('login')
                    setError("Registration successful! Please login.")
                    setData(prev => ({ ...prev, password: "" })) // Clear password
                } else {
                    const errData = await res.json()
                    setError(errData.message || "Registration failed")
                }
            }
        } catch (err) {
            setError("An unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="px-8 pt-8 text-center">
                    <h2 className="text-3xl font-display font-bold text-gray-900">
                        {mode === 'login' ? 'Welcome Back' : 'Join VitalCare'}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {mode === 'login'
                            ? 'Sign in to access your dashboard'
                            : 'Create your account to get started'}
                    </p>
                </div>

                {/* Form */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {mode === 'signup' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={e => setData({ ...data, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        value={data.role}
                                        onChange={e => setData({ ...data, role: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white"
                                    >
                                        <option value="PATIENT">Patient</option>
                                        <option value="DOCTOR">Doctor</option>
                                        <option value="ADMIN">Admin (Test)</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={data.email}
                                onChange={e => setData({ ...data, email: e.target.value.toLowerCase() })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={e => setData({ ...data, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className={`text-sm text-center p-2 rounded ${error.includes('successful') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => {
                                    setMode(mode === 'login' ? 'signup' : 'login')
                                    setError("")
                                }}
                                className="font-bold text-primary hover:text-primary-dark hover:underline transition-colors"
                            >
                                {mode === 'login' ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
