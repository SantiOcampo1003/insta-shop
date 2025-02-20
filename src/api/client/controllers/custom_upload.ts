import { Storage } from '@google-cloud/storage';
import fs from 'fs';

export default {
  async updloadFiles(ctx) {
    try {
      if (!ctx.request.files || Object.keys(ctx.request.files).length === 0) {
        return ctx.badRequest('Se requieren archivos para subir.');
      }
      const storage = new Storage();
      const bucketName = "instashop-bucket"; 
      console.log('📦 Bucket Name:', bucketName);

      if (!bucketName) {
        throw new Error("❌ Bucket Name no está definido en la configuración.");
      }

      const bucket = storage.bucket(bucketName);
      const fileUrls: { [key: string]: string } = {};
      let fileCounter = 1;

      const uploadPromises = Object.entries(ctx.request.files).map(async ([key, file]: [string, { mimetype: string, filepath: string } | { mimetype: string, filepath: string }[]]) => {
        if (Array.isArray(file)) {
          for (const f of file) {
            const fileExtension = f.mimetype.split('/')[1] || 'pdf'; 
            const filePath = `uploads/file${fileCounter}.${fileExtension}`;
            const fileUpload = bucket.file(filePath);

            console.log(`📤 Subiendo Archivo como: ${filePath}`);

            await new Promise((resolve, reject) => {
              fs.createReadStream(f.filepath)
                .pipe(fileUpload.createWriteStream())
                .on('finish', resolve)
                .on('error', reject);
            });

            fileUrls[`file${fileCounter}`] = `https://storage.googleapis.com/${bucketName}/${filePath}`;
            fileCounter++;
          }
        } else {
          const fileExtension = file.mimetype.split('/')[1] || 'pdf'; 
          const filePath = `uploads/file${fileCounter}.${fileExtension}`;
          const fileUpload = bucket.file(filePath);

          console.log(`📤 Subiendo Archivo como: ${filePath}`);

          await new Promise((resolve, reject) => {
            fs.createReadStream(file.filepath)
              .pipe(fileUpload.createWriteStream())
              .on('finish', resolve)
              .on('error', reject);
          });

          fileUrls[`file${fileCounter}`] = `https://storage.googleapis.com/${bucketName}/${filePath}`;
          fileCounter++;
        }
      });

      await Promise.all(uploadPromises);

      return ctx.send({
        message: 'Archivos subidos correctamente',
        urls: fileUrls,
      });

    } catch (error) {
      return ctx.internalServerError('Error al subir archivos');
    }
  },
};
