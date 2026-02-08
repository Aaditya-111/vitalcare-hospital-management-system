import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createAuditLog } from "@/lib/logger"

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
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
                data: schedule.map((s: any) => ({
                    doctorId: doctor.id,
                    dayOfWeek: s.dayOfWeek,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    isAvailable: true
                }))
            })
        ])

        // Create Audit Log
        await createAuditLog({
            userId: session.user.id,
            action: "UPDATE_SCHEDULE",
            entity: "DoctorSchedule",
            entityId: doctor.id,
            details: { scheduleCount: schedule.length },
            ipAddress: req.headers.get("x-forwarded-for") || "unknown"
        })

        return NextResponse.json({ message: "Schedule updated" })

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ message: "Error saving schedule" }, { status: 500 })
    }
}
