import {
  Table, Column, Model,
  CreatedAt, UpdatedAt, DeletedAt,
  IsUUID, PrimaryKey, DataType} from 'sequelize-typescript';

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
  @Column(DataType.DATE)
  creationDate: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedOn: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletionDate: Date;
}
