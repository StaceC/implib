import {
  Table, Column, Model,
  CreatedAt, UpdatedAt, DeletedAt,
  IsUUID, PrimaryKey, Default} from 'sequelize-typescript';

@Table
export class Todo extends Model<Todo> {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  text: string;

  @Default(false)
  @Column
  completed: boolean;

  @Default(false)
  @Column
  archived: boolean;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}
