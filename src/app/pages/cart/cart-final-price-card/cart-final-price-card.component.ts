import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-cart-final-price-card',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule, ButtonModule, TranslateModule],
  templateUrl: './cart-final-price-card.component.html',
  styleUrl: './cart-final-price-card.component.scss',
  host: {
    'class': 'block border-round surface-200 p-5'
  }
})
export class CartFinalPriceCardComponent {
  totalPrice = input.required<number>()
}
