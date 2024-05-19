import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../wallet/wallet.model';
interface UserCreationAttribute{
  email:string,
  password:string
}
@Table({
  tableName: 'users',
})
export class User extends Model<User, UserCreationAttribute> {
  @ApiProperty({example:"1", description:"unique id"})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example:"example@gmail.com", description:"user's email"})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull:false
  })
  email: string;


  @ApiProperty({example:"123123", description:"user's password"})
  @Column({
    type: DataType.STRING,
    allowNull:false
  })
  password: string;


  @HasOne(()=>Wallet)
  wallet: Wallet[];

}