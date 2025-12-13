import { NextRequest, NextResponse } from "next/server"


export function middleware(request: NextRequest) { 

    const token = request.cookies.get("x-access-token")?.value
    console.log("x-access-token", token);

    const { pathname } = request.nextUrl

    if(pathname.startsWith("/dashboard") && !token) {
        return  NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };