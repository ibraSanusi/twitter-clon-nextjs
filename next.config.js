// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/login',
        destination: '/pages/auth/login',
      },
    ]
  },
}
