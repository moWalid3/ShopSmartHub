import { Component, computed, inject, input, signal } from '@angular/core';
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
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

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
  wishlistService = inject(WishlistService);

  product = input.required<IProduct>();
  layout = input<'list' | 'grid'>('grid');
  addToCartLoading = signal(false);
  favoriteLoading = signal(false);

  onAddToCart() {
    if(!this.authService.isAuthenticated()){
      this.userNotAuthenticated();
    }else {
      this.addToCartLoading.set(true)
      this.cartService.addProductToCart(this.product()._id).subscribe({
        next: (res) => this.successResponseFor('cart', 'cart.productAddedToCart'),
        error: (err) => this.failedResponseFor('cart', err),
      });
    }
  }

  onHandleWishlist() {
    if(!this.authService.isAuthenticated()){
      this.userNotAuthenticated();
    }else {
      this.favoriteLoading.set(true);

      if(this.wishlistService.isItOnMyWishlist(this.product()._id)()) {
        this.removeFromWishlist();
      } else {
        this.addToWishlist();
      }
    }
  }

  private removeFromWishlist() {
    this.wishlistService.removeProductFromWishlist(this.product()._id).subscribe({
      next: res => this.successResponseFor('wishlist', 'wishlist.productRemovedFromWishlist'),
      error: err => this.failedResponseFor('wishlist', err)
    })
  }

  private addToWishlist() {
    this.wishlistService.addProductToWishlist(this.product()._id).subscribe({
      next: res => this.successResponseFor('wishlist', 'wishlist.productAddedToWishlist'),
      error: err => this.failedResponseFor('wishlist', err)
    })
  }

  private successResponseFor(type: 'cart'|'wishlist', msg: string) {
    type === 'cart' ? this.addToCartLoading.set(false) : this.favoriteLoading.set(false);
    this.messageService.add({ severity: 'success', summary: this.translate.instant(msg)})
  }

  private failedResponseFor(type: 'cart'|'wishlist', err: any) {
    type === 'cart' ? this.addToCartLoading.set(false) : this.favoriteLoading.set(false);
    this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
  }

  private userNotAuthenticated() {
    this.messageService.add({ severity: 'info', summary: this.translate.instant('public.loginToContinue')})
    this.router.navigate(['/login']);
  }

  private handleErrorResponse(errorMsg = "Failed to fetch") {
    this.messageService.add({ severity: 'error', summary: errorMsg})
  }
}
