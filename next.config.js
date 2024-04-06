// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/pages/auth/login',
      },
      {
        source: '/register',
        destination: '/pages/auth/register',
      },
      {
        source: '/home',
        destination: '/pages/home',
      },
    ]
  },
}
