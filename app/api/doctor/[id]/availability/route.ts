import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params
    const { searchParams } = new URL(req.url)
    const dateStr = searchParams.get("date")

    if (!dateStr) return NextResponse.json({ slots: [] })

    const date = new Date(dateStr)
    const dayOfWeek = date.getDay() // 0-6

    // Get Schedule
    const schedule = await prisma.doctorSchedule.findFirst({
        where: { doctorId: id, dayOfWeek, isAvailable: true }
    })

    if (!schedule) {
        return NextResponse.json({ slots: [] })
    }


    const startOfDay = new Date(dateStr)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(dateStr)
    endOfDay.setHours(23, 59, 59, 999)

    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId: id,
            preferredDate: {
                gte: startOfDay,
                lte: endOfDay
            },
            status: { not: 'cancelled' }
        }
    })

    const takenTimes = appointments.map(a => a.preferredTime)

    // Generate Slots (hourly for simplicity)
    const slots = []
    let current = parseInt(schedule.startTime.split(':')[0])
    const end = parseInt(schedule.endTime.split(':')[0])

    // A simple loop for hourly slots like "09:00", "10:00"
    for (let h = current; h < end; h++) {
        const timeSlot = `${h.toString().padStart(2, '0')}:00`
        if (!takenTimes.includes(timeSlot)) {
            slots.push(timeSlot)
        }
    }

    return NextResponse.json({ slots })
}
