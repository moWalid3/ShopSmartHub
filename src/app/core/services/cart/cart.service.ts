import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ICartRes } from '../../models/cart.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private cart$ = signal<ICartRes | null>(null);

  userCart = computed(() => this.cart$());
  cartOwner = computed(() => this.cart$()?.data.cartOwner || '');

  constructor() {
    if (this.authService.isAuthenticated()) this.getCartProducts().subscribe();
  }

  getCartProducts() {
    return this.http.get<ICartRes>('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {token: this.authService.token(),},
    }).pipe(
      tap(res => this.cart$.set(res))
    );
  }

  addProductToCart(productId: string) {
    return this.http.post<ICartRes>('https://ecommerce.routemisr.com/api/v1/cart',
      {productId},
      {headers: {token: this.authService.token()}}
    ).pipe(
      tap(res => this.cart$.set(res))
    )
  }

  deleteProduct(productId: string) {
    return this.http.delete<ICartRes>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: {token: this.authService.token()},
    })
    .pipe(
      tap(res => this.cart$.set(res))
    );
  }

  updateCartProductQuantity(productId: string, newCount: number) {
    return this.http.put<ICartRes>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {count: newCount},
      {headers: {token: this.authService.token()}}
    )
    .pipe(
      tap(res => this.cart$.set(res))
    );
  }

  clearUserCart() {
    return this.http.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {token: this.authService.token()},
    })
    .pipe(
      tap(res => this.cart$.set(null))
    );
  }

  logout() {
    this.cart$.set(null);
  }
}
