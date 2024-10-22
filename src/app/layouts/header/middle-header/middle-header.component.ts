import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LanguageService } from '../../../core/services/language/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { MessageService } from 'primeng/api';
import { IProduct } from '../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-middle-header',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    AutoCompleteModule,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './middle-header.component.html',
  styleUrl: './middle-header.component.scss',
  host: {
    class: 'surface-section',
  },
})
export class MiddleHeaderComponent {
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private productsService = inject(ProductsService);
  authService = inject(AuthService);
  languageService = inject(LanguageService);
  products = computed(() => this.productsService.allProducts());
  selectedProduct = signal<IProduct | null>(null)
  filteredProducts = signal<IProduct[]>([]);

  filterProduct(event: AutoCompleteCompleteEvent) {
    let filtered: IProduct[] = [];
    let query = event.query;

    for (let i = 0; i < this.products().length; i++) {
      let product = this.products()[i];
      if (product.title.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(product);
      }
    }

    this.filteredProducts.set(filtered);
  }

  onChangeAuth() {
    if(this.authService.isAuthenticated()) {
      this.authService.logout();
      this.cartService.logout();
      this.wishlistService.logout();
      this.messageService.add({ severity: 'success', summary: this.translate.instant('header.middle.logoutSuccessful')})
    }
    else
      this.router.navigate(['/login'])
  }
}
