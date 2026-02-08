import { getServerSession } from "next-auth"
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
        const formData = await req.formData()
        const phone = formData.get("phone") as string
        const age = parseInt(formData.get("age") as string)
        const gender = formData.get("gender") as string
        const address = formData.get("address") as string

        const patient = await prisma.patient.create({
            data: {
                userId: session.user.id,
                name: session.user.name || "Unknown",
                phone,
                email: session.user.email || "",
                age,
                gender,
                address
            }
        })

        // Create Audit Log
        await createAuditLog({
            userId: session.user.id,
            action: "CREATE_PATIENT_PROFILE",
            entity: "Patient",
            entityId: patient.id,
            details: { phone, age, gender },
            ipAddress: req.headers.get("x-forwarded-for") || "unknown"
        })

        return NextResponse.json({ success: true, redirectUrl: "/patient/dashboard" })

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ message: "Error creating profile" }, { status: 500 })
    }
}
