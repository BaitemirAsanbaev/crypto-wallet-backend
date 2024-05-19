import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../users/user.model';

interface SwapsCreationAttribute {
  gettingQuantity: number,
  losingQuantity: number,
  gettingCoin: string,
  losingCoin: string,
  user_id:number
}

@Table({
  tableName: 'swaps',
})
export class Swaps extends Model<Swaps, SwapsCreationAttribute> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  gettingQuantity: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  losingQuantity: number;

  @Column({ type: DataType.STRING, allowNull: false })
  gettingCoin: string;

  @Column({ type: DataType.STRING, allowNull: false })
  losingCoin: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @BelongsTo(() => User)
  owner: User;
}