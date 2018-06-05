import * as Sequelize from "sequelize";
import { DefineAttributes } from "sequelize";

interface StemAttributes {
  id?: string;
  name: string;
  imported: boolean;
  createdAt?: string;
  updatedAt?: string;
  error?: string;
}

type StemInstance = Sequelize.Instance<StemAttributes> & StemAttributes;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: DefineAttributes = {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    name: { type: Sequelize.STRING, allowNull: false },
    imported: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    error: { type: Sequelize.STRING, allowNull: true },
  };
  return sequalize.define<StemInstance, StemAttributes>("Stem", attributes);
};
