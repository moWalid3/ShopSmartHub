import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-product-card',
  standalone: true,
  imports: [SkeletonModule, NgClass],
  templateUrl: './skeleton-product-card.component.html',
  styleUrl: './skeleton-product-card.component.scss'
})
export class SkeletonProductCardComponent {
  layout = input<'list' | 'grid'>('grid');
}
