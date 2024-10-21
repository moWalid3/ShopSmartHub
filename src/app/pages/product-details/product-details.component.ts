import { Component, computed, inject, input, Signal, signal} from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/product.model';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselProductsComponent } from '../../components/carousel-products/carousel-products.component';
import { SkeletonModule } from 'primeng/skeleton';
import { NgClass } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../../core/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TranslateModule,
    ButtonModule,
    GalleriaModule,
    CarouselProductsComponent,
    SkeletonModule,
    NgClass,
    MessagesModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  host: {
    class: 'block container',
  },
})
export class ProductDetailsComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  id = input.required<string>();
  productsService = inject(ProductsService);
  wishlistService = inject(WishlistService);
  product = signal<null | IProduct>(null);
  relatedProducts: Signal<IProduct[]> = signal<IProduct[]>([]);
  errorMsg = signal('');
  favoriteLoading = signal(false);
  addToCartLoading = signal(false);

  ngOnChanges() {
    this.productsService.getProductDetails(this.id()).subscribe({
      next: prod => {
        this.product.set(prod);
        this.relatedProducts = computed(() => this.productsService.getCategoryProducts(prod.category._id)().slice(0, 8));
      },
      error: err => this.errorMsg.set(err)
    });
  }

  onAddToCart() {
    if(!this.authService.isAuthenticated()){
      this.userNotAuthenticated();
    }else {
      this.addToCartLoading.set(true)
      this.cartService.addProductToCart(this.id()).subscribe({
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

      if(this.wishlistService.isItOnMyWishlist(this.id())()) {
        this.removeFromWishlist();
      } else {
        this.addToWishlist();
      }
    }
  }

  private removeFromWishlist() {
    this.wishlistService.removeProductFromWishlist(this.id()).subscribe({
      next: res => this.successResponseFor('wishlist', 'wishlist.productRemovedFromWishlist'),
      error: err => this.failedResponseFor('wishlist', err)
    })
  }

  private addToWishlist() {
    this.wishlistService.addProductToWishlist(this.id()).subscribe({
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
