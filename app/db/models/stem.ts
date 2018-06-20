import {
  Table, Column, Model,
  CreatedAt, UpdatedAt, DeletedAt,
  IsUUID, PrimaryKey} from 'sequelize-typescript';

@Table
export class Stem extends Model<Stem> {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  status: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
