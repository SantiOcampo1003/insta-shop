export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        "https://dev-frontend-book-app-878493143549.us-central1.run.app",
        "http://dev-frontend-book-app-878493143549.us-central1.run.app",
        "http://localhost:3000",
        "http://localhost:1337",
        "http://localhost:8080"
      ],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true, // Permitir cookies y autenticación
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
