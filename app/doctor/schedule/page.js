"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SchedulePage() {
    const router = useRouter()
    const [schedule, setSchedule] = useState([
        { day: 1, dayName: "Monday", start: "09:00", end: "17:00", active: true },
        { day: 2, dayName: "Tuesday", start: "09:00", end: "17:00", active: true },
        { day: 3, dayName: "Wednesday", start: "09:00", end: "17:00", active: true },
        { day: 4, dayName: "Thursday", start: "09:00", end: "17:00", active: true },
        { day: 5, dayName: "Friday", start: "09:00", end: "17:00", active: true },
    ])
    const [status, setStatus] = useState("")

    const saveSchedule = async () => {
        setStatus("Saving...")
        try {
            const activeSchedule = schedule.filter(s => s.active).map(s => ({
                dayOfWeek: s.day,
                startTime: s.start,
                endTime: s.end
            }))

            const res = await fetch("/api/doctor/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ schedule: activeSchedule })
            })

            if (res.ok) {
                setStatus("Saved successfully!")
                router.refresh()
                setTimeout(() => router.push("/doctor/dashboard"), 1500)
            } else {
                setStatus("Error saving.")
            }
        } catch (e) {
            setStatus("Error saving.")
        }
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Manage Weekly Schedule</h1>
            <div className="bg-white p-6 rounded shadow max-w-2xl">
                {schedule.map((day, index) => (
                    <div key={day.day} className="flex items-center gap-4 mb-4">
                        <div className="w-24 font-medium">{day.dayName}</div>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked={day.active} onChange={() => {
                                const newSchedule = [...schedule]
                                newSchedule[index].active = !newSchedule[index].active
                                setSchedule(newSchedule)
                            }} />
                            Available
                        </label>
                        {day.active && (
                            <>
                                <input type="time" value={day.start} onChange={(e) => {
                                    const newSchedule = [...schedule]
                                    newSchedule[index].start = e.target.value
                                    setSchedule(newSchedule)
                                }} className="border rounded p-1" />
                                <span>to</span>
                                <input type="time" value={day.end} onChange={(e) => {
                                    const newSchedule = [...schedule]
                                    newSchedule[index].end = e.target.value
                                    setSchedule(newSchedule)
                                }} className="border rounded p-1" />
                            </>
                        )}
                    </div>
                ))}
                <div className="flex items-center gap-4 mt-4">
                    <button onClick={saveSchedule} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">Save Schedule</button>
                    {status && <span className="text-sm font-medium">{status}</span>}
                </div>
            </div>
        </div>
    )
}
