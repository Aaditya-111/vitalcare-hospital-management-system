import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { createAuditLog } from "@/lib/logger"

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
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

        // Create Audit Log
        await createAuditLog({
            userId: user.id,
            action: "USER_REGISTER",
            entity: "User",
            entityId: user.id,
            details: { role: user.role, email: user.email },
            ipAddress: req.headers.get("x-forwarded-for") || "unknown"
        })

        return NextResponse.json(user)

    } catch (error: any) {
        console.error("Registration Error:", error)
        return NextResponse.json({ message: error.message || "Error creating user" }, { status: 500 })
    }
}
