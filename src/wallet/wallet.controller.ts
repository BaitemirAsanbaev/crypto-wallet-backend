import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BuyCoinDto } from './dto/buy-coin.dto';
import { WalletService } from './wallet.service';
import { GetToken} from '../decorators/token.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SwapCoinDto } from './dto/swap-coin.dto';

@Controller('wallet')
export class WalletController {

  constructor(private walletService: WalletService) {
  }
  @Post("/buy")
  @UseGuards(AuthGuard)
  buyCoin(@Body() dto:BuyCoinDto, @GetToken() token:string){
    return this.walletService.buyCoin(token, dto);
  }
  @Post("/sell")
  @UseGuards(AuthGuard)
  sellCoin(@Body() dto:BuyCoinDto, @GetToken() token:string){
    return this.walletService.sellCoin(token, dto);
  }
  @Post("/swap")
  @UseGuards(AuthGuard)
  swapCoin(@Body() dto:SwapCoinDto, @GetToken() token:string){
    return this.walletService.swapCoin(token, dto);
  }
}
