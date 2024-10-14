import { Component, input } from '@angular/core';
import { IProduct } from '../../core/models/product.model';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TagModule, ButtonModule, TooltipModule, TranslateModule, RouterLink, NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<IProduct>();
  layout = input<'list' | 'grid'>('grid');
}
