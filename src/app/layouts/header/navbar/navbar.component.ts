import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule, BadgeModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host: {
    class: 'sticky',
  },
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  cartService = inject(CartService);

  canEnter() {
    if(!this.authService.isAuthenticated())
      this.messageService.add({ severity: 'info', summary: this.translate.instant('public.loginToContinue')})
  }
}
