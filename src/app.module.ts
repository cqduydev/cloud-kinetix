import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleSearchStrategy } from './services/google-scraper.service';
import { BrowserService } from './services/browser.service';
import { RankingService } from './services/ranking.service';
import { SEARCH_STRATEGY } from './constants/strategy.token';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BrowserService, RankingService,
    GoogleSearchStrategy,
    {
      provide: SEARCH_STRATEGY,
      useClass: GoogleSearchStrategy,
    },],
})
export class AppModule {}
