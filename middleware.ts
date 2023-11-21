import { NextRequest, NextResponse } from "next/server"

const PUBLIC_FILE = /\.(.*)$/ // anything having a file extension.
const getIsInternalRoute = (url: string) => {
    if (url.startsWith('/_next')) return true // next internal routes
    if (url.includes('/api/')) return true // nextjs api routes
    return PUBLIC_FILE.test(url) // static files
}

export function middleware(req: NextRequest) {
    if(getIsInternalRoute(req.nextUrl.pathname)) return NextResponse.next()

    if(!req.nextUrl.pathname.includes('en')) return NextResponse.redirect(new URL(`/en`, req.url))

    const response = NextResponse.next()

    return response
}