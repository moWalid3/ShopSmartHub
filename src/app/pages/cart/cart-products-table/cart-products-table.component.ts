import { Component, inject, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ICartProduct } from '../../../core/models/cart.model';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-products-table',
  standalone: true,
  imports: [TableModule, RouterLink, ButtonModule, TranslateModule],
  templateUrl: './cart-products-table.component.html',
  styleUrl: './cart-products-table.component.scss',
})
export class CartProductsTableComponent {
  private confirmationService = inject(ConfirmationService);
  private translate = inject(TranslateService);
  cartProducts = input.required<ICartProduct[]>();
  clearCartLoading = input.required<boolean>();
  onDeleteProductFromCart = output<string>();
  onUpdateCartProductQuantity = output<{productId: string, newCount: number}>();
  onClearCart = output<void>();

  deleteProductFromCart (productId: string) {
    this.onDeleteProductFromCart.emit(productId);
  }

  updateCartProductQuantity(data: {productId: string, newCount: number}) {
    this.onUpdateCartProductQuantity.emit(data);
  }

  clearCartConfirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('public.clearCartConfirmation'),
      header: this.translate.instant('public.clearCartConfirmationTitle'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",

      accept: () => {
        this.onClearCart.emit();
      },
    });
  }

}
