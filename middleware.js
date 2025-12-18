import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const isAuth = !!token
        const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/dashboard', req.url)) // Or redirect based on role
            }
            return null
        }

        if (!isAuth) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }
            return NextResponse.redirect(
                new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
            );
        }

        // Role based protection
        if (req.nextUrl.pathname.startsWith('/admin') && token.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }

        if (req.nextUrl.pathname.startsWith('/doctor') && token.role !== 'DOCTOR') {
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }

        if (req.nextUrl.pathname.startsWith('/patient') && token.role !== 'PATIENT') {
            // Allow patient to access shared routes if needed, but here locking down /patient
            return NextResponse.redirect(new URL('/unauthorized', req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: ['/admin/:path*', '/doctor/:path*', '/patient/:path*']
}
