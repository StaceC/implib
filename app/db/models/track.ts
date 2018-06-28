import {
  Table, Column, Model,
  HasMany, CreatedAt, UpdatedAt,
  DeletedAt, IsUUID, PrimaryKey,
  DataType} from 'sequelize-typescript';
import { Stem } from "./stem";

@Table
export class Track extends Model<Track> {

  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Column
  status: string;

  @Column
  configFileUrl: string;

  @CreatedAt
  @Column(DataType.DATE)
  creationDate: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedOn: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletionDate: Date;

  @HasMany(() => Stem, 'trackId')
  stems: Stem[];
}
