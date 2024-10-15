import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ICategory } from '../../../core/models/category.model';
import { ButtonModule } from 'primeng/button';
import { CategoryCardComponent } from "../../../components/category-card/category-card.component";

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [RouterLink, TranslateModule, ButtonModule, CategoryCardComponent],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss',
})
export class CategoriesSectionComponent {
  featuredCategories = input.required<ICategory[]>();
}
