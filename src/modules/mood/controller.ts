import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import MoodService from './service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { mood } from 'src/orm/module';
import { MoodAssetsUpload, MoodImageTextValidator } from './validate';

@Controller('mood')
export default class WeiboController {
  constructor(
    private readonly moodService: MoodService,
    private readonly configService: ConfigService,
  ) {}

  @Post('write')
  async list(
    @Body()
    body: MoodImageTextValidator,
  ) {
    await this.moodService.saveImageText(
      body.images.join(','),
      body.text,
      body.video,
    );

    return {
      success: true,
    };
  }

  @Post('assets_upload')
  async imageUpload(@Req() req: Request, @Query() query: MoodAssetsUpload) {
    const filename = query.filename;
    const ext = query.ext;
    const newFilename = `${Date.now()}_${filename}.${ext}`;

    await this.moodService.saveFile(req, newFilename);

    return {
      success: true,
      savePath: `${this.configService.get(
        'blog.publicRequestUrl',
      )}/${newFilename}`,
    };
  }

  @Get('list')
  async moodList() {
    const moods = await (mood as any).findAll();

    return {
      moods: moods.map((item: any) => {
        return {
          ...item.dataValues,
          images: (item.images || '').split(',').filter(Boolean),
          video: item.video || '',
        };
      }),
    };
  }
}
