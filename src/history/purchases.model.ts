import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../users/user.model';

interface PurchasesCreationAttribute {
  quantity: number,
  rate: number,
  total: number,
  coin: string,
  user_id: number
}

@Table({
  tableName: 'purchases',
})
export class Purchases extends Model<Purchases, PurchasesCreationAttribute> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({
    type: DataType.INTEGER, allowNull: false,
  })
  quantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  rate: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  total: number;

  @Column({ type: DataType.STRING, allowNull: false })
  coin: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  owner: User;
}