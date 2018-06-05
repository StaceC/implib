import {Sequelize} from 'sequelize-typescript';
import { Todo, Stem, Track } from '../stmodels';
import {  } from '../stmodels/todo';

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];
const sequelize = new Sequelize(config);

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
