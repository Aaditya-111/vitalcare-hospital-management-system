import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DOCTOR") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const { schedule } = await req.json() // Array of objects { dayOfWeek, startTime, endTime }

        // Find doctor profile
        const doctor = await prisma.doctor.findUnique({
            where: { userId: session.user.id }
        })

        if (!doctor) {
            return NextResponse.json({ message: "Doctor profile not found" }, { status: 404 })
        }

        // Transaction: Delete old schedules, insert new
        await prisma.$transaction([
            prisma.doctorSchedule.deleteMany({
                where: { doctorId: doctor.id }
            }),
            prisma.doctorSchedule.createMany({
                data: schedule.map(s => ({
                    doctorId: doctor.id,
                    dayOfWeek: s.dayOfWeek,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    isAvailable: true
                }))
            })
        ])

        return NextResponse.json({ message: "Schedule updated" })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error saving schedule" }, { status: 500 })
    }
}
