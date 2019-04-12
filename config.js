module.exports = {
  server: {
    port: process.env.PORT || 3001,
    routeApiPrefix: '/api',
    routeAuthPrefix: '/auth',
    routeAdminApiPrefix: '/admin-api',
    routeAdminAuthPrefix: '/admin-auth',
    routeLogsPrefix: '/logs',
  },
  login: {
    attemptsCount: 5,
    skipTimeoutInMs: 1 * 60 * 1000, // change to 10 min
  }
};
