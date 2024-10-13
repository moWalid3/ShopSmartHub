import { Component, inject } from '@angular/core';
import { LandingComponent } from "./landing/landing.component";
import { CategoriesSectionComponent } from "./categories-section/categories-section.component";
import { CategoriesService } from '../../core/services/categories/categories.service';
import { SalesMonthSectionComponent } from "./sales-month-section/sales-month-section.component";
import { ProductsService } from '../../core/services/products/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent, CategoriesSectionComponent, SalesMonthSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categoriesService = inject(CategoriesService);
  productsService = inject(ProductsService);
}
