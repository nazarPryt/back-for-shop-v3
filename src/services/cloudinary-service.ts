import { v2 as cloudinary } from 'cloudinary'

class CloudinaryService {
   async uploadProductCover(file: string) {
      return await cloudinary.uploader.upload(file)
   }
}

export default new CloudinaryService()
