import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IProduct } from '../../../core/models/product.model';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-sales-month-section',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    CarouselModule,
    ButtonModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './sales-month-section.component.html',
  styleUrl: './sales-month-section.component.scss',
})
export class SalesMonthSectionComponent {
  monthSalesProducts = input.required<IProduct[]>();

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
