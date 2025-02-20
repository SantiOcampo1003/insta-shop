export default {
    routes: [
      {
        method: 'POST',
        path: '/upload',
        handler: 'custom-upload.updloadFiles',
        config: {
          auth: false, 
          policies: [],
        },
      },
    ],
  };
  