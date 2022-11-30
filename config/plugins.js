module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME', 'dextqrklg'),
        api_key: env('CLOUDINARY_KEY', '235961345245556'),
        api_secret: env('CLOUDINARY_SECRET', 'Vj6ymi6ATQyRGiCnA0c_BLA97Uo'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});