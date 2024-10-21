import { Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/services/cart/cart.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { CartSkeletonComponent } from '../cart/cart-skeleton/cart-skeleton.component';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TranslateModule,
    ButtonModule,
    ProgressSpinnerModule,
    CartSkeletonComponent,
    SkeletonModule,
    TableModule,
    RatingModule,
    FormsModule
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  host: {
    'class': 'container',
  }
})
export class WishlistComponent {
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);
  private cartService = inject(CartService);
  wishlistService = inject(WishlistService);
  wishlistProducts = computed( () => this.wishlistService.userWishlist()?.data || []);
  loading = signal(false);
  endResponse = signal(false);

  ngOnInit(): void {
    this.getCartProducts();
  }

  private getCartProducts() {
    this.wishlistService.getWishlistProducts().subscribe({
      next: res => {
        this.endResponse.set(true);
      },
      error: err => {
        this.endResponse.set(true);
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
      }
    });
  }

  onDeleteProductFromWishlist(productId: string) {
    this.loading.set(true);

    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: res => {
        this.loading.set(false);
        this.getCartProducts();
      },
      error: err => {
        this.loading.set(false);
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
      }
    })
  }

  onAddToCart(productId: string) {
    this.loading.set(true)
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.messageService.add({ severity: 'success', summary: this.translate.instant('cart.productAddedToCart')})
      },
      error: (err) => {
        this.loading.set(false);
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
      }
    });
  }

  private handleErrorResponse(errorMsg = "Failed to fetch") {
    this.messageService.add({ severity: 'error', summary: errorMsg})
  }
}
