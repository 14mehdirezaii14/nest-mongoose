import * as mkdirp from 'mkdirp';
import sharp from 'sharp';
import { UploadFileDto } from '../dtos/upload-file.dto';
import { UploadFilesDto } from '../dtos/upload-files.dto';
import * as fs from 'fs';

export const saveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const { folder, height, width } = body;

  const destination = folder ? `files/${folder}/` : 'files/';

  const fileName = `${new Date().getMilliseconds()}-${file.originalname.split('.')[0]}.webp`;

  mkdirp.sync(destination + '/main');
  mkdirp.sync(destination + '/resized');

  await sharp(file.buffer)
    .webp()
    .toFile(destination + 'main/' + fileName);

  await sharp(file.buffer)
    .webp()
    .resize({ width: Number(width) || 200, height: Number(height) || 200 })
    .toFile(destination + 'resized/' + fileName);

  return fileName;
};

export const saveImages = async (
  files: Array<Express.Multer.File>,
  body: UploadFilesDto,
) => {
  const { folder, height, width } = body;

  const fileNames: string[] = [];

  for (const file of files) {
    const destination = folder ? `files/${folder}/` : 'files/';

    const fileName = `${new Date().getMilliseconds()}-${file.originalname.split('.')[0]}.webp`;

    mkdirp.sync(destination + '/main');
    mkdirp.sync(destination + '/resized');

    await sharp(file.buffer)
      .webp()
      .toFile(destination + 'main/' + fileName);

    await sharp(file.buffer)
      .webp()
      .resize({ width: Number(width) || 200, height: Number(height) || 200 })
      .toFile(destination + 'resized/' + fileName);

    fileNames.push(fileName);
  }

  return fileNames;
};

export const deleteImage = async (fileName: string, folder: string) => {
  const imagePath = `/files/${folder}/`;

  try {
    await fs.promises.unlink(`./${imagePath}/main/${fileName}`);
    await fs.promises.unlink(`./${imagePath}/resized/${fileName}`);
  } catch (err) {
    console.log(err);
  }
};
