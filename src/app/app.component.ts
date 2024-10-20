import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LanguageService } from './core/services/language/language.service';
import { ScrollToTopService } from './core/services/scrollToTop/scroll-to-top.service';
import { AuthService } from './core/services/auth/auth.service';
import { ToastModule } from 'primeng/toast';
//@ts-ignore
import AOS from 'aos';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, ConfirmationService],
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
    AOS.init({
      duration: 750,
      once: true,
    });
  }
}
