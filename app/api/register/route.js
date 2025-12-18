import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"

export async function POST(req) {
    try {
        const { name, email, password, role } = await req.json()

        if (!name || !email || !password || !role) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 })
        }

        const exist = await prisma.user.findUnique({
            where: { email }
        })

        if (exist) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role,
            }
        })

        return NextResponse.json(user)

    } catch (error) {
        console.error("Registration Error:", error)
        return NextResponse.json({ message: error.message || "Error creating user" }, { status: 500 })
    }
}
