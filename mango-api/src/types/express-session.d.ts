import 'cookie-session'

declare global {
    namespace Express {
        interface Request {
            session: (CookieSessionInterfaces.CookieSessionObject & {
                isAdmin?: boolean
            }) | null
        }
    }
}