// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/auth/login',
      },
      {
        source: '/register',
        destination: '/auth/register',
      },
      {
        source: '/home',
        destination: '/pages/home',
      },
      {
        source: '/messages',
        destination: '/pages/messages',
      },
    ]
  },
}
