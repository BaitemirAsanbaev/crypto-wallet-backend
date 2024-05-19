import { Injectable } from '@nestjs/common';
import { BuyCoinDto } from '../wallet/dto/buy-coin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Purchases } from './purchases.model';
import { Sales } from './sales.model';
import { Swaps } from './swaps.model';
import { SwapCoinDto } from '../wallet/dto/swap-coin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HistoryService {

  constructor(
    @InjectModel(Purchases) private purchaseRepo: typeof Purchases,
    @InjectModel(Sales) private salesRepo: typeof Sales,
    @InjectModel(Swaps) private swapsRepo: typeof Swaps,
    private jwtService: JwtService) {
  }

  async addPurchase(dto: BuyCoinDto, user_id:number) {
    return await this.purchaseRepo.create({ ...dto, user_id, total: dto.quantity * dto.rate});
  }

  async addSales(dto: BuyCoinDto, user_id:number) {
    return await this.salesRepo.create({ ...dto, user_id, total: dto.quantity * dto.rate });
  }

  async addSwaps(dto: SwapCoinDto, user_id:number) {
    return await this.swapsRepo.create({ ...dto, user_id });
  }

  async getPurchases(token:string): Promise<Purchases[]> {
    const { id } = await this.jwtService.decode(token);
    return await this.purchaseRepo.findAll({ where: { user_id: id } });
  }
  async getSales(token:string): Promise<Sales[]> {
    const { id } = await this.jwtService.decode(token);
    return await this.salesRepo.findAll({ where: { user_id: id } });
  }
  async getSwaps(token:string): Promise<Swaps[]> {
    const { id } = await this.jwtService.decode(token);
    return await this.swapsRepo.findAll({ where: { user_id: id } });
  }
}
