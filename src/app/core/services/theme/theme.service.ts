import { Injectable, signal } from '@angular/core';

export type ITheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = signal<ITheme>('light');
  theme = this.currentTheme.asReadonly();

  constructor() {
    if(localStorage.getItem('ShopActiveTheme'))
      this.changeTheme(localStorage.getItem('ShopActiveTheme') as ITheme)
  }

  changeTheme(theme?: ITheme) {
    let themeLink = document.getElementById('app-theme') as HTMLLinkElement;

    if(!theme)
      theme = this.currentTheme() === 'light' ? 'dark' : 'light';

    if(themeLink) {
      themeLink.href = theme + '.css';
      this.currentTheme.set(theme);
      localStorage.setItem('ShopActiveTheme', theme);
    }
  }
}
