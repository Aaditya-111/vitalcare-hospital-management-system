import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'

let handler: any;

function getHandler() {
    if (!handler) {
        // Fallback for build time if env vars are missing
        if (!process.env.NEXTAUTH_URL) {
            process.env.NEXTAUTH_URL = process.env.VERCEL_URL 
                ? `https://${process.env.VERCEL_URL}` 
                : "http://localhost:3000";
        }
        handler = NextAuth(authOptions);
    }
    return handler;
}

export async function GET(req: Request, context: any) {
    return getHandler()(req, context);
}

export async function POST(req: Request, context: any) {
    return getHandler()(req, context);
}
