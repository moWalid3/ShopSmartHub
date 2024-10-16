import { Component, computed, inject, input, Signal, signal} from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/product.model';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { CarouselProductsComponent } from '../../components/carousel-products/carousel-products.component';
import { SkeletonModule } from 'primeng/skeleton';
import { NgClass } from '@angular/common';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TranslateModule,
    ButtonModule,
    GalleriaModule,
    ImageModule,
    CarouselProductsComponent,
    SkeletonModule,
    NgClass,
    MessagesModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  host: {
    class: 'block container',
  },
})
export class ProductDetailsComponent {
  id = input.required<string>();
  productsService = inject(ProductsService);
  product = signal<null | IProduct>(null);
  relatedProducts: Signal<IProduct[]> = signal<IProduct[]>([]);
  errorMsg = signal('');

  ngOnChanges() {
    this.productsService.getProductDetails(this.id()).subscribe({
      next: prod => {
        this.product.set(prod);
        this.relatedProducts = computed(() => this.productsService.getCategoryProducts(prod.category._id)().slice(0, 8));
      },
      error: err => this.errorMsg.set(err)
  });
  }
}
