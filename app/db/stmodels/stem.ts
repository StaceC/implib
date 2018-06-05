import {Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt} from 'sequelize-typescript';

@Table
export class Stem extends Model<Stem> {

  @Column
  name: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
