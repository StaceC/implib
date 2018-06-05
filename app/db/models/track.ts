import * as Sequelize from "sequelize";
import { DefineAttributes } from "sequelize";

interface TrackAttributes {
  id?: string;
  name: string;
  imported: boolean;
  createdAt?: string;
  updatedAt?: string;
  error?: string;
}

type TrackInstance = Sequelize.Instance<TrackAttributes> & TrackAttributes;

export default (sequalize: Sequelize.Sequelize) => {
  const attributes: DefineAttributes = {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    name: { type: Sequelize.STRING, allowNull: false },
    imported: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },    
    error: { type: Sequelize.STRING, allowNull: true },
  };
  return sequalize.define<TrackInstance, TrackAttributes>("Track", attributes);
};
