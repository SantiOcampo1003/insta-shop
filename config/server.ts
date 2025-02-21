require('dotenv').config();

export default ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 8080),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'https://strapi-app-878493143549.us-central1.run.app'),
  webhooks: {
    enabled: true,
  },
});
