import { Inject, Injectable } from '@nestjs/common';
import { SEARCH_STRATEGY } from 'src/constants/strategy.token';
import { RankingRequestDto } from 'src/dto/request.dto';
import { IScraper } from 'src/interfaces/scraper.interface';

@Injectable()
export class RankingService {
  constructor(
    @Inject(SEARCH_STRATEGY)
    private readonly searchStrategy: IScraper,
  ) {}

  async getKeywordRanking(dto: RankingRequestDto) {
    const ranks = await this.searchStrategy.getRankingByKeyword(dto.keyword);
    return { keyword: dto.keyword, ranks };
  }
}
