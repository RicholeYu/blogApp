import { Logger } from '@nestjs/common';
import { config } from 'config';
import { Sequelize, DataTypes } from 'sequelize';

const logger = new Logger('Mysql');
const sequelize = new Sequelize(
  config.db.mysql.database,
  config.db.mysql.account,
  config.db.mysql.password,
  {
    host: config.db.mysql.host,
    port: config.db.mysql.port,
    dialect: 'mysql',
    logging: (sql, timing) => {
      const timingString = `\x1B[33m+${timing}ms\x1B[39m`;
      logger.log(`${sql} ${timingString}`);
    },
    benchmark: true,
  },
);

sequelize.authenticate().then(() => {
  logger.log('Mysql连接成功');
});

export const mood = sequelize.define('mood', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  video: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

mood.sync({ alter: true });
