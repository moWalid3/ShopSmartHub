import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ProductsService } from '../../../core/services/products/products.service';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { ProductCardComponent } from "../../../components/product-card/product-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [ DataViewModule, TranslateModule, DropdownModule, FormsModule, ProductCardComponent],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss',
})
export class ProductsViewComponent implements OnInit {
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  productsService = inject(ProductsService);
  layout = signal<'list' | 'grid'>('grid');
  products = computed(() => this.productsService.allProducts());
  sortKey = signal<string>('');
  sortOptions: SelectItem[] = [];

  sortedProducts = computed(() => {
    const currentProducts = this.products();
    const currentSortKey = this.sortKey();

    if (!currentSortKey) return currentProducts;

    return [...currentProducts].sort((a, b) => {
      if (currentSortKey === 'price') return a.price - b.price;
      if (currentSortKey === '!price') return b.price - a.price;
      if (currentSortKey === 'sellers') return b.sold - a.sold;
      if (currentSortKey === 'reviewed') return b.ratingsAverage - a.ratingsAverage;
      return 0;
    });
  });

  ngOnInit(): void {
    this.initializeSortOptions();
  }

  private initializeSortOptions() {
    const translationKeys = [
      'sort.bestSellers',
      'sort.topReviewed',
      'sort.priceHighToLow',
      'sort.priceLowToHigh'
    ];

    this.translate.get(translationKeys).subscribe(translations => {
      this.sortOptions = [
        { label: translations['sort.bestSellers'], value: 'sellers' },
        { label: translations['sort.topReviewed'], value: 'reviewed' },
        { label: translations['sort.priceHighToLow'], value: '!price' },
        { label: translations['sort.priceLowToHigh'], value: 'price' },
      ];
    });

    const langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.initializeSortOptions();
    });
    this.destroyRef.onDestroy(() => langChangeSubscription.unsubscribe());
  }

  onSortChange(event: { value: string }) {
    this.sortKey.set(event.value);
  }

  resetSort() {
    this.sortKey.set('');
  }
}
