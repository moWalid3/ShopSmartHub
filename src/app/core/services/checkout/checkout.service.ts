import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private cartService = inject(CartService);

  createCashOrder(data: {details: string, phone: string, city: string}) {
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/orders/${this.cartService.userCart()?.cartId}`,
      {shippingAddress: data},
      {headers: {token: this.authService.token()}}
    ).pipe(
      tap(res => this.cartService.getCartProducts().subscribe())
    )
  }

  checkoutSessionOnline(data: {details: string, phone: string, city: string}) {
    return this.http.post<{session: {url: string}}>(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${this.cartService.userCart()?.cartId}?url=http://localhost:4200`,
      {shippingAddress: data},
      {headers: {token: this.authService.token()}}
    ).pipe(
      tap(res => this.cartService.getCartProducts().subscribe())
    )
  }
}
