"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BookingPage() {
    const router = useRouter()
    const [doctors, setDoctors] = useState([])
    const [selectedDoctor, setSelectedDoctor] = useState("")
    const [date, setDate] = useState("")
    const [availableSlots, setAvailableSlots] = useState([])
    const [reason, setReason] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch doctors
        fetch("/api/doctors").then(res => res.json()).then(data => {
            setDoctors(data)
            setLoading(false)
        })
    }, [])

    const handleDoctorChange = async (docId) => {
        setSelectedDoctor(docId)
        // Reset slots
        setAvailableSlots([])
    }

    const checkAvailability = async () => {
        if (!selectedDoctor || !date) return

        // Fetch availability for specific date
        // Simple logic: Get doctor's schedule for that day of week, subtract existing appointments
        const res = await fetch(`/api/doctor/${selectedDoctor}/availability?date=${date}`)
        const data = await res.json()
        setAvailableSlots(data.slots || [])
    }

    const bookAppointment = async (slot) => {
        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctorId: selectedDoctor,
                    date,
                    time: slot,
                    reason
                })
            })

            if (res.ok) {
                router.push("/patient/dashboard")
            } else {
                alert("Booking failed")
            }
        } catch (e) {
            alert("Error booking")
        }
    }

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>

            <div className="bg-white p-6 rounded shadow space-y-4">
                <div>
                    <label className="block font-medium mb-1">Select Doctor</label>
                    <select
                        className="w-full border p-2 rounded"
                        value={selectedDoctor}
                        onChange={(e) => handleDoctorChange(e.target.value)}
                    >
                        <option value="">-- Choose a Doctor --</option>
                        {doctors.map(doc => (
                            <option key={doc.id} value={doc.id}>
                                {doc.name} - {doc.department}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">Preferred Date</label>
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={checkAvailability}
                        disabled={!selectedDoctor || !date}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
                    >
                        Check Availability
                    </button>
                </div>

                {availableSlots.length > 0 && (
                    <div className="mt-6 border-t pt-4">
                        <h3 className="font-semibold mb-2">Available Slots</h3>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {availableSlots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => setAvailableSlots([slot])} // Selection logic simplified
                                    className={`p-2 border rounded text-center hover:bg-blue-50 ${availableSlots.length === 1 && availableSlots[0] === slot ? 'bg-blue-600 text-white' : ''}`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>

                        {availableSlots.length === 1 && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-medium mb-1">Reason for Visit</label>
                                    <textarea
                                        className="w-full border p-2 rounded"
                                        rows="2"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    ></textarea>
                                </div>
                                <button
                                    onClick={() => bookAppointment(availableSlots[0])}
                                    className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-500"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
