import { Component, computed, DestroyRef, inject, OnInit, Signal, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ProductsService } from '../../../core/services/products/products.service';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { ProductCardComponent } from "../../../components/product-card/product-card.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../core/models/product.model';
import { SkeletonProductCardComponent } from "../../../components/skeleton-product-card/skeleton-product-card.component";
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-products-view',
  standalone: true,
  imports: [DataViewModule, TranslateModule, DropdownModule, FormsModule, ProductCardComponent, SkeletonProductCardComponent, MessagesModule],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.scss',
})
export class ProductsViewComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  productsService = inject(ProductsService);

  categoryId: null | string = null;
  brandId: null | string = null;
  layout = signal<'list' | 'grid'>('grid');
  products:  Signal<IProduct[]> = signal([]);
  sortKey = signal<string>('');
  sortOptions: SelectItem[] = [];
  title: Signal<string> = signal('No products available');

  private handleSortedProducts = () => computed(() => {
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

  sortedProducts: Signal<IProduct[]> = this.handleSortedProducts();

  ngOnInit(): void {
    this.initializeSortOptions();
    this.initializeProducts();
  }

  private initializeProducts() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('category');
      this.brandId = params.get('brand');

      if(this.categoryId) {
        this.products = computed( () => this.productsService.getCategoryProducts(this.categoryId!)());
        this.title = computed( () => this.products().length ? this.products()[0].category.name + ' Products' : 'public.noProductsAvailable');
        this.sortedProducts = this.handleSortedProducts();
      } else if (this.brandId) {
        this.products = computed( () => this.productsService.getBrandProducts(this.brandId!)());
        this.title = computed( () => this.products().length ? this.products()[0].brand.name + ' Products' : 'public.noProductsAvailable');
      } else {
        this.products = computed( () => this.productsService.allProducts());
        this.title = computed( () => 'All products')
      }
    })
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
