import * as Sequelize from "sequelize";
import { DefineAttributes } from "sequelize";

interface TodoAttributes {
  id?: string;
  text: string;
  completed: boolean;
  archived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type TodoInstance = Sequelize.Instance<TodoAttributes> & TodoAttributes;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: DefineAttributes = {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    text: { type: Sequelize.STRING, allowNull: false },
    completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    archived: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  };
  return sequalize.define<TodoInstance, TodoAttributes>("Todo", attributes);
};
