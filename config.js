module.exports = {
  server: {
    port: process.env.PORT || 3001,
    routePrefix: '/api',
  },
  login: {
    attemptsCount: 5,
    skipTimeoutInMs: 1 * 60 * 1000, // change to 10 min
    name: 'admin',
    password: 'admin'
  }
};
