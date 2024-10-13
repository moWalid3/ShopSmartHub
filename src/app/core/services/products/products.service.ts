import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { IProduct, IProductsRes } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private products$ = signal<IProduct[]>([]);

  monthSalesProducts = computed(() => this.products$().slice(30, 38));

  constructor() {
    this.getProducts();
  }

  private getProducts(pageNum = 1) {
    this.http.get<IProductsRes>(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`).subscribe(
      res => {
        this.products$.update(oldProducts => [...oldProducts, ...res.data]);

        if(res.metadata.nextPage)
          this.getProducts(res.metadata.currentPage + 1);
      }
    )
  }
}
