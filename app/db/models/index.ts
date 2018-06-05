import * as Sequelize from "sequelize";
import todoFactory from "./todo";
import trackFactory from "./track";

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
  sequelize,
  Sequelize,
  Todo: todoFactory(sequelize),
  Track: trackFactory(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
