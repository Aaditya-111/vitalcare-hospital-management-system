import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "PATIENT") {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const formData = await req.formData()
        const phone = formData.get("phone")
        const age = parseInt(formData.get("age"))
        const gender = formData.get("gender")
        const address = formData.get("address")

        const patient = await prisma.patient.create({
            data: {
                userId: session.user.id,
                name: session.user.name,
                phone,
                email: session.user.email,
                age,
                gender,
                address
            }
        })

        return NextResponse.redirect(new URL("/patient/dashboard", req.url))

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error creating profile" }, { status: 500 })
    }
}
