export { default } from 'next-auth/middleware'
export const config = {
    matcher: ["/mind-map/:path*",
        "/flash-cards/:path*",
        "/flow-chart/:path*",
        "/learning-technique/:path",
        "/text-summary/:path*",
        "/questions-answers/:path*",
        "/dashboard/:path*",
        "/contacts/:path*"
    ]
}