import { Injectable } from '@nestjs/common';
import https from 'https';
import { ListData, QueryData } from './controller';

const ak = 'M0GBlddkka3MC0IFTniM33Z55ssTxyfv';

export interface AddressListResponse {
  location: {
    lng: number;
    lat: number;
  };
  formatted_address: string;
  business: string;
  pois: any;
}

export interface AddressQueryResponse {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  province: string;
  city: string;
  area: string;
  street_id: string;
  detail: number;
  uid: string;
}

@Injectable()
export default class BaiduService {
  getList(query: ListData): Promise<AddressListResponse> {
    return new Promise((resolve) => {
      https
        .get(
          `https://api.map.baidu.com/reverse_geocoding/v3/?ak=${ak}&output=json&location=${query.latitude},${query.longitude}&extensions_poi=1&coordtype=wgs84ll`,
          async (res) => {
            let datas = '';
            for await (const chunk of res) {
              datas += chunk.toString();
            }
            resolve(JSON.parse(datas));
          },
        )
        .end();
    });
  }

  query(query: QueryData): Promise<AddressQueryResponse> {
    return new Promise((resolve) => {
      https
        .get(
          `https://api.map.baidu.com/place/v2/search?query=${query.query}&location=${query.latitude},${query.longitude}&output=json&ak=${ak}&radius=2000`,
          async (res) => {
            let datas = '';
            for await (const chunk of res) {
              datas += chunk.toString();
            }
            resolve(JSON.parse(datas));
          },
        )
        .end();
    });
  }
}
