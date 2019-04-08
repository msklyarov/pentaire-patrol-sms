module.exports = {
  server: {
    port: process.env.PORT || 3001,
    routePrefix: '/api',
  },
  login: {
    attemptsCount: 5,
    timeoutInMs: 10 * 60 * 1000, // 10 min
    name: 'admin',
    password: 'admin'
  }
};
