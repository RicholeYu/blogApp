import { Controller, Get, Query, Req } from '@nestjs/common';
import BaiduService from './service';

export interface ListData {
  longitude: string;
  latitude: string;
}

export type QueryData = {
  query: string;
} & ListData;

@Controller('map')
export default class WeiboController {
  constructor(private readonly BaiduService: BaiduService) {}

  @Get('list')
  list(@Query() query: ListData) {
    return this.BaiduService.getList(query);
  }

  @Get('query')
  query(@Query() query: QueryData) {
    return this.BaiduService.query(query);
  }
}
