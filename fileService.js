import {v4} from 'uuid';
import * as path from 'path';

class FileService {
  saveFile(file){
    const fileName = v4() + '.jpg'
    const filePath = path.resolve('static', fileName)
    file.mv(filePath)
    return fileName
  }


}

export default new FileService()