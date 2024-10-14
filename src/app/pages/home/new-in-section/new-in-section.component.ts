import { Component, input } from '@angular/core';
import { IProduct } from '../../../core/models/product.model';
import { ProductCardComponent } from "../../../components/product-card/product-card.component";
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-in-section',
  standalone: true,
  imports: [ProductCardComponent, TranslateModule, RouterLink],
  templateUrl: './new-in-section.component.html',
  styleUrl: './new-in-section.component.scss'
})
export class NewInSectionComponent {
  newInProducts = input.required<IProduct[]>();
}
