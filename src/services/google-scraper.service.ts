// google.strategy.ts
import { Injectable } from '@nestjs/common';
import { BrowserService } from './browser.service';
import { IScraper } from 'src/interfaces/scraper.interface';

@Injectable()
export class GoogleSearchStrategy implements IScraper {
  constructor(private readonly browserService: BrowserService) {}

  async getRankingByKeyword(keyword: string): Promise<number[]> {
    const browser = await this.browserService.getBrowser();
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();

    await page.goto('https://www.google.com', { waitUntil: 'domcontentloaded' });
    await page.fill('input[name="q"], textarea[name="q"]', keyword);
    await page.keyboard.press('Enter');
    const btn = await page.$('input[name="btnK"]');
    if (btn) {
      await btn.click();
    }
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('#search');
    await page.screenshot({ path: 'error-page4.png' });
    const titles = await page.$$eval('#search h3', els =>
      els.map(el => el.textContent?.trim() || ''),
    );

    await context.close(); // important!
    const indexes: number[] = [];
    titles.forEach((title, index) => {
      if(title.toLowerCase().startsWith(keyword.toLowerCase())) {
        indexes.push(index + 1);
      } 
    });

    return indexes;
  }
}
