import { IsNotEmpty, IsArray, IsString } from 'class-validator';

export class MoodImageTextValidator {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsString()
  video?: string;
}

export class MoodAssetsUpload {
  @IsNotEmpty()
  @IsString()
  /** 文件名 */
  filename: string;

  @IsNotEmpty()
  @IsString()
  /** 文件拓展名 */
  ext: string;
}
