import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createAuditLog } from "@/lib/logger"

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "PATIENT") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { doctorId, preferredDate, preferredTime, reasonForVisit } = await req.json()

    if (!doctorId || !preferredDate || !preferredTime || !reasonForVisit) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    // Find Patient ID
    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id }
    })

    if (!patient) {
      return NextResponse.json({ message: "Patient profile missing" }, { status: 400 })
    }

    // Fetch Doctor to get department
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { department: true }
    })

    if (!doctor) {
      return NextResponse.json({ message: "Doctor not found" }, { status: 404 })
    }

    // Create Appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId,
        patientName: patient.name,
        phone: patient.phone,
        department: doctor.department, 
        preferredDate: new Date(preferredDate),
        preferredTime,
        reasonForVisit,
        status: "pending"
      }
    })

    // Create Audit Log
    await createAuditLog({
      userId: session.user.id,
      action: "CREATE_APPOINTMENT",
      entity: "Appointment",
      entityId: appointment.id,
      details: { doctorId, preferredDate, preferredTime },
      ipAddress: req.headers.get("x-forwarded-for") || "unknown"
    })

    return NextResponse.json(appointment)

  } catch (error: any) {
    console.error("Appointment booking error:", error)
    return NextResponse.json({ 
      message: "Error booking appointment", 
      error: error.message 
    }, { status: 500 })
  }
}
