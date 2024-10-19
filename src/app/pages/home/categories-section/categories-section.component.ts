import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ICategory } from '../../../core/models/category.model';
import { ButtonModule } from 'primeng/button';
import { CategoryCardComponent } from "../../../components/category-card/category-card.component";
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-categories-section',
  standalone: true,
  imports: [RouterLink, TranslateModule, ButtonModule, CategoryCardComponent, SkeletonModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.scss',
  host: {
    'class': 'block surface-section'
  }
})
export class CategoriesSectionComponent {
  featuredCategories = input.required<ICategory[]>();
}
