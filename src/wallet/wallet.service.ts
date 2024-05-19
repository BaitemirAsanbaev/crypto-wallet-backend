import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './wallet.model';
import { BuyCoinDto } from './dto/buy-coin.dto';
import { JwtService } from '@nestjs/jwt';
import { raw } from 'express';
import { UsersService } from '../users/users.service';
import { SwapCoinDto } from './dto/swap-coin.dto';

@Injectable()
export class WalletService {
  constructor(@InjectModel(Wallet)
              private walletRepo: typeof Wallet,
              private jwtService: JwtService) {
  }

  async createWallet(user_id: number) {
    return await this.walletRepo.create({ user_id });
  }

  async buyCoin(token: any, dto: BuyCoinDto) {
    const { id } = this.jwtService.decode(token);
    const { coin, quantity, rate } = dto;
    const wallet = await this.walletRepo.findOne({ where: { user_id: id } });

    if (wallet === null) {
      throw new HttpException('Wallet not found', HttpStatus.BAD_REQUEST);
    }
    if (wallet.usd < rate * quantity) {
      throw new HttpException('Not enough money', HttpStatus.BAD_REQUEST);
    }
    wallet.usd -= rate * quantity;
    wallet[coin] += quantity;
    await wallet.save();
    return wallet;
  }
  async sellCoin(token: any, dto: BuyCoinDto) {
    const { id } = this.jwtService.decode(token);
    const { coin, quantity, rate } = dto;
    const wallet = await this.walletRepo.findOne({ where: { user_id: id } });

    if (wallet === null) {
      throw new HttpException('Wallet not found', HttpStatus.BAD_REQUEST);
    }
    if (wallet[coin] < quantity) {
      throw new HttpException(`Not enough ${coin}`, HttpStatus.BAD_REQUEST);
    }
    wallet.usd += rate * quantity;
    wallet[coin] -= quantity;
    await wallet.save();
    return wallet;
  }
  async swapCoin(token: any, dto: SwapCoinDto) {
    const { id } = this.jwtService.decode(token);
    const { gettingCoin, losingCoin, gettingQuantity, losingQuantity } = dto;
    const wallet = await this.walletRepo.findOne({ where: { user_id: id } });

    if (wallet === null) {
      throw new HttpException('Wallet not found', HttpStatus.BAD_REQUEST);
    }
    if (wallet[losingCoin] < losingQuantity) {
      throw new HttpException(`Not enough ${losingCoin}`, HttpStatus.BAD_REQUEST);
    }
    wallet[losingCoin] -= losingQuantity;
    wallet[gettingCoin] += gettingQuantity;
    await wallet.save();
    return wallet;
  }
}
