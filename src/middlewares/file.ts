import multer from 'multer'

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, '/tmp/my-uploads')
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
   },
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (
   req: any,
   file: Express.Multer.File,
   cb: multer.FileFilterCallback
) => {
   if (types.includes(file.mimetype)) {
      cb(null, true)
   } else {
      cb(null, false)
   }
}
export const upload = multer({ storage, fileFilter })
