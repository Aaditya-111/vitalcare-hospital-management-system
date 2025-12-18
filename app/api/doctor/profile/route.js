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
        const formData = await req.formData()
        const title = formData.get("title")
        const department = formData.get("department")
        const experience = parseInt(formData.get("experience"))
        const description = formData.get("description")

        const doctor = await prisma.doctor.create({
            data: {
                userId: session.user.id,
                name: session.user.name, // Use user's name
                title,
                department,
                experience,
                description,
                available: true,
            }
        })

        // Redirect to dashboard
        return NextResponse.redirect(new URL("/doctor/dashboard", req.url))

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error creating profile" }, { status: 500 })
    }
}
