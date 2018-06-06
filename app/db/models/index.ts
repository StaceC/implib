const path = require('path');
import {Sequelize} from 'sequelize-typescript';
import { Todo, Stem, Track } from '../stmodels';

const env = process.env.NODE_ENV || "development";
const dbProdName = "implib.prod.sqlite";
const dbConfig = require(`${__dirname}/../config/dbConfig.json`)[env];
const appConfig = require(`${__dirname}/../../config/appConfig.json`)[env];

// TODO: Get these paths configured and available in a global settings file
//If in production, make sure to setup the DB in the user's app data folder
if(env === "production") {
  dbConfig.storage = path.join(
    require("electron").remote.app.getPath("appData"),
    appConfig.appName,
    dbProdName);
}
console.log("SQLite DB instantiated at [" + dbConfig.storage + "]");

const sequelize = new Sequelize(dbConfig);
sequelize.addModels([Todo, Stem, Track]);
sequelize.sync({force: true});

const db = {
  sequelize,
  Sequelize,
  Todo: Todo,
  Stem: Stem,
  Track: Track
}

export default db;
