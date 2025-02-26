require('dotenv').config();

export default ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 8080),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'http://localhost:8080'),
  webhooks: {
    enabled: true,
  },
});
