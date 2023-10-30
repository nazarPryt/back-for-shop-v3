import { v2 as cloudinary } from 'cloudinary'

class CloudinaryService {
   async uploadProductCover(file: string) {
      return await cloudinary.uploader.upload(file)
   }
   async uploadProductAllImages(files: []) {
      try {
         const urls = [];
         for (const file of files) {
            const { tempFilePath } = file;
            const newPath = await cloudinary.uploader.upload(tempFilePath);
            urls.push(newPath);
         }
         return urls
      } catch (e) {
         console.log(e);
      }

   }
}

export default new CloudinaryService()
