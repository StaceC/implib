import {Sequelize} from 'sequelize-typescript';
import { Todo } from '../stmodels/todo';

const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];
const sequelize = new Sequelize(config);

sequelize.addModels([Todo]);
sequelize.sync({force: true});

const db = {
  sequelize,
  Sequelize,
  Todo: Todo
}

export default db;
