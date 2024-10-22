import { computed, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart/cart.service';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cartService = inject(CartService);
  let cartProducts = computed( () => cartService.userCart()?.data?.products || []);
  if(cartProducts().length > 0)
    return true;

  router.navigate(['/']);
  return false;
};
