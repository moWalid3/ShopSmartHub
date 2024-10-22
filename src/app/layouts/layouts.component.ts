import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ScrollTopModule } from 'primeng/scrolltop';
import { FooterComponent } from './footer/footer.component';
import { StartingLoaderComponent } from '../components/starting-loader/starting-loader.component';
import { ProductsService } from '../core/services/products/products.service';
import { CategoriesService } from '../core/services/categories/categories.service';
import { CartService } from '../core/services/cart/cart.service';
import { WishlistService } from '../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ScrollTopModule,
    FooterComponent,
    StartingLoaderComponent,
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  initialLoading = computed(
    () =>
      (this.productsService.allProducts().length > 0 &&
        this.cartService.userCart() &&
        this.wishlistService.userWishlist() &&
        this.categoriesService.allCategories().length > 0) ||
      false
  );
}
