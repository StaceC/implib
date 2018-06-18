import {
  Table, Column, Model,
  HasMany, CreatedAt, UpdatedAt,
  DeletedAt, IsUUID, PrimaryKey} from 'sequelize-typescript';
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
  @Column
  creationDate: Date;

  @UpdatedAt
  @Column
  updatedOn: Date;

  @DeletedAt
  @Column
  deletionDate: Date;

  @HasMany(() => Stem, 'trackId')
  stems: Stem[];
}
