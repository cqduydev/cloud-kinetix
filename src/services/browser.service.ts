import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Browser, chromium } from 'playwright';

@Injectable()
export class BrowserService implements OnModuleDestroy {
  private browser: Browser;

  async getBrowser(): Promise<Browser> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
    }
    return this.browser;
  }

  async onModuleDestroy() {
    if (this.browser) await this.browser.close();
  }
}
