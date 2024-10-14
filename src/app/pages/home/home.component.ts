import { Component, inject } from '@angular/core';
import { LandingComponent } from './landing/landing.component';
import { CategoriesSectionComponent } from './categories-section/categories-section.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { SalesMonthSectionComponent } from './sales-month-section/sales-month-section.component';
import { ProductsService } from '../../core/services/products/products.service';
import { OfferSectionComponent } from './offer-section/offer-section.component';
import { NewInSectionComponent } from './new-in-section/new-in-section.component';
import { HurryUpSectionComponent } from "./hurry-up-section/hurry-up-section.component";
import { CarouselProductsComponent } from "../../components/carousel-products/carousel-products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingComponent,
    CategoriesSectionComponent,
    SalesMonthSectionComponent,
    OfferSectionComponent,
    NewInSectionComponent,
    HurryUpSectionComponent,
    CarouselProductsComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  categoriesService = inject(CategoriesService);
  productsService = inject(ProductsService);
}
