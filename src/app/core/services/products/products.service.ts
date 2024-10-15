import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { IProduct, IProductsRes } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private products$ = signal<IProduct[]>([]);

  allProducts = computed(() => this.products$());
  monthSalesProducts = computed(() => this.products$().slice(30, 38));
  newInProducts = computed(() => this.products$().filter(prod => +prod.sold.toString().slice(-1) > 6).slice(0, 8))
  topRatedProducts = computed(() => this.products$().sort((a, b) => b.ratingsAverage - a.ratingsAverage).slice(0, 8));

  constructor() {
    this.getProducts();
  }

  getCategoryProducts = (categoryId: string) => computed(() => this.products$().filter(prod => prod.category._id === categoryId))
  getBrandProducts = (brandId: string) => computed(() => this.products$().filter(prod => prod.brand._id === brandId))

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
