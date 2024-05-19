import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../users/user.model';

interface WalletCreationAttribute {
  title: string,
  image: string,
  user_id: number
}

@Table({
  tableName: 'wallet',
})
export class Wallet extends Model<Wallet, WalletCreationAttribute> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:10_000
  })
  usd: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:0
  })
  btc: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:0
  })
  eth: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:0
  })
  bnb: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue:0
  })
  doge: number;


  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  owner: User;
}