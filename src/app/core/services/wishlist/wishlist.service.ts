import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs';
import { IAddToWishlistRes, IWishlistRes } from '../../models/wishlist.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private wishlist$ = signal<IWishlistRes | null>(null);

  userWishlist = computed(() => this.wishlist$());
  wishlistProductsIdAfterAction = signal<string[] | null>(null)

  constructor() {
    if(this.authService.isAuthenticated()) this.getWishlistProducts().subscribe();
  }

  getWishlistProducts() {
    return this.http.get<IWishlistRes>('https://ecommerce.routemisr.com/api/v1/wishlist', {
      headers: {token: this.authService.token()}
    }).pipe(
      tap(res => this.wishlist$.set(res))
    )
  }

  addProductToWishlist(productId: string) {
    return this.http.post<IAddToWishlistRes>('https://ecommerce.routemisr.com/api/v1/wishlist', {productId},{
      headers: {token: this.authService.token()}
    }).pipe(
      tap(res => this.wishlistProductsIdAfterAction.set(res.data))
    )
  }

  removeProductFromWishlist(productId: string) {
    return this.http.delete<IAddToWishlistRes>(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
      headers: {token: this.authService.token()}
    }).pipe(
      tap(res => this.wishlistProductsIdAfterAction.set(res.data))
    )
  }
}
