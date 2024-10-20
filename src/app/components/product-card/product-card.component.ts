import { Component, inject, input, signal } from '@angular/core';
import { IProduct } from '../../core/models/product.model';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TagModule, ButtonModule, TooltipModule, TranslateModule, RouterLink, NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  product = input.required<IProduct>();
  layout = input<'list' | 'grid'>('grid');
  addToCartLoading = signal(false);

  onAddToCart() {
    if(!this.authService.isAuthenticated()){
      this.messageService.add({ severity: 'info', summary: this.translate.instant('public.loginToContinue')})
      this.router.navigate(['/login']);
    }else {
      this.addToCartLoading.set(true)
      this.cartService.addProductToCart(this.product()._id).subscribe({
        next: (res) => {
          this.addToCartLoading.set(false)
          console.log(res);
          this.messageService.add({ severity: 'success', summary: this.translate.instant('public.loginToContinue')})
        },
        error: (err) => {
          this.addToCartLoading.set(false)
          console.log(err);
          this.messageService.add({ severity: 'info', summary: this.translate.instant('public.loginToContinue')})
        },
      });
    }
  }
}
