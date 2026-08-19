import * as mkdirp from 'mkdirp';
import sharp from 'sharp';
import { UploadFileDto } from '../dtos/upload-file.dto';

export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  console.log(body);
  const destination = body.folder ? `files/${body.folder}/` : 'files/';

  const fileName = `${new Date().getMilliseconds()}-${file.originalname}`;

  console.log(destination + fileName, '<><><><');

  mkdirp.sync(destination);

  await sharp(file.buffer).toFile(destination + fileName);

  return fileName;
};
