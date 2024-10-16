import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LanguageService } from './core/services/language/language.service';
import { ScrollToTopService } from './core/services/scrollToTop/scroll-to-top.service';
import { AuthService } from './core/services/auth/auth.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
  host: {
    '[dir]': "languageService.currentLanguage() === 'ar' ? 'rtl' : 'ltr'"
  }
})
export class AppComponent {
  languageService = inject(LanguageService);
  private primengConfig = inject(PrimeNGConfig);
  private scrollToTopService = inject(ScrollToTopService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.scrollToTopService.setupScrollToTop();
    this.authService.checkAuthenticated();
  }
}
