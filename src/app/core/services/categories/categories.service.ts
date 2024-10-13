import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ICategoriesRes, ICategory } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private httpClient = inject(HttpClient);
  private categories$ = signal<ICategory[]>([]);

  allCategories = computed( () => this.categories$())
  featuredCategories = computed(() => {
    return [...this.categories$().slice(1, 4), ...this.categories$().slice(-1)]
  });

  constructor() {
    this.getCategories();
  }

  private getCategories() {
    this.httpClient.get<ICategoriesRes>('https://ecommerce.routemisr.com/api/v1/categories').subscribe(
      res => {
        this.categories$.set(res.data);
      },
      err => {

      }
    )
  }
}
