import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Auth attempt for:", credentials?.email)
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing email or password")
                    throw new Error("Invalid credentials")
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!user) {
                    console.log("User not found in database:", credentials.email)
                    throw new Error("User not found")
                }

                if (!user.password) {
                    console.log("User has no password set:", credentials.email)
                    throw new Error("User mismatch")
                }

                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!isPasswordCorrect) {
                    console.log("Incorrect password for:", credentials.email)
                    throw new Error("Invalid password")
                }

                console.log("Auth successful for:", credentials.email)
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
}
