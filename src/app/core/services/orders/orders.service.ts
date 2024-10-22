import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { IOrdersRes } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);

  getUserOrders(cartOwner: string) {
    return this.http.get<IOrdersRes>(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
  }
}
