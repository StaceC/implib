import {
  Table, Column, Model,
  CreatedAt, UpdatedAt, DeletedAt,
  IsUUID, PrimaryKey} from 'sequelize-typescript';
//import { Track } from '../stmodels';

@Table
export class Stem extends Model<Stem> {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
