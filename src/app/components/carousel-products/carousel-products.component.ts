import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ProductCardComponent } from '../product-card/product-card.component';
import { IProduct } from '../../core/models/product.model';

@Component({
  selector: 'app-carousel-products',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    CarouselModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    ProductCardComponent
],
  templateUrl: './carousel-products.component.html',
  styleUrl: './carousel-products.component.scss'
})
export class CarouselProductsComponent {
  monthSalesProducts = input.required<IProduct[]>();
  title = input.required<string>();

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
