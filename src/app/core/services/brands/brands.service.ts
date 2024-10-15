import { computed, inject, Injectable, signal } from '@angular/core';
import { IBrand, IBrandsRes } from '../../models/brand.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private http = inject(HttpClient);
  private brands$ = signal<IBrand[]>([]);

  allBrands = computed(() => this.brands$());

  constructor() {
    this.getBrands();
  }

  private getBrands() {
    this.http.get<IBrandsRes>('https://ecommerce.routemisr.com/api/v1/brands').subscribe(
      res => {
        this.brands$.set(res.data);
      },
      err => {

      }
    )
  }
}
