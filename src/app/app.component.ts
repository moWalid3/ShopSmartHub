import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { LanguageService } from './core/services/language/language.service';
import { ScrollToTopService } from './core/services/scrollToTop/scroll-to-top.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    '[dir]': "languageService.currentLanguage() === 'ar' ? 'rtl' : 'ltr'"
  }
})
export class AppComponent {
  languageService = inject(LanguageService);
  private primengConfig = inject(PrimeNGConfig);
  private scrollToTopService = inject(ScrollToTopService);
  
  ngOnInit() {
    this.primengConfig.ripple = true;
    this.scrollToTopService.setupScrollToTop();
  }
}
