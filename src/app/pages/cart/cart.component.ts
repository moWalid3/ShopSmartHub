import { Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../core/services/cart/cart.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CartSkeletonComponent } from "./cart-skeleton/cart-skeleton.component";
import { CartFinalPriceCardComponent } from "./cart-final-price-card/cart-final-price-card.component";
import { CartProductsTableComponent } from "./cart-products-table/cart-products-table.component";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TranslateModule,
    ButtonModule,
    ProgressSpinnerModule,
    CartSkeletonComponent,
    CartFinalPriceCardComponent,
    CartProductsTableComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  host: {
    'class': 'block container',
  }
})
export class CartComponent {
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);
  cartService = inject(CartService);
  cartProducts = computed( () => this.cartService.userCart()?.data?.products || []);
  loading = signal(false);
  clearCartLoading = signal(false);
  endResponse = signal(false);

  ngOnInit(): void {
    this.getCartProducts();
  }

  private getCartProducts() {
    this.cartService.getCartProducts().subscribe({
      next: res => {
        this.endResponse.set(true);
      },
      error: err => {
        this.endResponse.set(true);
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
      }
    });
  }

  onDeleteProductFromCart(productId: string) {
    this.loading.set(true);

    this.cartService.deleteProduct(productId).subscribe({
      next: res => {
        this.loading.set(false);
      },
      error: err => {
        this.loading.set(false);
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
      }
    })
  }

  onUpdateCartProductQuantity(data: {productId: string, newCount: number}) {
    this.loading.set(true);

    this.cartService.updateCartProductQuantity(data.productId, data.newCount).subscribe({
      next: res => {
        this.loading.set(false);
      },
      error: err => {
        this.loading.set(false);
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
      }
    })
  }

  onClearCart() {
    this.clearCartLoading.set(true);

    this.cartService.clearUserCart().subscribe({
      next: res => {
        this.clearCartLoading.set(false);
        this.messageService.add({ severity: 'success', summary: this.translate.instant('cart.cartClearedSuccessfully')})
      },
      error: err => {
        this.clearCartLoading.set(false);
        this.handleErrorResponse(err.error?.message || err.error?.errors?.msg)
      }
    })
  }

  private handleErrorResponse(errorMsg = "Failed to fetch") {
    this.messageService.add({ severity: 'error', summary: errorMsg})
  }
}
