import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';
import os from 'os';

const YAML_CONFIG_FILENAME = resolve(`config/${process.env.NODE_ENV}.yml`);

const logger = new Logger('Config');

export const config: any = {
  ...(yaml.load(readFileSync(YAML_CONFIG_FILENAME, 'utf8')) as any),
  STATIC_UPLOAD_DIR: resolve(os.homedir(), 'richoleBlog'),
};

export default () => {
  logger.log(`加载配置文件 ${YAML_CONFIG_FILENAME}`);
  return config;
};
