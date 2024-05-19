import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { GetToken } from '../decorators/token.decorator';

@Controller('history')
export class HistoryController {
  constructor(private historyService:HistoryService) {
  }
  @Get("/purchases")
  getPurchases(@GetToken() token:string){
    return this.historyService.getPurchases(token);
  }

  @Get("/sales")
  getSales(@GetToken() token:string){
    return this.historyService.getSales(token);
  }

  @Get("/swaps")
  getSwaps(@GetToken() token:string){
    return this.historyService.getSwaps(token);
  }
}
