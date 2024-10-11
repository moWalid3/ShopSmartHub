import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

export type ILang = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private primeNGConfig = inject(PrimeNGConfig);
  private translateService = inject(TranslateService);
  readonly availableLanguages: ILang[] = ['en', 'ar'];

  private activeLanguage =signal<ILang>('en');
  currentLanguage = this.activeLanguage.asReadonly();

  constructor() {
    if(localStorage.getItem('ShopActiveLang'))
      this.activeLanguage.set(localStorage.getItem('ShopActiveLang') as ILang);

    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang(this.currentLanguage());
    this.translateService.get('primeng').subscribe(res => this.primeNGConfig.setTranslation(res));

    // const browserLang = this.translateService.getBrowserLang();
    // let lang = browserLang?.match(/en|ar/) ? browserLang : 'en';
    // this.changeLanguage(lang as ILang);
  }

  changeLanguage(lang: ILang) {
    this.activeLanguage.set(lang);
    this.translateService.use(this.currentLanguage());
    localStorage.setItem('ShopActiveLang', this.currentLanguage());
  }
}
