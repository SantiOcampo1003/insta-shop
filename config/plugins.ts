const path = require('path');
require('dotenv').config();

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        bucketName: ("instashop-bucket"),
        serviceAccount: env('GOOGLE_APPLICATION_CREDENTIALS')
          ? require(path.resolve(env('GOOGLE_APPLICATION_CREDENTIALS')))
          : undefined,
        publicFiles: false,
        uniform: true,
      },
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        title: "API Docs",
        description: "Documentación de la API de Strapi",
        version: "1.0.0",
      },
    },
  },
});