import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-cart-skeleton',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './cart-skeleton.component.html',
  styleUrl: './cart-skeleton.component.scss',
  host: {
    'class': "grid mt-3 mb-5"
  }
})
export class CartSkeletonComponent {

}
