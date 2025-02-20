require('dotenv').config();

export default ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 8080),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL'),
  webhooks: {
    enabled: true,
  },
  settings: {
    cors: {
      enabled: true,
      origin: [
        "https://dev-frontend-book-app-878493143549.us-central1.run.app",
        "http://localhost:3000",
        "http://localhost:1337",
        "http://localhost:8080"
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      headers: '*',
    },
  },
});
