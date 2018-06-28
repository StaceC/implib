
import { Sequelize } from 'sequelize-typescript';
import { Stem, Track } from './models';

const path = require('path');
const env = process.env.NODE_ENV || "development";
const dbProdName = "implib.prod.sqlite";
const dbConfig = require(`${__dirname}/config/dbConfig.json`)[env];
const appConfig = require(`${__dirname}/../config/appConfig.json`)[env];

type AppDatabase = {
  sequelize: Sequelize;
  Stem: typeof Stem;
  Track: typeof Track;
}

export class DatabaseManager {

  private static database: AppDatabase

  static getInstance() {
    if(!DatabaseManager.database) {
      DatabaseManager.init();
    }

    return DatabaseManager.database;
  }

  static init(): Promise<AppDatabase> {
    return new Promise(function (resolve, reject) {
      // TODO: Get these paths configured and available in a global settings file
      //If in production, make sure to setup the DB in the user's app data folder
      try {
        if(env === "production") {
          dbConfig.storage = path.join(
            require("electron").remote.app.getPath("appData"),
            appConfig.appName,
            dbProdName);
        }

        const sequelize = new Sequelize(dbConfig);
        sequelize.addModels([ Stem, Track]);
        sequelize.sync({force: true});

        DatabaseManager.database = {
          sequelize,
          Stem,
          Track
        }

        resolve(DatabaseManager.database);

      } catch(err) {
        reject(err);
      }
    });
  }

  static isActive() {
    return new Promise(function (resolve, reject) {
      DatabaseManager.database.sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
          resolve();
        })
        .catch((err: any) => {
          console.error('Unable to connect to the database:', err);
          reject(err);
        });
    });
  }



}
