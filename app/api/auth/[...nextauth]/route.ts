import { NextRequest } from "next/server"

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET(req: NextRequest, context: { params: { nextauth: string[] } }) {
    const { default: NextAuth } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    return NextAuth(req as any, context as any, authOptions) as any
}

export async function POST(req: NextRequest, context: { params: { nextauth: string[] } }) {
    const { default: NextAuth } = await import("next-auth")
    const { authOptions } = await import("@/lib/auth")
    return NextAuth(req as any, context as any, authOptions) as any
}
