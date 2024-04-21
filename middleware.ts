export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/home',
    '/dashboard',
    '/explore',
    '/message',
    '/profile',
    '/settings',
  ],
}
