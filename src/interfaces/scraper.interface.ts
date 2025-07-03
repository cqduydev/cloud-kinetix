export interface IScraper {
  getRankingByKeyword(keyword: string): Promise<number[]>;
}
