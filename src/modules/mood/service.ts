import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { mood } from '../../orm/module';

const homeDir = path.resolve(os.homedir(), 'richoleBlog');
!fs.existsSync(homeDir) && fs.mkdirSync(homeDir);

@Injectable()
export default class BaiduService {
  async saveImageText(images: string, text: string, video: string) {
    await (mood as any)
      .build({
        text,
        images,
        video,
      })
      .save();

    return true;
  }

  saveFile(req: Request, filename: string) {
    return new Promise((resolve, reject) => {
      req
        .pipe(fs.createWriteStream(path.resolve(homeDir, filename)))
        .on('finish', resolve)
        .on('error', reject);
    });
  }
}
