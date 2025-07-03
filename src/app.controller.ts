import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RankingRequestDto } from './dto/request.dto';
import { RankingService } from './services/ranking.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rankingService: RankingService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async handleRanking(@Body() dto: RankingRequestDto) {
    return this.rankingService.getKeywordRanking(dto);
  }
}
