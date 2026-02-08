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
        const formData = await req.formData()
        const title = formData.get("title") as string
        const department = formData.get("department") as string
        const experience = parseInt(formData.get("experience") as string)
        const description = formData.get("description") as string

        const doctor = await prisma.doctor.create({
            data: {
                userId: session.user.id,
                name: session.user.name || "Unknown", // Use user's name
                title,
                department,
                experience,
                description,
                available: true,
            }
        })

        // Create Audit Log
        await createAuditLog({
            userId: session.user.id,
            action: "CREATE_DOCTOR_PROFILE",
            entity: "Doctor",
            entityId: doctor.id,
            details: { title, department, experience },
            ipAddress: req.headers.get("x-forwarded-for") || "unknown"
        })

        // Return success and redirect URL
        return NextResponse.json({ success: true, redirectUrl: "/doctor/dashboard" })

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({ message: "Error creating profile" }, { status: 500 })
    }
}
